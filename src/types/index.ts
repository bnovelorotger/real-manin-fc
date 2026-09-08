export type AttendanceStatus = 'going' | 'maybe' | 'not_going'

export type Page = 'home' | 'calendar' | 'callup'

export interface Player {
  id: string
  name: string
  isRegular: boolean
}

export interface Match {
  id: string
  matchday: number
  kickoffAt: string
  homeTeam: string
  awayTeam: string
  venue: string
}

export interface AttendanceRecord {
  id?: string
  matchId: string
  playerId: string
  playerName?: string
  status: AttendanceStatus
  createdAt?: string
  updatedAt?: string
}
