import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { AttendanceRecord, AttendanceStatus, Match, Player, PlayerRole } from '../types'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null
export const isSupabaseConfigured = Boolean(supabase)

export async function fetchRemoteData() {
  if (!supabase) throw new Error('Supabase no está configurado')

  const [playersResult, matchesResult, attendanceResult] = await Promise.all([
    supabase.from('players').select('id,name,is_regular,role').order('name'),
    supabase.from('matches').select('id,matchday,kickoff_at,home_team,away_team,venue').order('kickoff_at'),
    supabase.from('attendance').select('id,match_id,player_id,status,created_at,updated_at,players(name)'),
  ])
  if (playersResult.error) throw playersResult.error
  if (matchesResult.error) throw matchesResult.error
  if (attendanceResult.error) throw attendanceResult.error

  const players: Player[] = (playersResult.data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    isRegular: row.is_regular,
    role: row.role,
  }))
  const matches: Match[] = (matchesResult.data ?? []).map((row) => ({
    id: row.id,
    matchday: row.matchday,
    kickoffAt: row.kickoff_at,
    homeTeam: row.home_team,
    awayTeam: row.away_team,
    venue: row.venue,
  }))
  const attendance: AttendanceRecord[] = (attendanceResult.data ?? []).map((row) => {
    const player = Array.isArray(row.players) ? row.players[0] : row.players
    return {
      id: row.id,
      matchId: row.match_id,
      playerId: row.player_id,
      playerName: player?.name,
      status: row.status as AttendanceStatus,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  })
  return { players, matches, attendance }
}

export async function upsertRemoteAttendance(matchId: string, playerId: string, status: AttendanceStatus) {
  if (!supabase) return
  const { error } = await supabase.from('attendance').upsert(
    { match_id: matchId, player_id: playerId, status },
    { onConflict: 'match_id,player_id' },
  )
  if (error) throw error
}

export async function createRemotePlayer(name: string, role: PlayerRole): Promise<Player> {
  if (!supabase) throw new Error('Supabase no está configurado')
  const { data, error } = await supabase
    .from('players')
    .insert({ name, is_regular: false, role })
    .select('id,name,is_regular,role')
    .single()
  if (error) throw error
  return { id: data.id, name: data.name, isRegular: data.is_regular, role: data.role }
}
