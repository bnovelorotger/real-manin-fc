import { useCallback, useEffect, useMemo, useState } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import type { AttendanceRecord, AttendanceStatus, Match, Page, Player, PlayerRole } from './types'
import { seedMatches, seedPlayers } from './data/seed'
import { getNextMatch } from './lib/dates'
import { normalizedNameKey, normalizeName } from './lib/players'
import { createRemotePlayer, fetchRemoteData, isSupabaseConfigured, supabase, upsertRemoteAttendance } from './services/supabase'
import { BottomNavigation } from './components/BottomNavigation'
import { LoadingState } from './components/LoadingState'
import { PlayerSelector } from './components/PlayerSelector'
import { HomePage } from './pages/HomePage'
import { CalendarPage } from './pages/CalendarPage'
import { CallupPage } from './pages/CallupPage'
import { MatchDetailPage } from './pages/MatchDetailPage'

const PLAYER_STORAGE_KEY = 'real-manin-player-id'

export default function App() {
  const [matches, setMatches] = useState<Match[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [player, setPlayer] = useState<Player | null>(null)
  const [page, setPage] = useState<Page>('home')
  const [selectedMatchId, setSelectedMatchId] = useState<string>()
  const [saving, setSaving] = useState<{ matchId: string; status: AttendanceStatus }>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [toast, setToast] = useState<string>()
  const [showSplash, setShowSplash] = useState(true)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(undefined)
    try {
      if (isSupabaseConfigured) {
        const remote = await fetchRemoteData()
        setPlayers(remote.players)
        setMatches(remote.matches)
        setRecords(remote.attendance)
        const storedId = window.localStorage.getItem(PLAYER_STORAGE_KEY)
        if (storedId) setPlayer(remote.players.find((item) => item.id === storedId) ?? null)
      } else {
        setPlayers(seedPlayers)
        setMatches(seedMatches)
        setRecords([])
        const storedId = window.localStorage.getItem(PLAYER_STORAGE_KEY)
        setPlayer(seedPlayers.find((item) => item.id === storedId) ?? null)
      }
    } catch {
      setError('No se han podido cargar los datos. Comprueba tu conexión e inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 550)
    void loadData()
    return () => window.clearTimeout(timer)
  }, [loadData])

  useEffect(() => {
    const realtimeClient = supabase
    if (!realtimeClient) return
    const channel = realtimeClient.channel('real-manin-attendance')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'attendance' }, () => { void loadData() })
      .subscribe()
    return () => { void realtimeClient.removeChannel(channel) }
  }, [loadData])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(undefined), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const nextMatch = useMemo(() => getNextMatch(matches), [matches])
  const selectedMatch = selectedMatchId ? matches.find((match) => match.id === selectedMatchId) : undefined

  const choosePlayer = async (name: string, playerId?: string, role: PlayerRole = 'player') => {
    const normalized = normalizeName(name)
    let selected = playerId ? players.find((item) => item.id === playerId) : players.find((item) => normalizedNameKey(item.name) === normalizedNameKey(normalized))
    if (!selected) {
      try {
        selected = isSupabaseConfigured
          ? await createRemotePlayer(normalized, role)
          : { id: `local-${Date.now()}`, name: normalized, isRegular: false, role }
        setPlayers((current) => [...current, selected as Player])
      } catch {
        setToast('No se ha podido guardar ese jugador. Inténtalo de nuevo.')
        return
      }
    }
    setPlayer(selected)
    window.localStorage.setItem(PLAYER_STORAGE_KEY, selected.id)
  }

  const changePlayer = () => {
    window.localStorage.removeItem(PLAYER_STORAGE_KEY)
    setPlayer(null)
    setPage('home')
  }

  const setAttendance = async (matchId: string, status: AttendanceStatus) => {
    if (!player) return
    const previous = records.find((record) => record.matchId === matchId && record.playerId === player.id)
    const optimistic: AttendanceRecord = { ...previous, matchId, playerId: player.id, playerName: player.name, status }
    setRecords((current) => previous ? current.map((record) => record === previous ? optimistic : record) : [...current, optimistic])
    setSaving({ matchId, status })
    try {
      await upsertRemoteAttendance(matchId, player.id, status)
      if (isSupabaseConfigured) {
        const remote = await fetchRemoteData()
        setPlayers(remote.players)
        setMatches(remote.matches)
        setRecords(remote.attendance)
      }
    } catch {
      setRecords((current) => previous ? current.map((record) => record === optimistic ? previous : record) : current.filter((record) => record !== optimistic))
      setToast('No se ha guardado tu respuesta. Comprueba tu conexión e inténtalo de nuevo.')
    } finally {
      setSaving(undefined)
    }
  }

  const openMatch = (matchId: string) => setSelectedMatchId(matchId)
  const closeMatch = () => setSelectedMatchId(undefined)
  const openCallup = (matchId?: string) => { setSelectedMatchId(matchId ?? nextMatch?.id); setPage('callup') }

  if (showSplash) return <div className="splash"><img src="/real-manin-logo.png" alt="" /><span>REAL MANIN FC</span><small>FÚTBOL 7</small></div>
  if (loading) return <div className="app-shell"><LoadingState /></div>
  if (error) return <div className="app-shell"><div className="error-state"><AlertCircle size={25} /><h1>Algo no ha ido bien</h1><p>{error}</p><button className="primary-button" onClick={() => void loadData()}><RefreshCw size={16} /> Reintentar</button></div></div>
  if (!player) return <PlayerSelector players={players} onSelect={(name, id, role) => void choosePlayer(name, id, role)} />

  return <div className="app-shell">
    <div className="app-frame">
      <div className="app-topbar"><span className="connection-indicator"><i />{isSupabaseConfigured ? 'Datos compartidos' : 'Vista local'}</span><button className="change-player" onClick={changePlayer}>Cambiar jugador</button></div>
      {selectedMatch && page !== 'callup' ? <MatchDetailPage match={selectedMatch} player={player} players={players} records={records} savingStatus={saving && saving.matchId === selectedMatch.id ? saving.status : undefined} onBack={closeMatch} onAttendance={(matchId, status) => void setAttendance(matchId, status)} /> : page === 'home' ? <HomePage player={player} nextMatch={nextMatch} records={records} players={players} savingStatus={saving && nextMatch && saving.matchId === nextMatch.id ? saving.status : undefined} onAttendance={(matchId, status) => void setAttendance(matchId, status)} onOpenMatch={openMatch} onOpenCallup={openCallup} onRetry={() => void loadData()} /> : page === 'calendar' ? <CalendarPage matches={matches} records={records} onOpenMatch={openMatch} /> : <CallupPage matches={matches} records={records} players={players} selectedMatchId={selectedMatchId} />}
      <BottomNavigation page={page} onNavigate={(nextPage) => { setSelectedMatchId(undefined); setPage(nextPage) }} />
    </div>
    {toast && <div className="toast" role="status"><AlertCircle size={16} /> {toast}</div>}
  </div>
}
