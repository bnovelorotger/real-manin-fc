import type { Match } from '../types'

export const MADRID_TIME_ZONE = 'Europe/Madrid'

export function getNextMatch(matches: Match[], now = new Date()): Match | null {
  return [...matches]
    .filter((match) => new Date(match.kickoffAt).getTime() > now.getTime())
    .sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime())[0] ?? null
}

export function isPast(match: Match, now = new Date()): boolean {
  return new Date(match.kickoffAt).getTime() <= now.getTime()
}

export function formatDate(value: string): string {
  const date = new Date(value)
  const formatted = new Intl.DateTimeFormat('es-ES', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: MADRID_TIME_ZONE,
  }).format(date)
  return formatted.replace(/\./g, '')
}

export function formatShortDate(value: string): string {
  const date = new Date(value)
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'short', day: 'numeric', month: 'short', timeZone: MADRID_TIME_ZONE,
  }).format(date).replace(/\./g, '')
}

export function formatTime(value: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: MADRID_TIME_ZONE,
  }).format(new Date(value))
}

export function formatDayDistance(value: string, now = new Date()): string {
  const target = new Date(value)
  const startOfDay = (date: Date) => new Intl.DateTimeFormat('en-CA', {
    timeZone: MADRID_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(date)
  const targetDay = new Date(`${startOfDay(target)}T00:00:00Z`)
  const today = new Date(`${startOfDay(now)}T00:00:00Z`)
  const days = Math.round((targetDay.getTime() - today.getTime()) / 86_400_000)
  if (days <= 0) return 'Hoy'
  if (days === 1) return 'Mañana'
  return `Faltan ${days} días`
}

export function groupLabel(value: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    month: 'long', year: 'numeric', timeZone: MADRID_TIME_ZONE,
  }).format(new Date(value)).replace(/^./, (letter) => letter.toUpperCase())
}
