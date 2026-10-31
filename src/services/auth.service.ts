import APIBase from './httpBase'
import type { SessionUser } from '@/types'

class AuthService extends APIBase {
  async login(email: string, password: string) {
    return (await this.post<{ token: string; user: SessionUser }>('auth/login', { email, password })).data
  }

  async me() {
    return (await this.get<{ user: SessionUser }>('auth/me')).data.user
  }
}

export const authService = new AuthService()
