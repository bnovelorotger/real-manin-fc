import { describe, expect, it } from 'vitest'
import { normalizeName, normalizedNameKey } from './players'

describe('player names', () => {
  it('normalizes surrounding and repeated spaces', () => {
    expect(normalizeName('  María   López ')).toBe('María López')
  })

  it('matches duplicate names without case differences', () => {
    expect(normalizedNameKey('  Berni ')).toBe(normalizedNameKey('BERNI'))
  })
})
