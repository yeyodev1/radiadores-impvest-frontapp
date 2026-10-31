<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { BRANCHES, whatsappUrl } from '@/config/site'
import { adminService } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import type { Order, OrderStatus } from '@/types'
import { errorMessage, formatCents } from '@/utils/format'

const STATUSES: { id: OrderStatus; label: string }[] = [
  { id: 'pending', label: 'Pendiente' },
  { id: 'confirmed', label: 'Confirmado' },
  { id: 'shipped', label: 'Enviado' },
  { id: 'delivered', label: 'Entregado' },
  { id: 'cancelled', label: 'Cancelado' },
]
const toast = useToastStore()
const status = ref('')
const items = ref<Order[]>([])
const open = ref<string | null>(null)

const load = async () => (items.value = (await adminService.orders({ status: status.value || undefined, limit: 50 })).items)
const branchName = (id: string) => BRANCHES.find((b) => b.id === id)?.name ?? id
const chat = (o: Order) => whatsappUrl(`Hola ${o.customer.name}, te escribimos de Radiadores Impvest por tu pedido ${o.code}.`).replace(/wa\.me\/\d+/, `wa.me/593${o.customer.phone.replace(/^0/, '')}`)

async function setStatus(o: Order, value: OrderStatus) {
  try {
    Object.assign(o, await adminService.setOrderStatus(o.id, value))
    toast.show('Estado actualizado')
  } catch (e) {
    toast.show(errorMessage(e), 'error')
  }
}

watch(status, load)
onMounted(load)
</script>

<template>
  <div class="admin__title"><h1>Pedidos</h1></div>
  <div class="a-filters">
    <select v-model="status">
      <option value="">Todos</option>
      <option v-for="s in STATUSES" :key="s.id" :value="s.id">{{ s.label }}</option>
    </select>
  </div>
  <ul class="a-list">
    <li v-for="o in items" :key="o.id" class="a-card">
      <div class="a-row" style="border: 0; padding: 0">
        <div class="a-row__main">
          <strong>{{ o.customer.name }} · {{ o.customer.phone }}</strong>
          <span class="mono">{{ o.code }} · {{ new Date(o.createdAt).toLocaleString('es-EC') }} · {{ o.delivery === 'retiro' ? `Retiro ${branchName(o.branch)}` : `Envío a ${o.customer.city}` }}</span>
        </div>
        <span class="a-row__price">{{ formatCents(o.totalCents) }}</span>
        <select :value="o.status" @change="setStatus(o, ($event.target as HTMLSelectElement).value as OrderStatus)">
          <option v-for="s in STATUSES" :key="s.id" :value="s.id">{{ s.label }}</option>
        </select>
        <button type="button" class="a-btn a-btn--ghost" @click="open = open === o.id ? null : o.id">Detalle</button>
        <a class="a-btn" :href="chat(o)" target="_blank" rel="noreferrer"><i class="fa-brands fa-whatsapp" /></a>
      </div>
      <ul v-if="open === o.id" style="margin: 0.8rem 0 0; padding-left: 1rem">
        <li v-for="it in o.items" :key="it.code">{{ it.qty }} × {{ it.name }} ({{ it.code }}) · {{ formatCents(it.priceCents * it.qty) }}</li>
        <li v-if="o.customer.address">Dirección: {{ o.customer.address }}</li>
        <li v-if="o.notes">Nota: {{ o.notes }}</li>
      </ul>
    </li>
    <li v-if="!items.length" class="a-card">No hay pedidos con ese filtro.</li>
  </ul>
</template>
