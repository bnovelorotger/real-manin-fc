import { ArrowLeftRight } from 'lucide-react'
import { Logo } from './Logo'

interface MatchTeamsProps {
  homeTeam: string
  awayTeam: string
  compact?: boolean
}

function TeamBadge({ team }: { team: string }) {
  const isRealManin = team.toLocaleLowerCase() === 'real manin'
  return isRealManin ? <Logo size="small" /> : <span className="rival-badge" aria-hidden="true">{team.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase()}</span>
}

export function MatchTeams({ homeTeam, awayTeam, compact = false }: MatchTeamsProps) {
  return (
    <div className={compact ? 'match-teams match-teams--compact' : 'match-teams'}>
      <div className="match-team">
        <TeamBadge team={homeTeam} />
        <strong>{homeTeam}</strong>
      </div>
      <span className="match-teams__vs"><ArrowLeftRight size={14} /> VS</span>
      <div className="match-team">
        <TeamBadge team={awayTeam} />
        <strong>{awayTeam}</strong>
      </div>
    </div>
  )
}
