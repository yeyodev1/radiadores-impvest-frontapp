<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ProductCard from '@/components/shop/ProductCard.vue'
import { CATEGORIES, SEGMENTS, SHOP, whatsappUrl } from '@/config/site'
import { useCatalog } from '@/composables/useCatalog'

const { query, segment, brand, category, sale, items, total, page, pages, loading, error, facets, load, reset, more } = useCatalog()
const brands = computed(() => facets.value?.brands ?? [])
const filtered = computed(() => Boolean(query.value || brand.value || category.value || sale.value || segment.value !== 'todos'))
const askUrl = computed(() => whatsappUrl(`Hola Impvest, busco radiador para: ${query.value || brand.value || 'mi vehículo'}`))

onMounted(load)
</script>

<template>
  <section id="tienda" class="catalog" aria-labelledby="catalog-title">
    <div class="finder">
      <div class="finder__head">
        <h2 id="catalog-title" class="finder__title">{{ SHOP.title }}</h2>
        <p class="finder__sub">{{ SHOP.subtitle }}</p>
      </div>

      <div class="cats" role="tablist" aria-label="Categoría de repuesto">
        <button type="button" role="tab" class="cats__item" :class="{ 'is-active': !category }" :aria-selected="!category" @click="category = null">
          <i class="fa-solid fa-border-all" aria-hidden="true" /><span>Todo</span>
        </button>
        <button v-for="c in CATEGORIES" :key="c.id" type="button" role="tab" class="cats__item" :class="{ 'is-active': category === c.id }" :aria-selected="category === c.id" @click="category = category === c.id ? null : c.id">
          <i class="fa-solid" :class="c.icon" aria-hidden="true" /><span>{{ c.label }}</span>
        </button>
      </div>

      <label class="finder__field">
        <span class="sr-only">Busca por marca, modelo o código</span>
        <i class="fa-solid fa-magnifying-glass" aria-hidden="true" />
        <input v-model="query" type="search" placeholder="Ej: JAC Sunray, Duster, RD-KI-029" autocomplete="off" enterkeyhint="search" />
        <button v-if="query" type="button" class="finder__clear" @click="query = ''">Borrar</button>
      </label>
      <div class="finder__filters">
        <div class="finder__segs" role="tablist" aria-label="Tipo de vehículo">
          <button v-for="s in SEGMENTS" :key="s.id" type="button" role="tab" :aria-selected="segment === s.id" class="finder__seg" :class="{ 'is-active': segment === s.id }" @click="segment = s.id">
            {{ s.label }}
          </button>
        </div>
        <div class="finder__chips" aria-label="Marca" style="margin-top: 0.9rem">
          <button v-for="b in brands" :key="b.name" type="button" class="finder__chip" :class="{ 'is-active': brand === b.name }" :aria-pressed="brand === b.name" @click="brand = brand === b.name ? null : b.name">
            {{ b.name }}
          </button>
        </div>
      </div>
    </div>

    <div class="catalog__bar">
      <p aria-live="polite">
        <strong>{{ total }}</strong> {{ total === 1 ? 'producto' : 'productos' }} {{ sale ? 'en oferta' : 'en línea' }}
        <span class="catalog__note"> de un universo de +1000 en bodega</span>
      </p>
      <button v-if="filtered" type="button" class="catalog__reset" @click="reset">Ver todo</button>
    </div>

    <p v-if="error" class="checkout__error" role="alert">{{ error }}</p>

    <ul v-if="items.length" class="product-grid">
      <ProductCard v-for="(p, i) in items" :key="p.id" :product="p" :index="i" />
    </ul>
    <ul v-else-if="loading" class="product-grid" aria-hidden="true">
      <li v-for="n in 8" :key="n" class="skeleton" />
    </ul>
    <div v-else-if="!error" class="empty-state">
      <img src="/img/scenes/exploded.webp" alt="" width="901" height="756" loading="lazy" />
      <div>
        <h3>Aún no está en línea, pero seguro lo tenemos.</h3>
        <p>Tenemos más de 1000 modelos en bodega. Dinos tu vehículo y te confirmamos stock y precio en minutos.</p>
        <a class="ask-btn" :href="askUrl" target="_blank" rel="noreferrer"><i class="fa-brands fa-whatsapp" aria-hidden="true" /> Preguntar por WhatsApp</a>
      </div>
    </div>

    <div v-if="page < pages" class="catalog__more">
      <button type="button" class="checkout-btn" style="width: auto" :disabled="loading" @click="more">
        <span class="checkout-btn__label">{{ loading ? 'Cargando…' : 'Ver más productos' }}</span>
      </button>
    </div>
  </section>
</template>
