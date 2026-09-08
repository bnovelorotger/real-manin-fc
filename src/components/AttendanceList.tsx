import { Check, HelpCircle, X } from 'lucide-react'
import type { AttendanceRecord, AttendanceStatus, Player } from '../types'
import { attendanceMeta } from '../lib/attendance'

const icons: Record<AttendanceStatus, typeof Check> = { going: Check, maybe: HelpCircle, not_going: X }

interface AttendanceListProps {
  records: AttendanceRecord[]
  players: Player[]
  grouped?: boolean
}

export function AttendanceList({ records, players, grouped = true }: AttendanceListProps) {
  if (!records.length) return <div className="inline-empty">Aún no hay respuestas. Sé el primero en apuntarte.</div>
  const ordered = [...records].sort((a, b) => {
    const order = { going: 0, maybe: 1, not_going: 2 }
    return order[a.status] - order[b.status] || (a.playerName ?? '').localeCompare(b.playerName ?? '', 'es')
  })
  const renderRow = (record: AttendanceRecord) => {
        const Icon = icons[record.status]
        const participant = players.find((player) => player.id === record.playerId)
        const name = record.playerName ?? participant?.name ?? 'Jugador'
        return <div className="attendance-row" key={record.playerId}>
          <span className={`attendance-row__icon attendance-row__icon--${record.status}`}><Icon size={14} strokeWidth={2.6} /></span>
          <span className="attendance-row__name">{name}</span>
          <span className={`status-label status-label--${record.status}`}>{attendanceMeta[record.status].label}</span>
        </div>
  }

  if (!grouped) return <div className="attendance-list">{ordered.map(renderRow)}</div>

  const getRole = (record: AttendanceRecord) => players.find((player) => player.id === record.playerId)?.role ?? 'player'
  const playerRecords = ordered.filter((record) => getRole(record) === 'player')
  const fanRecords = ordered.filter((record) => getRole(record) === 'fan')
  return (
    <div className="attendance-groups">
      {playerRecords.length > 0 && <section className="attendance-group"><h3>Jugadores <span>{playerRecords.length}</span></h3><div className="attendance-list">{playerRecords.map(renderRow)}</div></section>}
      {fanRecords.length > 0 && <section className="attendance-group"><h3>Fans <span>{fanRecords.length}</span></h3><div className="attendance-list">{fanRecords.map(renderRow)}</div></section>}
    </div>
  )
}
