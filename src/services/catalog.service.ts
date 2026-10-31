import APIBase from './httpBase'
import type { Facets, Paginated, Product } from '@/types'

export interface ProductQuery {
  q?: string
  segment?: string
  brand?: string
  category?: string
  featured?: boolean
  page?: number
  limit?: number
}

class CatalogService extends APIBase {
  async list(query: ProductQuery = {}) {
    const params = { ...query, featured: query.featured ? 1 : undefined }
    return (await this.get<Paginated<Product>>('products', params)).data
  }

  async facets() {
    return (await this.get<Facets>('products/facets')).data
  }

  async bySlug(slug: string) {
    return (await this.get<Product>(`products/${encodeURIComponent(slug)}`)).data
  }
}

export const catalogService = new CatalogService()
