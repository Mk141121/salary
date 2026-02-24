import { randomBytes } from 'crypto';

export const AUTH_COOKIE_NAME = 'TL_AUTH_TOKEN';
export const CSRF_COOKIE_NAME = 'TL_CSRF_TOKEN';

export function generateOpaqueToken(size = 32): string {
  return randomBytes(size).toString('hex');
}

export function parseCookies(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader
    .split(';')
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, part) => {
      const separatorIndex = part.indexOf('=');
      if (separatorIndex <= 0) {
        return acc;
      }

      const key = decodeURIComponent(part.slice(0, separatorIndex).trim());
      const value = decodeURIComponent(part.slice(separatorIndex + 1).trim());
      acc[key] = value;
      return acc;
    }, {});
}

export function extractBearerToken(authorization?: string): string | undefined {
  const [type, token] = authorization?.split(' ') ?? [];
  if (type !== 'Bearer') {
    return undefined;
  }

  if (!token || token === 'null' || token === 'undefined') {
    return undefined;
  }

  return token;
}

export function extractAuthTokenFromRequest(request: {
  headers: { authorization?: string; cookie?: string };
}): string | undefined {
  const bearerToken = extractBearerToken(request.headers.authorization);
  if (bearerToken) {
    return bearerToken;
  }

  const cookies = parseCookies(request.headers.cookie);
  const cookieToken = cookies[AUTH_COOKIE_NAME];
  if (!cookieToken || cookieToken === 'null' || cookieToken === 'undefined') {
    return undefined;
  }

  return cookieToken;
}
