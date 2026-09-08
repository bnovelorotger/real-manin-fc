import { Check, HelpCircle, X } from 'lucide-react'
import type { AttendanceStatus } from '../types'

interface AttendanceButtonsProps {
  value?: AttendanceStatus
  disabled?: boolean
  saving?: AttendanceStatus
  onChange: (status: AttendanceStatus) => void
}

const buttons = [
  { status: 'going' as const, label: 'Voy', icon: Check },
  { status: 'maybe' as const, label: 'Dudoso', icon: HelpCircle },
  { status: 'not_going' as const, label: 'No voy', icon: X },
]

export function AttendanceButtons({ value, disabled = false, saving, onChange }: AttendanceButtonsProps) {
  return (
    <div className="attendance-actions" role="group" aria-label="Tu respuesta">
      {buttons.map(({ status, label, icon: Icon }) => (
        <button
          key={status}
          className={`attendance-action attendance-action--${status} ${value === status ? 'is-selected' : ''}`}
          disabled={disabled || Boolean(saving && saving !== status)}
          onClick={() => onChange(status)}
          aria-pressed={value === status}
        >
          <span className="attendance-action__icon">{saving === status ? <span className="button-spinner" /> : <Icon size={23} strokeWidth={2.5} />}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}
