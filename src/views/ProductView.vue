<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AddToCartButton from '@/components/shop/AddToCartButton.vue'
import ProductCard from '@/components/shop/ProductCard.vue'
import { useProductPage } from '@/composables/useProductPage'
import { useSeo } from '@/composables/useSeo'
import { whatsappUrl } from '@/config/site'
import { formatCents } from '@/utils/format'
import { imageUrl } from '@/utils/media'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { product, related, loading, missing, shown, segmentLabel, mainImage, buyUrl, seo } = useProductPage(slug)
useSeo(seo)

const perks = [
  { icon: 'fa-bolt', text: 'Entrega el mismo día o máximo 24 horas' },
  { icon: 'fa-truck-fast', text: 'Envíos a todo Ecuador, directo a tu puerta' },
  { icon: 'fa-shield-halved', text: 'Garantía bajo normas internacionales' },
  { icon: 'fa-location-dot', text: 'Retíralo en cualquiera de nuestras 5 sucursales' },
]
</script>

<template>
  <main>
    <article v-if="product" class="pdp">
      <nav class="pdp__crumbs" aria-label="Ruta">
        <RouterLink to="/">Inicio</RouterLink><span aria-hidden="true">/</span>
        <a href="/#tienda">Tienda</a><span aria-hidden="true">/</span>
        <span>{{ product.code }}</span>
      </nav>
      <div class="pdp__grid">
        <div>
          <div class="pdp__stage">
            <span class="pdp__code">{{ product.code }}</span>
            <img :src="mainImage" :alt="product.name" width="1100" height="700" fetchpriority="high" />
          </div>
          <div v-if="product.images.length > 1" class="pdp__thumbs">
            <button v-for="(img, i) in product.images" :key="img.url" type="button" :class="{ 'is-active': i === shown }" :aria-label="`Ver foto ${i + 1}`" @click="shown = i">
              <img :src="imageUrl(img.url, 200)" alt="" />
            </button>
          </div>
        </div>
        <div class="pdp__info">
          <span class="pdp__brand">{{ product.brand }} · {{ segmentLabel }}</span>
          <h1>{{ product.name }}</h1>
          <p class="pdp__price">
            {{ formatCents(product.priceCents) }}
            <small>Precio en dólares. Al por mayor y menor, consulta por volumen.</small>
          </p>
          <div class="pdp__buy">
            <AddToCartButton :product="product" label="Agregar al pedido" open-cart />
            <a class="ask-btn" :href="buyUrl" target="_blank" rel="noreferrer"><i class="fa-brands fa-whatsapp" aria-hidden="true" /> Comprar por WhatsApp</a>
          </div>
          <p v-if="product.description" class="pdp__desc">{{ product.description }}</p>
          <dl class="pdp__specs">
            <div><dt>Código</dt><dd class="mono">{{ product.code }}</dd></div>
            <div><dt>Marca del vehículo</dt><dd>{{ product.brand }}</dd></div>
            <div><dt>Modelo</dt><dd>{{ product.model }}</dd></div>
            <div v-if="product.compatibility.length"><dt>Compatible con</dt><dd>{{ product.compatibility.join(', ') }}</dd></div>
            <div><dt>Disponibilidad</dt><dd>{{ product.inStock ? 'En stock' : 'Bajo pedido' }}</dd></div>
          </dl>
          <ul class="pdp__perks">
            <li v-for="p in perks" :key="p.text"><i class="fa-solid" :class="p.icon" aria-hidden="true" />{{ p.text }}</li>
          </ul>
        </div>
      </div>
    </article>

    <section v-if="product && related.length" class="catalog" aria-labelledby="related-title" style="padding-top: 2rem">
      <h2 id="related-title" class="finder__title" style="margin-bottom: 1.4rem; font-size: clamp(1.8rem, 5vw, 3rem)">También en {{ segmentLabel.toLowerCase() }}</h2>
      <ul class="product-grid">
        <ProductCard v-for="(p, i) in related" :key="p.id" :product="p" :index="i" />
      </ul>
    </section>

    <section v-else-if="loading" class="pdp" aria-busy="true"><div class="skeleton" style="min-height: 60dvh" /></section>

    <section v-else-if="missing" class="pdp" style="min-height: 80dvh">
      <h1 style="color: inherit">Ese código no está en línea todavía.</h1>
      <p style="margin: 1rem 0 1.5rem">Tenemos más de 1000 modelos en bodega. Escríbenos y te lo confirmamos.</p>
      <a class="ask-btn" :href="whatsappUrl('Hola Impvest, busco un radiador que no encontré en la web.')" target="_blank" rel="noreferrer">
        <i class="fa-brands fa-whatsapp" aria-hidden="true" /> Preguntar por WhatsApp
      </a>
    </section>
  </main>
</template>
