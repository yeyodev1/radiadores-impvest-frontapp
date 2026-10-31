<script setup lang="ts">
import { computed } from 'vue'
import AddToCartButton from './AddToCartButton.vue'
import { SEGMENTS } from '@/config/site'
import type { Product } from '@/types'
import { formatCents } from '@/utils/format'
import { productImage } from '@/utils/media'

const props = defineProps<{ product: Product; index?: number }>()
const segment = computed(() => SEGMENTS.find((s) => s.id === props.product.segment)?.label)
</script>

<template>
  <li class="pcard" :style="{ animationDelay: `${(index ?? 0) % 12 * 40}ms` }">
    <RouterLink :to="`/producto/${product.slug}`" class="pcard__link">
      <span class="pcard__code">{{ product.code }}</span>
      <span class="pcard__seg">{{ segment }}</span>
      <span class="pcard__media">
        <img :src="productImage(product, 520)" :alt="product.name" width="520" height="340" loading="lazy" decoding="async" />
      </span>
      <span class="pcard__brand">{{ product.brand }}</span>
      <span class="pcard__name">{{ product.model }}</span>
      <span class="pcard__price">{{ formatCents(product.priceCents) }}</span>
    </RouterLink>
    <AddToCartButton :product="product" />
  </li>
</template>
