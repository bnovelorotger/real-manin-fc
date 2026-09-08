import { RotateCcw } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state__mark">—</div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action && <button className="text-button" onClick={action.onClick}><RotateCcw size={15} /> {action.label}</button>}
    </div>
  )
}
