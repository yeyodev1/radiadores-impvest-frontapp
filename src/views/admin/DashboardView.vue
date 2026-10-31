<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { adminService } from '@/services/admin.service'
import type { AdminStats, Order } from '@/types'
import { formatCents } from '@/utils/format'

const stats = ref<AdminStats | null>(null)
const latest = ref<Order[]>([])
const LABELS: Record<string, string> = { pending: 'Pendiente', confirmed: 'Confirmado', shipped: 'Enviado', delivered: 'Entregado', cancelled: 'Cancelado' }

onMounted(async () => {
  const [s, o] = await Promise.all([adminService.stats(), adminService.orders({ limit: 5 })])
  stats.value = s
  latest.value = o.items
})
</script>

<template>
  <div class="admin__title">
    <h1>Hola, Impvest</h1>
    <RouterLink to="/admin/productos/nuevo" class="a-btn"><i class="fa-solid fa-plus" aria-hidden="true" /> Nuevo producto</RouterLink>
  </div>
  <div v-if="stats" class="a-stats">
    <div class="a-card"><span>Productos en línea</span><strong>{{ stats.activeProducts }} / {{ stats.products }}</strong></div>
    <div class="a-card"><span>Pedidos hoy</span><strong>{{ stats.ordersToday }}</strong></div>
    <div class="a-card"><span>Pendientes</span><strong>{{ stats.pendingOrders }}</strong></div>
    <div class="a-card"><span>Vendido este mes</span><strong>{{ formatCents(stats.revenueMonthCents) }}</strong></div>
  </div>
  <h2 style="margin: 1rem 0 0.8rem">Últimos pedidos</h2>
  <ul class="a-list">
    <li v-for="o in latest" :key="o.id" class="a-row">
      <div class="a-row__main">
        <strong>{{ o.customer.name }}</strong>
        <span class="mono">{{ o.code }} · {{ new Date(o.createdAt).toLocaleString('es-EC') }}</span>
      </div>
      <span class="a-badge">{{ LABELS[o.status] ?? o.status }}</span>
      <span class="a-row__price">{{ formatCents(o.totalCents) }}</span>
    </li>
    <li v-if="!latest.length" class="a-card">Todavía no hay pedidos.</li>
  </ul>
</template>
