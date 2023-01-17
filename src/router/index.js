// Composables
import { createRouter, createWebHistory } from 'vue-router'
import user from '@/views/user/routes'

const routes = [
  // user routes
  ...user
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const user = localStorage.leadwayToken

  if (requiresAuth && !user) next('/')
  else if (requiresAuth && user) next()
  else next()
})

export default router
