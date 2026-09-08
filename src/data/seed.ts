import type { Match, Player } from '../types'

export const regularPlayerNames = [
  'Alex', 'Gonzalo', 'Pablo', 'Claudio', 'Jon', 'Ramón',
  'Berni', 'Mateo', 'Marco', 'Bruno', 'Neil', 'Joel',
]

export const seedPlayers: Player[] = regularPlayerNames.map((name, index) => ({
  id: `player-${index + 1}`,
  name,
  isRegular: true,
  role: 'player' as const,
}))

const matchRows = [
  ['2026-09-17T22:05:00+02:00', 'CROSTA TEAM', 'Real Manin'],
  ['2026-10-01T21:10:00+02:00', 'Real Manin', 'BAMBINI FC'],
  ['2026-10-08T21:10:00+02:00', 'Los Pichirris', 'Real Manin'],
  ['2026-10-15T22:05:00+02:00', 'Real Manin', 'Atlético Romano'],
  ['2026-10-22T22:05:00+02:00', 'Gambeta FC', 'Real Manin'],
  ['2026-10-29T22:05:00+01:00', 'Real Manin', 'Jueves Trampa'],
  ['2026-11-05T21:10:00+01:00', 'Addmira', 'Real Manin'],
  ['2026-11-12T23:00:00+01:00', 'Real Manin', 'SANTOS'],
  ['2026-11-26T23:00:00+01:00', 'CROSTA TEAM', 'Real Manin'],
  ['2026-12-03T23:00:00+01:00', 'Real Manin', 'BAMBINI FC'],
  ['2026-12-10T21:10:00+01:00', 'Los Pichirris', 'Real Manin'],
  ['2026-12-17T22:05:00+01:00', 'Real Manin', 'Atlético Romano'],
  ['2027-01-07T22:05:00+01:00', 'Gambeta FC', 'Real Manin'],
  ['2027-01-14T22:05:00+01:00', 'Real Manin', 'Jueves Trampa'],
  ['2027-01-21T22:05:00+01:00', 'Addmira', 'Real Manin'],
  ['2027-01-28T23:00:00+01:00', 'Real Manin', 'SANTOS'],
] as const

export const seedMatches: Match[] = matchRows.map(([kickoffAt, homeTeam, awayTeam], index) => ({
  id: `match-${index + 1}`,
  matchday: index + 1,
  kickoffAt,
  homeTeam,
  awayTeam,
  venue: 'Escola Pia F7',
}))
