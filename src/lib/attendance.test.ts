import { describe, expect, it } from 'vitest'
import { getAttendanceCounts, getPlayerAttendance } from './attendance'
import type { AttendanceRecord } from '../types'

const records: AttendanceRecord[] = [
  { matchId: 'm1', playerId: 'p1', status: 'going' },
  { matchId: 'm1', playerId: 'p2', status: 'maybe' },
  { matchId: 'm1', playerId: 'p3', status: 'not_going' },
]

describe('attendance', () => {
  it('counts one response per status', () => {
    expect(getAttendanceCounts(records)).toEqual({ going: 1, maybe: 1, not_going: 1 })
  })

  it('locates the existing response to update it instead of duplicating it', () => {
    const existing = getPlayerAttendance(records, 'm1', 'p2')
    const updated = records.map((record) => record === existing ? { ...record, status: 'going' as const } : record)
    expect(updated).toHaveLength(3)
    expect(getPlayerAttendance(updated, 'm1', 'p2')?.status).toBe('going')
  })
})
