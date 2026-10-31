<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const router = useRouter()
const logout = () => {
  user.clear()
  router.replace('/admin/login')
}
</script>

<template>
  <div class="admin">
    <header class="admin__top">
      <RouterLink to="/admin" class="admin__brand"><img src="/img/brand/mark.webp" alt="" />Impvest</RouterLink>
      <nav aria-label="Panel">
        <RouterLink to="/admin">Inicio</RouterLink>
        <RouterLink to="/admin/productos">Productos</RouterLink>
        <RouterLink to="/admin/pedidos">Pedidos</RouterLink>
        <RouterLink to="/" target="_blank">Ver tienda</RouterLink>
      </nav>
      <button type="button" class="admin__logout" @click="logout">Salir</button>
    </header>
    <main class="admin__main">
      <RouterView />
    </main>
  </div>
</template>
