import type { AttendanceRecord } from '../types'
import { getAttendanceCounts } from '../lib/attendance'

interface AttendanceSummaryProps {
  records: AttendanceRecord[]
  compact?: boolean
}

export function AttendanceSummary({ records, compact = false }: AttendanceSummaryProps) {
  const counts = getAttendanceCounts(records)
  return (
    <div className={compact ? 'attendance-summary attendance-summary--compact' : 'attendance-summary'} aria-label="Resumen de convocatoria">
      <span className="summary-item summary-item--going"><i />{counts.going}<b>{compact ? 'Voy' : 'Voy'}</b></span>
      <span className="summary-item summary-item--maybe"><i />{counts.maybe}<b>{compact ? 'Dudoso' : 'Dudosos'}</b></span>
      <span className="summary-item summary-item--not-going"><i />{counts.not_going}<b>{compact ? 'No voy' : 'No van'}</b></span>
    </div>
  )
}
