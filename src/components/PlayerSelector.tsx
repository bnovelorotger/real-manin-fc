import { useState } from 'react'
import { ArrowRight, UserRound } from 'lucide-react'
import type { Player } from '../types'

interface PlayerSelectorProps {
  players: Player[]
  onSelect: (name: string, playerId?: string) => void
}

export function PlayerSelector({ players, onSelect }: PlayerSelectorProps) {
  const [other, setOther] = useState(false)
  const [name, setName] = useState('')
  const regulars = players.filter((player) => player.isRegular)

  const submitOther = () => {
    const cleaned = name.trim().replace(/\s+/g, ' ')
    if (cleaned) onSelect(cleaned)
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
        <div className="identity-divider"><span>o</span></div>
        <div className={`other-player ${other ? 'is-open' : ''}`}>
          <button className="other-player__toggle" onClick={() => setOther((current) => !current)}><UserRound size={17} /> Otro</button>
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
