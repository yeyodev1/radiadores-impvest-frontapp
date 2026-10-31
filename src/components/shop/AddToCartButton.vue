<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types'

const props = withDefaults(defineProps<{ product: Product; label?: string; openCart?: boolean }>(), {
  label: 'Agregar',
  openCart: false,
})
const cart = useCartStore()
const done = computed(() => cart.lastAdded === props.product.code)

const add = () => {
  cart.add(props.product)
  if (props.openCart) cart.open = true
}
</script>

<template>
  <button
    type="button"
    class="add-btn"
    :class="{ 'is-done': done }"
    :disabled="!product.inStock"
    :aria-label="`Agregar ${product.name} al carrito`"
    @click.prevent.stop="add"
  >
    <span class="add-btn__cap" aria-hidden="true"><i :class="done ? 'fa-solid fa-check' : 'fa-solid fa-plus'" /></span>
    <span>{{ !product.inStock ? 'Bajo pedido' : done ? 'Agregado' : label }}</span>
  </button>
</template>
