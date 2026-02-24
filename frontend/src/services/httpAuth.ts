export const AUTH_STORAGE_KEY = 'tinh_luong_auth'
export const CSRF_COOKIE_NAME = 'TL_CSRF_TOKEN'

export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') {
    return undefined
  }

  const cookiePair = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))

  if (!cookiePair) {
    return undefined
  }

  return decodeURIComponent(cookiePair.slice(name.length + 1))
}

export function attachAuthHeaders(config: { headers?: Record<string, string> }): void {
  if (!config.headers) {
    config.headers = {}
  }

  const csrfToken = getCookie(CSRF_COOKIE_NAME)
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken
  }

  const stored = localStorage.getItem(AUTH_STORAGE_KEY)
  if (!stored) {
    return
  }

  try {
    const data = JSON.parse(stored)
    if (data.token) {
      config.headers.Authorization = `Bearer ${data.token}`
    }
  } catch {
    // Ignore parse errors
  }
}
