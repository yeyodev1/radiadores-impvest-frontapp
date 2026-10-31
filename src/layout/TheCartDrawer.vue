<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, toRef } from 'vue'
import CheckoutForm from '@/components/cart/CheckoutForm.vue'
import { useBodyLock } from '@/composables/useBodyLock'
import { useCheckout } from '@/composables/useCheckout'
import { useCartStore } from '@/stores/cart'
import { formatCents } from '@/utils/format'

const cart = useCartStore()
const checkout = useCheckout()
const step = checkout.step
const title = computed(() => ({ cart: 'Tu pedido', form: 'Tus datos', done: 'Pedido registrado' })[step.value])

useBodyLock(toRef(cart, 'open'))

const close = () => {
  cart.open = false
  if (step.value === 'done') checkout.restart()
}
const onKey = (e: KeyboardEvent) => e.key === 'Escape' && cart.open && close()
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="cart" :class="{ 'is-open': cart.open }" :aria-hidden="!cart.open" :inert="!cart.open">
    <button type="button" class="cart__scrim" aria-label="Cerrar carrito" @click="close" />
    <aside class="cart__panel" role="dialog" aria-modal="true" :aria-label="title">
      <header class="cart__head">
        <button v-if="step === 'form'" type="button" class="cart__back" @click="step = 'cart'">← Volver</button>
        <h2>{{ title }}</h2>
        <button type="button" class="cart__close" @click="close">Cerrar</button>
      </header>

      <div class="cart__body">
        <div v-if="step === 'done' && checkout.result.value" class="order-done">
          <span class="order-done__code">{{ checkout.result.value.order.code }}</span>
          <h3>Listo, tu pedido quedó registrado.</h3>
          <p>Abrimos WhatsApp con el detalle para confirmarte stock, envío y pago. Si no se abrió, tócalo aquí:</p>
          <a class="ask-btn" :href="checkout.result.value.whatsappUrl" target="_blank" rel="noreferrer">
            <i class="fa-brands fa-whatsapp" aria-hidden="true" /> Abrir WhatsApp
          </a>
        </div>

        <CheckoutForm v-else-if="step === 'form'" :checkout="checkout" />

        <div v-else-if="!cart.lines.length" class="cart__empty">
          <img src="/img/hero/radiator-full.webp" alt="" width="600" height="370" loading="lazy" />
          <p>Todavía no agregas radiadores. Busca tu vehículo y lo tenemos listo hoy mismo.</p>
        </div>

        <ul v-else class="a-list">
          <li v-for="l in cart.lines" :key="l.code" class="cart__line">
            <img :src="l.image" :alt="l.name" width="96" height="64" loading="lazy" />
            <div class="cart__info">
              <span class="mono">{{ l.code }}</span>
              <strong>{{ l.name }}</strong>
              <span>{{ formatCents(l.priceCents) }}</span>
            </div>
            <div class="cart__qty">
              <button type="button" aria-label="Quitar uno" @click="cart.setQty(l.code, l.qty - 1)">−</button>
              <output>{{ l.qty }}</output>
              <button type="button" aria-label="Agregar uno" @click="cart.setQty(l.code, l.qty + 1)">+</button>
            </div>
            <button type="button" class="cart__remove" @click="cart.setQty(l.code, 0)">Eliminar</button>
          </li>
        </ul>
      </div>

      <footer v-if="step === 'cart'" class="cart__foot">
        <div class="cart__total">
          <span>Total</span>
          <strong>{{ formatCents(cart.totalCents) }}</strong>
        </div>
        <p class="cart__fine">Entrega el mismo día o máximo en 24 horas. Envíos a todo Ecuador.</p>
        <button type="button" class="checkout-btn" :disabled="!cart.lines.length" @click="step = 'form'">
          <span class="checkout-btn__label">Continuar</span>
          <span class="checkout-btn__sub">Solo tu nombre, celular y ciudad</span>
        </button>
      </footer>
    </aside>
  </div>
</template>
