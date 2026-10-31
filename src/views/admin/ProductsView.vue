<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { SEGMENTS } from '@/config/site'
import { adminService } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import type { Product } from '@/types'
import { errorMessage, formatCents } from '@/utils/format'
import { productImage } from '@/utils/media'

const toast = useToastStore()
const items = ref<Product[]>([])
const total = ref(0)
const filters = reactive({ q: '', segment: '' })
let timer: ReturnType<typeof setTimeout> | undefined

async function load() {
  const res = await adminService.products({ q: filters.q || undefined, segment: filters.segment || undefined, limit: 100 })
  items.value = res.items
  total.value = res.total
}

async function toggle(p: Product, field: 'isActive' | 'featured' | 'inStock') {
  try {
    const updated = await adminService.updateProduct(p.id, { [field]: !p[field] })
    Object.assign(p, updated)
  } catch (e) {
    toast.show(errorMessage(e), 'error')
  }
}

watch(() => filters.segment, load)
watch(() => filters.q, () => {
  clearTimeout(timer)
  timer = setTimeout(load, 250)
})
onMounted(load)
</script>

<template>
  <div class="admin__title">
    <h1>Productos <small class="mono">({{ total }})</small></h1>
    <RouterLink to="/admin/productos/nuevo" class="a-btn"><i class="fa-solid fa-plus" aria-hidden="true" /> Nuevo</RouterLink>
  </div>
  <div class="a-filters">
    <input v-model="filters.q" type="search" placeholder="Buscar por código, marca o modelo" />
    <select v-model="filters.segment">
      <option value="">Todos los tipos</option>
      <option v-for="s in SEGMENTS.slice(1)" :key="s.id" :value="s.id">{{ s.label }}</option>
    </select>
  </div>
  <ul class="a-list">
    <li v-for="p in items" :key="p.id" class="a-row">
      <img :src="productImage(p, 200)" :alt="p.name" loading="lazy" />
      <div class="a-row__main">
        <strong>{{ p.name }}</strong>
        <span class="mono">{{ p.code }}</span>
      </div>
      <span class="a-row__price">{{ formatCents(p.priceCents) }}</span>
      <button type="button" class="a-badge" :class="p.isActive ? 'a-badge--on' : 'a-badge--off'" @click="toggle(p, 'isActive')">
        {{ p.isActive ? 'En línea' : 'Oculto' }}
      </button>
      <button type="button" class="a-badge" :class="p.featured ? 'a-badge--warn' : ''" @click="toggle(p, 'featured')">
        {{ p.featured ? 'Destacado' : 'Normal' }}
      </button>
      <div class="a-row__actions">
        <RouterLink :to="`/admin/productos/${p.id}`" class="a-btn a-btn--ghost">Editar</RouterLink>
      </div>
    </li>
  </ul>
</template>
