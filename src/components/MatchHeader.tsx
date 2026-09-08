import { MapPin } from 'lucide-react'
import type { Match } from '../types'
import { formatDate, formatTime } from '../lib/dates'
import { MatchTeams } from './MatchTeams'

interface MatchHeaderProps {
  match: Match
  compact?: boolean
}

export function MatchHeader({ match, compact = false }: MatchHeaderProps) {
  return <div className={compact ? 'match-header match-header--compact' : 'match-header'}>
    <div className="match-header__meta"><span>Jornada {match.matchday}</span><span>{formatDate(match.kickoffAt)} · {formatTime(match.kickoffAt)}</span></div>
    <div className="match-header__venue"><MapPin size={14} /> {match.venue}</div>
    <MatchTeams homeTeam={match.homeTeam} awayTeam={match.awayTeam} compact={compact} />
  </div>
}
