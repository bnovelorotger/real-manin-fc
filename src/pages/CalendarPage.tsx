import { useMemo, useState } from 'react'
import type { AttendanceRecord, Match } from '../types'
import { isPast } from '../lib/dates'
import { MatchCard } from '../components/MatchCard'
import { EmptyState } from '../components/EmptyState'

type Filter = 'all' | 'upcoming' | 'past'

interface CalendarPageProps {
  matches: Match[]
  records: AttendanceRecord[]
  onOpenMatch: (matchId: string) => void
}

export function CalendarPage({ matches, records, onOpenMatch }: CalendarPageProps) {
  const [filter, setFilter] = useState<Filter>('upcoming')
  const visibleMatches = useMemo(() => matches.filter((match) => filter === 'all' || filter === 'past' ? filter === 'past' ? isPast(match) : true : !isPast(match)), [filter, matches])
  return <main className="page-content">
    <div className="page-heading"><div><span className="eyebrow">TEMPORADA 2026 / 27</span><h1>Calendario</h1></div></div>
    <div className="segmented-control" role="tablist" aria-label="Filtrar partidos">
      {([['all', 'Todos'], ['upcoming', 'Próximos'], ['past', 'Pasados']] as const).map(([value, label]) => <button key={value} className={filter === value ? 'is-active' : ''} onClick={() => setFilter(value)} role="tab" aria-selected={filter === value}>{label}</button>)}
    </div>
    <div className="match-list">
      {visibleMatches.map((match) => <MatchCard key={match.id} match={match} records={records.filter((record) => record.matchId === match.id)} historical={isPast(match)} onClick={() => onOpenMatch(match.id)} />)}
    </div>
    {!visibleMatches.length && <EmptyState title={filter === 'past' ? 'Todavía no hay partidos pasados' : 'No hay próximos partidos'} description="Prueba con otro filtro." />}
  </main>
}
