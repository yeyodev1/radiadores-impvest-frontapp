<script setup lang="ts">
import { BRANCHES } from '@/config/site'
import type { useCheckout } from '@/composables/useCheckout'

const props = defineProps<{ checkout: ReturnType<typeof useCheckout> }>()
const form = props.checkout.form
</script>

<template>
  <form class="checkout" novalidate @submit.prevent="checkout.submit()">
    <div class="checkout__group">
      <label for="co-name">Nombre y apellido</label>
      <input id="co-name" v-model="form.name" autocomplete="name" required />
    </div>
    <div class="checkout__group">
      <label for="co-phone">Celular</label>
      <input id="co-phone" v-model="form.phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="0991234567" required />
    </div>
    <div class="checkout__toggle" role="group" aria-label="Entrega">
      <button type="button" :class="{ 'is-active': form.delivery === 'envio' }" @click="form.delivery = 'envio'">
        <i class="fa-solid fa-truck-fast" aria-hidden="true" /> Envío
      </button>
      <button type="button" :class="{ 'is-active': form.delivery === 'retiro' }" @click="form.delivery = 'retiro'">
        <i class="fa-solid fa-store" aria-hidden="true" /> Retiro
      </button>
    </div>
    <template v-if="form.delivery === 'envio'">
      <div class="checkout__group">
        <label for="co-city">Ciudad</label>
        <input id="co-city" v-model="form.city" autocomplete="address-level2" />
      </div>
      <div class="checkout__group">
        <label for="co-addr">Dirección (opcional)</label>
        <input id="co-addr" v-model="form.address" autocomplete="street-address" />
      </div>
    </template>
    <div v-else class="checkout__group">
      <label for="co-branch">Sucursal</label>
      <select id="co-branch" v-model="form.branch">
        <option v-for="b in BRANCHES" :key="b.id" :value="b.id">{{ b.name }}</option>
      </select>
    </div>
    <div class="checkout__group">
      <label for="co-notes">Placa, año o comentario (opcional)</label>
      <textarea id="co-notes" v-model="form.notes" rows="2" />
    </div>
    <p v-if="checkout.error.value" class="checkout__error" role="alert">{{ checkout.error.value }}</p>
    <button type="submit" class="checkout-btn" :disabled="checkout.sending.value">
      <span class="checkout-btn__label">{{ checkout.sending.value ? 'Registrando…' : 'Enviar pedido' }}</span>
      <span class="checkout-btn__sub">Queda registrado y te atendemos por WhatsApp</span>
    </button>
  </form>
</template>
