import { useState } from 'react'
import { ArrowRight, UserRound } from 'lucide-react'
import type { Player, PlayerRole } from '../types'

interface PlayerSelectorProps {
  players: Player[]
  onSelect: (name: string, playerId?: string, role?: PlayerRole) => void
}

export function PlayerSelector({ players, onSelect }: PlayerSelectorProps) {
  const [other, setOther] = useState<PlayerRole | null>(null)
  const [name, setName] = useState('')
  const regulars = players.filter((player) => player.isRegular)

  const submitOther = () => {
    const cleaned = name.trim().replace(/\s+/g, ' ')
    if (cleaned && other) onSelect(cleaned, undefined, other)
  }

  return (
    <main className="identity-page">
      <div className="identity-page__inner">
        <div className="identity-page__brand"><UserRound size={17} /><span>REAL MANIN FC</span></div>
        <h1>¿Quién eres?</h1>
        <p className="identity-page__hint">Selecciona tu nombre para apuntarte</p>
        <div className="player-grid">
          {regulars.map((player) => <button className="player-choice" key={player.id} onClick={() => onSelect(player.name, player.id)}>{player.name}</button>)}
        </div>
        <div className="identity-divider"><span>añadir participante</span></div>
        <div className={`other-player ${other ? 'is-open' : ''}`}>
          <div className="other-player__choices">
            <button className={other === 'player' ? 'other-player__choice is-selected' : 'other-player__choice'} onClick={() => setOther((current) => current === 'player' ? null : 'player')}><UserRound size={17} /> Otro jugador</button>
            <button className={other === 'fan' ? 'other-player__choice is-selected' : 'other-player__choice'} onClick={() => setOther((current) => current === 'fan' ? null : 'fan')}><UserRound size={17} /> Otro fan</button>
          </div>
          {other && <div className="other-player__form">
            <label htmlFor="other-name">Tu nombre</label>
            <input id="other-name" autoFocus value={name} onChange={(event) => setName(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && submitOther()} placeholder="Escribe tu nombre" />
            <button className="primary-button" disabled={!name.trim()} onClick={submitOther}>Continuar <ArrowRight size={16} /></button>
          </div>}
        </div>
      </div>
    </main>
  )
}
