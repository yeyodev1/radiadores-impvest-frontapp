<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AddToCartButton from '@/components/shop/AddToCartButton.vue'
import { useRailScroll } from '@/composables/useRailScroll'
import { catalogService } from '@/services/catalog.service'
import type { Product } from '@/types'
import { formatCents } from '@/utils/format'
import { productImage } from '@/utils/media'

const section = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const items = ref<Product[]>([])
const ready = ref(false)

useRailScroll(section, track, ready)

onMounted(async () => {
  try {
    items.value = (await catalogService.list({ featured: true, limit: 12 })).items
  } catch {
    items.value = []
  } finally {
    ready.value = true
    // Con scroll-snap, insertar tarjetas antes de la última deja el carril al final.
    requestAnimationFrame(() => track.value?.scrollTo({ left: 0 }))
  }
})
</script>

<template>
  <section v-if="!ready || items.length" id="destacados" ref="section" class="rail" aria-labelledby="rail-title">
    <div class="rail__sticky">
      <header class="rail__head">
        <h2 id="rail-title">Los que más<br />salen esta temporada</h2>
        <p>Stock real en bodega. Entrega el mismo día o máximo en 24 horas.</p>
      </header>
      <ul ref="track" class="rail__track">
        <li v-for="(p, i) in items" :key="p.id" class="railcard" :class="`railcard--${i % 3}`">
          <RouterLink :to="`/producto/${p.slug}`" class="railcard__link">
            <span class="railcard__index">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="railcard__media">
              <img :src="productImage(p, 900)" :alt="p.name" width="1100" height="700" loading="lazy" decoding="async" />
            </span>
            <span class="railcard__meta">
              <span class="mono">{{ p.code }}</span>
              <strong>{{ p.brand }} {{ p.model }}</strong>
              <span class="railcard__price">{{ formatCents(p.priceCents) }}</span>
            </span>
          </RouterLink>
          <AddToCartButton :product="p" />
        </li>
        <li v-if="ready" class="railcard railcard--more">
          <a href="#catalogo" class="railcard__link">
            <span class="railcard__more-n">+1000</span>
            <span>modelos más en el catálogo</span>
            <i class="fa-solid fa-arrow-right" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
