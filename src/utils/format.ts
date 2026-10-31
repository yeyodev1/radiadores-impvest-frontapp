const money = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

export const formatCents = (cents: number) => money.format((cents || 0) / 100)

export const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()

export const errorMessage = (error: unknown, fallback = 'Algo salió mal. Intenta de nuevo.') =>
  (error as { message?: string })?.message || fallback
