import { ChevronRight, MapPin } from 'lucide-react'
import type { AttendanceRecord, Match } from '../types'
import { formatShortDate, formatTime } from '../lib/dates'
import { AttendanceSummary } from './AttendanceSummary'

interface MatchCardProps {
  match: Match
  records: AttendanceRecord[]
  onClick: () => void
  historical?: boolean
}

export function MatchCard({ match, records, onClick, historical = false }: MatchCardProps) {
  return (
    <button className={`match-card ${historical ? 'match-card--historical' : ''}`} onClick={onClick}>
      <div className="match-card__topline"><span>J{match.matchday}</span><span>{formatShortDate(match.kickoffAt)} · {formatTime(match.kickoffAt)}</span></div>
      <div className="match-card__teams"><strong>{match.homeTeam}</strong><span>vs</span><strong>{match.awayTeam}</strong><ChevronRight size={18} /></div>
      <div className="match-card__bottom"><span><MapPin size={13} />{match.venue}</span>{records.length > 0 && <AttendanceSummary records={records} compact />}</div>
    </button>
  )
}
