<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BUSINESS, NAV } from '@/config/site'
import TheMenu from '@/layout/TheMenu.vue'
import { useCatalog } from '@/composables/useCatalog'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const route = useRoute()
const router = useRouter()
const { query } = useCatalog()
const root = ref<HTMLElement | null>(null)
const menu = ref(false)
const menuTop = ref(0)
const text = ref('')

// El menú arranca justo bajo el header, esté o no la franja superior a la vista.
function toggleMenu() {
  menuTop.value = root.value?.getBoundingClientRect().bottom ?? 0
  menu.value = !menu.value
}

// El buscador de la barra comparte estado con la tienda: escribe y baja hasta ella.
function search() {
  query.value = text.value.trim()
  if (route.path === '/') document.getElementById('tienda')?.scrollIntoView({ behavior: 'smooth' })
  else router.push('/#tienda')
}
</script>

<template>
  <header ref="root" class="header" :class="{ 'is-menu': menu }">
    <div class="header__bar header__bar--brand">
      <RouterLink to="/" class="header__brand" aria-label="Radiadores Impvest, inicio" @click="menu = false">
        <img src="/img/brand/mark.webp" alt="" width="44" height="36" />
        <span>IMPVEST<small>{{ BUSINESS.tagline }}</small></span>
      </RouterLink>

      <nav class="header__nav" aria-label="Principal">
        <a v-for="l in NAV" :key="l.href" :href="l.href" @click="menu = false">{{ l.label }}</a>
      </nav>

      <div class="header__tools">
        <div class="header__contact">
          <span>Contacto</span>
          <a :href="`tel:${BUSINESS.phoneIntl}`">{{ BUSINESS.phoneDisplay }}</a>
          <a :href="`tel:${BUSINESS.phoneAltIntl}`">{{ BUSINESS.phoneAlt }}</a>
        </div>
        <a class="header__icon" href="/#sucursales" aria-label="Sucursales" title="Sucursales" @click="menu = false">
          <i class="fa-solid fa-house" aria-hidden="true" />
        </a>
        <button type="button" class="header__burger" :aria-expanded="menu" :aria-label="menu ? 'Cerrar menú' : 'Menú'" @click="toggleMenu">
          <span /><span />
        </button>
      </div>
    </div>

    <div class="header__bar header__bar--shop">
      <form class="header__search" role="search" @submit.prevent="search">
        <input v-model="text" type="search" placeholder="¿Qué repuesto estás buscando?" aria-label="Buscar repuesto" autocomplete="off" enterkeyhint="search" />
        <button type="submit" aria-label="Buscar"><i class="fa-solid fa-magnifying-glass" aria-hidden="true" /></button>
      </form>
      <span class="header__safe"><i class="fa-solid fa-lock" aria-hidden="true" /><b>Compra 100% segura</b></span>
      <button type="button" class="header__icon header__bag" :class="{ 'is-bump': cart.lastAdded }" :aria-label="`Abrir carrito, ${cart.count} productos`" @click="cart.open = true">
        <i class="fa-solid fa-cart-shopping" aria-hidden="true" />
        <span>{{ cart.count }}</span>
      </button>
    </div>
    <TheMenu :open="menu" :top="menuTop" @close="menu = false" />
  </header>
</template>
