export const shouldRunIntegration =
  process.env.INTEGRATION_TESTS === 'true' && !!process.env.DATABASE_URL

export const describeIf = shouldRunIntegration ? describe : describe.skip
