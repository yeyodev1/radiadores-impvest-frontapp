import APIBase from './httpBase'
import type { AdminStats, Banner, Order, OrderStatus, Paginated, Product, ProductImage } from '@/types'

export type ProductInput = Partial<Omit<Product, 'id' | 'slug' | 'createdAt' | 'updatedAt'>>

class AdminService extends APIBase {
  async stats() {
    return (await this.get<AdminStats>('admin/stats')).data
  }

  async products(params: Record<string, unknown>) {
    return (await this.get<Paginated<Product>>('admin/products', params)).data
  }

  async product(id: string) {
    return (await this.get<Product>(`admin/products/${id}`)).data
  }

  async createProduct(input: ProductInput) {
    return (await this.post<Product>('admin/products', input)).data
  }

  async updateProduct(id: string, input: ProductInput) {
    return (await this.put<Product>(`admin/products/${id}`, input)).data
  }

  async removeProduct(id: string) {
    await this.del(`admin/products/${id}`)
  }

  async upload(file: File) {
    const form = new FormData()
    form.append('image', file)
    return (await this.post<ProductImage>('admin/uploads', form)).data
  }

  async saveBanners(items: Pick<Banner, 'image' | 'href' | 'alt'>[]) {
    return (await this.put<Banner[]>('admin/banners', { items })).data
  }

  async orders(params: Record<string, unknown>) {
    return (await this.get<Paginated<Order>>('admin/orders', params)).data
  }

  async setOrderStatus(id: string, status: OrderStatus) {
    return (await this.patch<Order>(`admin/orders/${id}/status`, { status })).data
  }
}

export const adminService = new AdminService()
