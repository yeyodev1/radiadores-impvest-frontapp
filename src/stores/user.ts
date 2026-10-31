import { defineStore } from 'pinia'
import { authService } from '@/services/auth.service'
import { TOKEN_KEY } from '@/services/httpBase'
import type { SessionUser } from '@/types'

export const useUserStore = defineStore('user', {
  state: () => ({ user: null as SessionUser | null }),

  getters: {
    isAdmin: (s) => s.user?.accountType === 'admin',
  },

  actions: {
    async login(email: string, password: string) {
      const { token, user } = await authService.login(email, password)
      localStorage.setItem(TOKEN_KEY, token)
      this.user = user
      return user
    },

    /** Recupera la sesión guardada verificándola contra /auth/me. */
    async restore() {
      if (this.user) return this.user
      if (!localStorage.getItem(TOKEN_KEY)) return null
      try {
        this.user = await authService.me()
        return this.user
      } catch {
        this.clear()
        return null
      }
    },

    clear() {
      this.user = null
      localStorage.removeItem(TOKEN_KEY)
    },
  },
})
