import { describe, expect, it } from 'vitest'
import { getNextMatch, isPast } from './dates'
import type { Match } from '../types'

const matches: Match[] = [
  { id: 'past', matchday: 1, kickoffAt: '2026-09-01T22:00:00+02:00', homeTeam: 'A', awayTeam: 'Real Manin', venue: 'X' },
  { id: 'next', matchday: 2, kickoffAt: '2026-09-17T22:05:00+02:00', homeTeam: 'B', awayTeam: 'Real Manin', venue: 'X' },
  { id: 'later', matchday: 3, kickoffAt: '2026-10-01T21:10:00+02:00', homeTeam: 'Real Manin', awayTeam: 'C', venue: 'X' },
]

describe('match dates', () => {
  it('finds the next match by full timestamp, not only date', () => {
    expect(getNextMatch(matches, new Date('2026-09-17T20:00:00+02:00'))?.id).toBe('next')
    expect(getNextMatch(matches, new Date('2026-09-17T22:06:00+02:00'))?.id).toBe('later')
  })

  it('separates matches that have already started', () => {
    const now = new Date('2026-09-17T22:05:00+02:00')
    expect(isPast(matches[0], now)).toBe(true)
    expect(isPast(matches[1], now)).toBe(true)
    expect(isPast(matches[2], now)).toBe(false)
  })
})
