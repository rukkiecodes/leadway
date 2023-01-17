export default [
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/user/auth/Login.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/user/auth/Register.vue'),
    },
    {
        path: '/forgotPassword',
        name: 'forgotPassword',
        component: () => import('@/views/user/auth/ForgotPassword.vue'),
    },
    {
        path: '/app',
        name: 'app',
        component: () => import('@/views/user/app/Dashboard.vue'),
        meta: {
            requiresAuth: true
        },

        children: [
            {
                path: '',
                component: () => import('@/views/user/app/routes/Home.vue'),
            },
            {
                path: 'profile',
                component: () => import('@/views/user/app/routes/Profile.vue'),
            },
            {
                path: 'copytrade',
                component: () => import('@/views/user/app/routes/Copytrade.vue'),
            },
            {
                path: 'support',
                component: () => import('@/views/user/app/routes/Support.vue'),
            },
            {
                path: 'transactions',
                component: () => import('@/views/user/app/routes/Transactions.vue'),
            },
            {
                path: 'tradeMonitor',
                component: () => import('@/views/user/app/routes/TradeMonitor.vue'),
            }
        ]
    },
]