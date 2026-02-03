import { cookies } from 'next/headers'

const COOKIE = 'admin_auth'

export function isAdmin() {
  const c = cookies().get(COOKIE)?.value
  return c === 'ok'
}

export function requireAdmin(): boolean {
  return isAdmin()
}
