import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/user'
import '@/styles/global.scss'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

// httpBase emite este evento con un 401: la sesión del panel caducó.
window.addEventListener('auth:token-expired', () => {
  useUserStore(pinia).clear()
  const current = router.currentRoute.value
  if (current.matched.some((r) => r.meta.requiresAdmin)) {
    router.replace({ name: 'Login', query: { next: current.fullPath } })
  }
})

router.isReady().finally(() => {
  app.mount('#app')
  const splash = document.getElementById('splash')
  if (!splash) return
  requestAnimationFrame(() => {
    splash.classList.add('is-leaving')
    setTimeout(() => splash.remove(), 700)
  })
})
