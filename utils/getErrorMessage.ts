export function getErrorMessage(error: unknown, defaultMessage: string): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return defaultMessage;
}
