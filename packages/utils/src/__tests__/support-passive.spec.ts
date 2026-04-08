describe('support-passive', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.resetModules()
  })

  it('should return true when the passive option getter is accessed', async () => {
    const addEventListenerMock = vi
      .spyOn(window, 'addEventListener')
      .mockImplementation(((_type: any, _listener: any, options?: any) => {
        void options?.passive
      }) as any)
    vi.spyOn(window, 'removeEventListener').mockImplementation((() => undefined) as any)

    const {supportPassive} = await import('../support-passive')
    expect(supportPassive()).toBe(true)
    expect(supportPassive()).toBe(true)
    expect(addEventListenerMock).toHaveBeenCalledTimes(1)
  })

  it('should return false when addEventListener throws', async () => {
    vi.spyOn(window, 'addEventListener').mockImplementation((() => {
      throw new Error('failed')
    }) as any)

    const {supportPassive} = await import('../support-passive')
    expect(supportPassive()).toBe(false)
  })
})
