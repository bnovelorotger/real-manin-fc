import { CalendarDays, House, UsersRound } from 'lucide-react'
import type { Page } from '../types'

interface BottomNavigationProps {
  page: Page
  onNavigate: (page: Page) => void
}

const items = [
  { page: 'home' as const, label: 'Inicio', icon: House },
  { page: 'calendar' as const, label: 'Calendario', icon: CalendarDays },
  { page: 'callup' as const, label: 'Convocatoria', icon: UsersRound },
]

export function BottomNavigation({ page, onNavigate }: BottomNavigationProps) {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {items.map(({ page: itemPage, label, icon: Icon }) => (
        <button
          key={itemPage}
          className={page === itemPage ? 'bottom-nav__item is-active' : 'bottom-nav__item'}
          onClick={() => onNavigate(itemPage)}
          aria-current={page === itemPage ? 'page' : undefined}
        >
          <Icon size={20} strokeWidth={page === itemPage ? 2.4 : 1.8} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
