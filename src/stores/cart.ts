import { defineStore } from 'pinia'
import type { Product } from '@/types'
import { productImage } from '@/utils/media'

const KEY = 'iv_cart_v1'

// El carrito guarda una foto del producto para pintarse sin pedir al API;
// el precio real lo vuelve a tomar el servidor al crear el pedido.
export interface CartLine {
  code: string
  slug: string
  name: string
  priceCents: number
  image: string
  qty: number
}

function load(): CartLine[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]') as CartLine[]
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    lines: load(),
    open: false,
    lastAdded: null as string | null,
  }),

  getters: {
    count: (s) => s.lines.reduce((n, l) => n + l.qty, 0),
    totalCents: (s) => s.lines.reduce((n, l) => n + l.qty * l.priceCents, 0),
  },

  actions: {
    persist() {
      try {
        localStorage.setItem(KEY, JSON.stringify(this.lines))
      } catch {
        /* modo privado: el carrito vive en memoria */
      }
    },

    add(product: Product) {
      const line = this.lines.find((l) => l.code === product.code)
      if (line) line.qty = Math.min(99, line.qty + 1)
      else
        this.lines.push({
          code: product.code,
          slug: product.slug,
          name: product.name,
          priceCents: product.priceCents,
          image: productImage(product, 300),
          qty: 1,
        })
      this.lastAdded = product.code
      setTimeout(() => {
        if (this.lastAdded === product.code) this.lastAdded = null
      }, 1600)
      this.persist()
    },

    setQty(code: string, qty: number) {
      if (qty <= 0) this.lines = this.lines.filter((l) => l.code !== code)
      else {
        const line = this.lines.find((l) => l.code === code)
        if (line) line.qty = Math.min(99, qty)
      }
      this.persist()
    },

    clear() {
      this.lines = []
      this.persist()
    },
  },
})
