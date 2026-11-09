export type Segment = 'autos' | 'vans-buses' | 'camiones' | 'maquinaria'
export type Category =
  | 'radiador'
  | 'intercooler'
  | 'tanque'
  | 'herramienta'
  | 'accesorio'
  | 'condensador'
  | 'enfriador-aceite'
  | 'termostato'
  | 'refrigerante'
  | 'inyeccion'
  | 'calefaccion'

export interface ProductImage {
  url: string
  publicId: string | null
}

export interface Product {
  id: string
  code: string
  slug: string
  name: string
  brand: string
  model: string
  segment: Segment
  category: Category
  priceCents: number
  compareAtCents: number
  description: string
  compatibility: string[]
  images: ProductImage[]
  featured: boolean
  inStock: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Banner {
  id: string
  image: ProductImage
  href: string
  alt: string
  order: number
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pages: number
}

export interface Facets {
  brands: { name: string; count: number }[]
  segments: { id: Segment; count: number }[]
  total: number
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  productId: string
  code: string
  name: string
  priceCents: number
  qty: number
  image: string
}

export interface OrderCustomer {
  name: string
  phone: string
  email: string
  city: string
  address: string
  idNumber: string
}

export interface Order {
  id: string
  code: string
  items: OrderItem[]
  totalCents: number
  customer: OrderCustomer
  delivery: 'envio' | 'retiro'
  branch: string
  notes: string
  channel: 'whatsapp' | 'payphone'
  status: OrderStatus
  createdAt: string
}

export interface SessionUser {
  id: string
  email: string
  name: string
  accountType: string
}

export interface AdminStats {
  products: number
  activeProducts: number
  ordersToday: number
  pendingOrders: number
  revenueMonthCents: number
}

export interface ApiError {
  status: number
  message: string
  data?: unknown
}
