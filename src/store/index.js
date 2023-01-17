import {
    createStore
} from 'vuex'

// MODULES
import snackbar from './modules/snackbar.js'

// USER STATE
import register from '@/views/user/store/register'
import login from '@/views/user/store/login'
import profile from '@/views/user/store/profile'
import getProfile from '@/views/user/store/getProfile'
import updateProfile from '@/views/user/store/updateProfile'
import deposit from '@/views/user/store/deposit'
import transactions from '@/views/user/store/transactions'
import support from '@/views/user/store/support'
import withdraw from '@/views/user/store/withdraw'
import drawer from '@/views/user/store/drawer'
import copies from '@/views/user/store/copies'
import tradeMonitor from '@/views/user/store/tradeMonitor'

export default createStore({
    strict: false,
    modules: {
        snackbar,
        register,
        login,
        profile,
        getProfile,
        updateProfile,
        deposit,
        transactions,
        support,
        withdraw,
        drawer,
        copies,
        tradeMonitor
    },
})
