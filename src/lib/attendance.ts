import type { AttendanceRecord, AttendanceStatus } from '../types'

export const attendanceMeta: Record<AttendanceStatus, { label: string; shortLabel: string }> = {
  going: { label: 'Voy', shortLabel: 'Voy' },
  maybe: { label: 'Dudoso', shortLabel: 'Dudoso' },
  not_going: { label: 'No voy', shortLabel: 'No voy' },
}

export function getMatchAttendance(records: AttendanceRecord[], matchId: string): AttendanceRecord[] {
  return records.filter((record) => record.matchId === matchId)
}

export function getPlayerAttendance(records: AttendanceRecord[], matchId: string, playerId?: string): AttendanceRecord | undefined {
  return records.find((record) => record.matchId === matchId && record.playerId === playerId)
}

export function getAttendanceCounts(records: AttendanceRecord[]) {
  return records.reduce((counts, record) => {
    counts[record.status] += 1
    return counts
  }, { going: 0, maybe: 0, not_going: 0 })
}
