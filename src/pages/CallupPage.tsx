import { useEffect, useMemo, useState } from 'react'
import type { AttendanceRecord, Match, Player } from '../types'
import { getNextMatch } from '../lib/dates'
import { MatchHeader } from '../components/MatchHeader'
import { AttendanceSummary } from '../components/AttendanceSummary'
import { AttendanceList } from '../components/AttendanceList'
import { ChevronDown } from 'lucide-react'

interface CallupPageProps {
  matches: Match[]
  records: AttendanceRecord[]
  players: Player[]
  selectedMatchId?: string
}

export function CallupPage({ matches, records, players, selectedMatchId }: CallupPageProps) {
  const defaultMatch = getNextMatch(matches)
  const [matchId, setMatchId] = useState(selectedMatchId ?? defaultMatch?.id ?? matches[0]?.id)
  useEffect(() => { if (selectedMatchId) setMatchId(selectedMatchId) }, [selectedMatchId])
  const match = useMemo(() => matches.find((item) => item.id === matchId) ?? defaultMatch ?? matches[0], [defaultMatch, matchId, matches])
  if (!match) return null
  const matchRecords = records.filter((record) => record.matchId === match.id)
  return <main className="page-content">
    <div className="page-heading"><div><span className="eyebrow">JUGADORES Y FANS</span><h1>Convocatoria</h1></div></div>
    <label className="select-wrap">Selecciona una jornada
      <select value={match.id} onChange={(event) => setMatchId(event.target.value)} aria-label="Selecciona una jornada">
        {matches.map((item) => <option key={item.id} value={item.id}>J{item.matchday} · {item.homeTeam} vs {item.awayTeam}</option>)}
      </select><ChevronDown size={17} />
    </label>
    <section className="callup-card callup-card--overview"><MatchHeader match={match} compact /><AttendanceSummary records={matchRecords} /></section>
    <AttendanceList records={matchRecords} players={players} />
    <p className="callup-hint">La convocatoria se actualiza automáticamente cuando alguien responde.</p>
  </main>
}
