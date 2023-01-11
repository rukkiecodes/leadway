// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/auth/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/Register.vue'),
  },
  {
    path: '/forgotPassword',
    name: 'forgotPassword',
    component: () => import('@/views/auth/ForgotPassword.vue'),
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('@/views/app/Dashboard.vue'),
    meta: {
      requiresAuth: true
    },

    children: [
      {
        path: '',
        component: () => import('@/views/app/routes/Home.vue'),
      },
      {
        path: 'profile',
        component: () => import('@/views/app/routes/Profile.vue'),
      },
      {
        path: 'copytrade',
        component: () => import('@/views/app/routes/Copytrade.vue'),
      },
      {
        path: 'support',
        component: () => import('@/views/app/routes/Support.vue'),
      },
      {
        path: 'transactions',
        component: () => import('@/views/app/routes/Transactions.vue'),
      },
      {
        path: 'tradeMonitor',
        component: () => import('@/views/app/routes/TradeMonitor.vue'),
      }
    ]
  },
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
