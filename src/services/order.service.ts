import APIBase from './httpBase'
import type { Order, OrderCustomer } from '@/types'

export interface NewOrder {
  items: { code: string; qty: number }[]
  customer: OrderCustomer
  delivery: 'envio' | 'retiro'
  branch?: string
  notes?: string
}

class OrderService extends APIBase {
  async create(order: NewOrder) {
    return (await this.post<{ order: Order; whatsappUrl: string }>('orders', order)).data
  }
}

export const orderService = new OrderService()
