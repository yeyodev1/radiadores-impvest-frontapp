import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: () => import('@/views/HomeView.vue') },
    { path: '/producto/:slug', name: 'Product', component: () => import('@/views/ProductView.vue') },
    { path: '/admin/login', name: 'Login', component: () => import('@/views/admin/LoginView.vue'), meta: { bare: true, title: 'Panel Impvest' } },
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayoutView.vue'),
      meta: { bare: true, requiresAdmin: true, title: 'Panel Impvest' },
      children: [
        { path: '', name: 'Dashboard', component: () => import('@/views/admin/DashboardView.vue') },
        { path: 'productos', name: 'AdminProducts', component: () => import('@/views/admin/ProductsView.vue') },
        { path: 'productos/:id', name: 'AdminProductEdit', component: () => import('@/views/admin/ProductEditView.vue') },
        { path: 'pedidos', name: 'AdminOrders', component: () => import('@/views/admin/OrdersView.vue') },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFoundView.vue') },
  ],
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 72 }
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  if (!to.matched.some((r) => r.meta.requiresAdmin)) return true
  const user = useUserStore()
  await user.restore()
  return user.isAdmin ? true : { name: 'Login', query: { next: to.fullPath } }
})

router.afterEach((to) => {
  if (to.meta.title) document.title = String(to.meta.title)
})

export default router
