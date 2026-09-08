import { ArrowLeft, Clock3, MapPin } from 'lucide-react'
import type { AttendanceRecord, AttendanceStatus, Match, Player } from '../types'
import { isPast, formatDate, formatTime } from '../lib/dates'
import { getMatchAttendance, getPlayerAttendance } from '../lib/attendance'
import { AttendanceButtons } from '../components/AttendanceButtons'
import { AttendanceSummary } from '../components/AttendanceSummary'
import { AttendanceList } from '../components/AttendanceList'
import { MatchTeams } from '../components/MatchTeams'

interface MatchDetailPageProps {
  match: Match
  player: Player
  players: Player[]
  records: AttendanceRecord[]
  savingStatus?: AttendanceStatus
  onBack: () => void
  onAttendance: (matchId: string, status: AttendanceStatus) => void
}

export function MatchDetailPage({ match, player, players, records, savingStatus, onBack, onAttendance }: MatchDetailPageProps) {
  const past = isPast(match)
  const matchRecords = getMatchAttendance(records, match.id)
  const myResponse = getPlayerAttendance(records, match.id, player.id)?.status
  return <main className="page-content page-content--detail">
    <button className="back-button" onClick={onBack}><ArrowLeft size={18} /> Volver</button>
    <div className="detail-heading"><span className="eyebrow">JORNADA {match.matchday}</span><h1>{formatDate(match.kickoffAt)}</h1><div className="detail-heading__meta"><span><Clock3 size={14} /> {formatTime(match.kickoffAt)}</span><span><MapPin size={14} /> {match.venue}</span></div></div>
    {past && <div className="historical-note">Partido finalizado · Convocatoria histórica</div>}
    <section className="detail-card"><MatchTeams homeTeam={match.homeTeam} awayTeam={match.awayTeam} /><div className="detail-divider" /><div className="question-block"><h2>{past ? 'Convocatoria' : `${player.name}, ¿vienes?`}</h2>{!past && <><AttendanceButtons value={myResponse} saving={savingStatus} onChange={(status) => onAttendance(match.id, status)} /><p className="response-card__note">Tu respuesta se guarda automáticamente.</p></>}</div></section>
    <section className="detail-callup"><div className="section-heading"><div><span className="eyebrow">CONVOCATORIA</span><h2>Quién viene</h2></div></div><AttendanceSummary records={matchRecords} /><AttendanceList records={matchRecords} players={players} /></section>
  </main>
}
