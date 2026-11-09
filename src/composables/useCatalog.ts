import { ref, watch } from 'vue'
import { catalogService } from '@/services/catalog.service'
import type { Category, Facets, Product, Segment } from '@/types'
import { errorMessage } from '@/utils/format'

// Estado de módulo: lo comparten la tienda, el buscador del header, la marquesina de marcas y las secciones del inicio.
const query = ref('')
const segment = ref<Segment | 'todos'>('todos')
const brand = ref<string | null>(null)
const category = ref<Category | null>(null)
const sale = ref(false)
const items = ref<Product[]>([])
const total = ref(0)
const page = ref(1)
const pages = ref(1)
const loading = ref(false)
const error = ref('')
const facets = ref<Facets | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined
let seq = 0
let wired = false

async function fetchPage(reset = true) {
  const mine = ++seq
  loading.value = true
  error.value = ''
  try {
    const res = await catalogService.list({
      q: query.value.trim() || undefined,
      segment: segment.value === 'todos' ? undefined : segment.value,
      brand: brand.value || undefined,
      category: category.value || undefined,
      sale: sale.value || undefined,
      page: reset ? 1 : page.value + 1,
      limit: 24,
    })
    if (mine !== seq) return
    items.value = reset ? res.items : [...items.value, ...res.items]
    total.value = res.total
    page.value = res.page
    pages.value = res.pages
  } catch (e) {
    if (mine === seq) error.value = errorMessage(e, 'No pudimos cargar el catálogo.')
  } finally {
    if (mine === seq) loading.value = false
  }
}

const scrollToShop = () => document.getElementById('tienda')?.scrollIntoView({ behavior: 'smooth' })

export function useCatalog() {
  if (!wired) {
    wired = true
    watch([segment, brand, category, sale], () => fetchPage())
    watch(query, () => {
      clearTimeout(timer)
      timer = setTimeout(() => fetchPage(), 280)
    })
  }

  const load = async () => {
    if (!facets.value) catalogService.facets().then((f) => (facets.value = f)).catch(() => {})
    if (!items.value.length) await fetchPage()
  }

  const reset = () => {
    query.value = ''
    segment.value = 'todos'
    brand.value = null
    category.value = null
    sale.value = false
  }

  const pickBrand = (name: string) => {
    brand.value = brand.value === name ? null : name
    scrollToShop()
  }

  const pickCategory = (id: Category | null) => {
    category.value = id
    scrollToShop()
  }

  const pickSale = () => {
    sale.value = true
    scrollToShop()
  }

  return { query, segment, brand, category, sale, items, total, page, pages, loading, error, facets, load, reset, pickBrand, pickCategory, pickSale, more: () => fetchPage(false) }
}
