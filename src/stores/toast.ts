import { defineStore } from 'pinia'

let seq = 0

export const useToastStore = defineStore('toast', {
  state: () => ({ items: [] as { id: number; text: string; kind: 'ok' | 'error' }[] }),
  actions: {
    show(text: string, kind: 'ok' | 'error' = 'ok') {
      const id = ++seq
      this.items.push({ id, text, kind })
      setTimeout(() => (this.items = this.items.filter((t) => t.id !== id)), 3200)
    },
  },
})
