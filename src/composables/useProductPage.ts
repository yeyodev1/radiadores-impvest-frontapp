import { computed, ref, watch, type Ref } from 'vue'
import { BUSINESS, SEGMENTS, SITE_URL, whatsappUrl } from '@/config/site'
import { catalogService } from '@/services/catalog.service'
import type { Product } from '@/types'
import { formatCents } from '@/utils/format'
import { imageUrl } from '@/utils/media'

export function useProductPage(slug: Ref<string>) {
  const product = ref<Product | null>(null)
  const related = ref<Product[]>([])
  const loading = ref(true)
  const missing = ref(false)
  const shown = ref(0)

  async function load() {
    loading.value = true
    missing.value = false
    shown.value = 0
    try {
      product.value = await catalogService.bySlug(slug.value)
      const res = await catalogService.list({ segment: product.value.segment, limit: 5 })
      related.value = res.items.filter((p) => p.id !== product.value?.id).slice(0, 4)
    } catch {
      product.value = null
      missing.value = true
    } finally {
      loading.value = false
    }
  }

  watch(slug, load, { immediate: true })

  const segmentLabel = computed(() => SEGMENTS.find((s) => s.id === product.value?.segment)?.label ?? '')
  const mainImage = computed(() => imageUrl(product.value?.images[shown.value]?.url, 1200))
  const buyUrl = computed(() =>
    product.value
      ? whatsappUrl(`Hola Impvest, quiero el ${product.value.name} (${product.value.code}) de ${formatCents(product.value.priceCents)}. ¿Me confirman disponibilidad?`)
      : '',
  )

  const seo = () => {
    const p = product.value
    if (!p) return null
    const price = (p.priceCents / 100).toFixed(2)
    return {
      title: `${p.name} | ${p.code} | Radiadores Impvest`,
      description: `${p.name} (${p.code}) a ${formatCents(p.priceCents)}. Entrega el mismo día o máximo 24 horas, envíos a todo Ecuador y garantía de fábrica.`,
      path: `/producto/${p.slug}`,
      image: imageUrl(p.images[0]?.url, 1200),
      type: 'product',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        sku: p.code,
        mpn: p.code,
        image: p.images.map((i) => (i.url.startsWith('http') ? i.url : `${SITE_URL}${i.url}`)),
        description: p.description,
        category: `Radiadores > ${segmentLabel.value}`,
        isRelatedTo: { '@type': 'Vehicle', manufacturer: p.brand, model: p.model },
        offers: {
          '@type': 'Offer',
          url: `${SITE_URL}/producto/${p.slug}`,
          priceCurrency: 'USD',
          price,
          availability: p.inStock ? 'https://schema.org/InStock' : 'https://schema.org/BackOrder',
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@type': 'Organization', name: BUSINESS.name },
        },
      },
    }
  }

  return { product, related, loading, missing, shown, segmentLabel, mainImage, buyUrl, seo }
}
