export function normalizeName(value: string): string {
  return value.trim().replace(/\s+/g, ' ')
}

export function normalizedNameKey(value: string): string {
  return normalizeName(value).toLocaleLowerCase('es-ES')
}
