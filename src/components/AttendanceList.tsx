import { Check, HelpCircle, X } from 'lucide-react'
import type { AttendanceRecord, AttendanceStatus, Player } from '../types'
import { attendanceMeta } from '../lib/attendance'

const icons: Record<AttendanceStatus, typeof Check> = { going: Check, maybe: HelpCircle, not_going: X }

interface AttendanceListProps {
  records: AttendanceRecord[]
  players: Player[]
}

export function AttendanceList({ records, players }: AttendanceListProps) {
  if (!records.length) return <div className="inline-empty">Aún no hay respuestas. Sé el primero en apuntarte.</div>
  const ordered = [...records].sort((a, b) => {
    const order = { going: 0, maybe: 1, not_going: 2 }
    return order[a.status] - order[b.status] || (a.playerName ?? '').localeCompare(b.playerName ?? '', 'es')
  })
  return (
    <div className="attendance-list">
      {ordered.map((record) => {
        const Icon = icons[record.status]
        const name = record.playerName ?? players.find((player) => player.id === record.playerId)?.name ?? 'Jugador'
        return <div className="attendance-row" key={record.playerId}>
          <span className={`attendance-row__icon attendance-row__icon--${record.status}`}><Icon size={14} strokeWidth={2.6} /></span>
          <span className="attendance-row__name">{name}</span>
          <span className={`status-label status-label--${record.status}`}>{attendanceMeta[record.status].label}</span>
        </div>
      })}
    </div>
  )
}
