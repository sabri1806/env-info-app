describe('Serverless API Route', () => {
  it('exports GET handler', async () => {
    const { GET } = await import('@/app/api/serverless/route')
    expect(typeof GET).toBe('function')
  })
})