describe('freeze', () => {
  afterEach(() => {
    vi.resetModules()
    vi.doUnmock('esm-env')
  })

  it('should apply Object.freeze when DEV is true', async () => {
    vi.doMock('esm-env', () => ({DEV: true}))
    const {freeze} = await import('../freeze')
    const value = freeze({name: 'bichi'})
    expect(Object.isFrozen(value)).toBe(true)
  })

  it('should return the original object unchanged when DEV is false', async () => {
    vi.doMock('esm-env', () => ({DEV: false}))
    const {freeze} = await import('../freeze')
    const value = {name: 'bichi'}
    const frozen = freeze(value)
    expect(frozen).toBe(value)
    expect(Object.isFrozen(frozen)).toBe(false)
  })
})
