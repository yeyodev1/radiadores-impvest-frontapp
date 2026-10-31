import type { Product } from '@/types'

const PLACEHOLDER = '/img/hero/radiator-full.webp'

/**
 * Cloudinary: se pide el tamaño justo con una transformación en la URL.
 * Estáticos locales (/products/CODE.webp): existe una variante -sm para miniaturas.
 */
export function imageUrl(url: string | undefined, width: number): string {
  if (!url) return PLACEHOLDER
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/c_limit,w_${width},f_auto,q_auto/`)
  }
  if (width <= 600 && /^\/products\/[^/]+\.webp$/.test(url) && !url.endsWith('-sm.webp')) {
    return url.replace(/\.webp$/, '-sm.webp')
  }
  return url
}

export const productImage = (product: Pick<Product, 'images'>, width = 1100) =>
  imageUrl(product.images?.[0]?.url, width)
