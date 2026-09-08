export function LoadingState() {
  return (
    <div className="loading-stack" aria-label="Cargando">
      <div className="skeleton skeleton--title" />
      <div className="skeleton skeleton--card" />
      <div className="skeleton skeleton--card small" />
    </div>
  )
}
