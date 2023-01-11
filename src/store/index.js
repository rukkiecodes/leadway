import {
    createStore
} from 'vuex'

// MODULES
import snackbar from './modules/snackbar.js'
import register from './modules/register.js'
import login from './modules/login.js'
import profile from './modules/profile'
import getProfile from './modules/getProfile'
import updateProfile from './modules/updateProfile'
import deposit from './modules/deposit'
import transactions from './modules/transactions'
import support from './modules/support'
import withdraw from './modules/withdraw'
import drawer from './modules/drawer'
import copies from './modules/copies'
import tradeMonitor from './modules/tradeMonitor'

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
