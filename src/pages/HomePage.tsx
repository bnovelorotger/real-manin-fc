import { ChevronRight, MapPin } from 'lucide-react'
import type { AttendanceRecord, AttendanceStatus, Match, Player } from '../types'
import { formatDayDistance, formatDate, formatTime } from '../lib/dates'
import { getMatchAttendance, getPlayerAttendance } from '../lib/attendance'
import { Logo } from '../components/Logo'
import { MatchTeams } from '../components/MatchTeams'
import { AttendanceButtons } from '../components/AttendanceButtons'
import { AttendanceSummary } from '../components/AttendanceSummary'
import { AttendanceList } from '../components/AttendanceList'
import { EmptyState } from '../components/EmptyState'

interface HomePageProps {
  player: Player
  nextMatch: Match | null
  records: AttendanceRecord[]
  players: Player[]
  savingStatus?: AttendanceStatus
  onAttendance: (matchId: string, status: AttendanceStatus) => void
  onOpenMatch: (matchId: string) => void
  onOpenCallup: (matchId: string) => void
  onRetry: () => void
}

export function HomePage({ player, nextMatch, records, players, savingStatus, onAttendance, onOpenMatch, onOpenCallup, onRetry }: HomePageProps) {
  if (!nextMatch) return <main className="page-content"><div className="page-heading"><Logo size="small" /><div><span className="eyebrow">REAL MANIN FC</span><h1>Inicio</h1></div></div><EmptyState title="No hay más partidos programados" description="Cuando haya una nueva jornada aparecerá aquí." action={{ label: 'Reintentar', onClick: onRetry }} /></main>

  const matchRecords = getMatchAttendance(records, nextMatch.id)
  const myResponse = getPlayerAttendance(records, nextMatch.id, player.id)?.status
  return <main className="page-content page-content--home">
    <header className="home-brand"><div className="home-brand__name"><Logo size="small" /><div><b>REAL MANIN</b><span>FÚTBOL CLUB</span></div></div><span className="home-brand__season">2026 / 27</span></header>
    <section className="section-intro"><span className="eyebrow">PRÓXIMO PARTIDO</span><h1>Ya queda menos.</h1></section>
    <button className="hero-match-card" onClick={() => onOpenMatch(nextMatch.id)}>
      <div className="hero-match-card__meta"><span>Jornada {nextMatch.matchday}</span><span>{formatDate(nextMatch.kickoffAt)} · {formatTime(nextMatch.kickoffAt)}</span></div>
      <div className="hero-match-card__venue"><MapPin size={14} /> {nextMatch.venue}</div>
      <MatchTeams homeTeam={nextMatch.homeTeam} awayTeam={nextMatch.awayTeam} />
      <div className="countdown"><span>{formatDayDistance(nextMatch.kickoffAt)}</span><strong>{new Date(nextMatch.kickoffAt).getTime() - Date.now() < 86_400_000 ? 'Prepárate' : 'Nos vemos en el campo'}</strong></div>
    </button>
    <section className="response-card">
      <div className="response-card__heading"><div><span className="eyebrow">TU RESPUESTA</span><h2>{player.name}, ¿vienes?</h2></div>{myResponse && <span className={`response-pill response-pill--${myResponse}`}>{myResponse === 'going' ? 'Apuntado' : myResponse === 'maybe' ? 'Dudoso' : 'No vas'}</span>}</div>
      <AttendanceButtons value={myResponse} saving={savingStatus} onChange={(status) => onAttendance(nextMatch.id, status)} />
      <p className="response-card__note">Se guarda automáticamente. Puedes cambiarla cuando quieras.</p>
    </section>
    <section className="callup-preview">
      <div className="section-heading"><div><span className="eyebrow">CONVOCATORIA</span><h2>¿Quién viene?</h2></div><button className="icon-button" onClick={() => onOpenCallup(nextMatch.id)} aria-label="Ver convocatoria"><ChevronRight size={19} /></button></div>
      <AttendanceSummary records={matchRecords} />
      <AttendanceList records={matchRecords.slice(0, 4)} players={players} />
      {matchRecords.length > 4 && <button className="link-button" onClick={() => onOpenCallup(nextMatch.id)}>Ver convocatoria completa <ChevronRight size={15} /></button>}
    </section>
  </main>
}
