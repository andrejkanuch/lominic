export function handleInsightsError(error: unknown, operation: string): never {
  const errorMessage =
    error instanceof Error ? error.message : 'Unknown error occurred'
  throw new Error(`Failed to ${operation}: ${errorMessage}`)
}
