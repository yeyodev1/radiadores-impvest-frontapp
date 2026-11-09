const money = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

export const formatCents = (cents: number) => money.format((cents || 0) / 100)

/** Porcentaje de descuento entero: 149.90 sobre 166.90 → 10. */
export const discount = (p: { priceCents: number; compareAtCents: number }) =>
  Math.round((1 - p.priceCents / p.compareAtCents) * 100)

export const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()

export const errorMessage = (error: unknown, fallback = 'Algo salió mal. Intenta de nuevo.') =>
  (error as { message?: string })?.message || fallback
