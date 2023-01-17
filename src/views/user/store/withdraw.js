import { db } from "@/plugins/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { uuid } from 'vue-uuid'

const state = {
    dialog: false,
    address: null,
    copyText: "Copy",
    currency: null,
    amount: 0,
    loading: false,
}

const actions = {
    async withdrawFund({ commit, dispatch }) {
        if (state.amount <= 0 || state.currency == '' || state.address == '') return

        this.state.withdraw.dialog = false
        this.state.withdraw.loading = true
        let sharedId = uuid.v4()

        await addDoc(collection(db, "users", localStorage.leadwayToken, 'withdraws'), {
            sharedId,
            currency: state.currency,
            amount: state.amount,
            address: state.address,
            user: localStorage.leadwayToken,
            state: 'pending',
            timestamp: serverTimestamp()
        })
        await addDoc(collection(db, "users", localStorage.leadwayToken, 'transactions'), {
            sharedId,
            currency: state.currency,
            amount: state.amount,
            address: state.address,
            user: localStorage.leadwayToken,
            state: 'pending',
            type: 'withdraw',
            timestamp: serverTimestamp()
        })
        this.state.withdraw.loading = false
        this.state.snackbar.snackbar.active = true
        this.state.snackbar.snackbar.text = 'Withdraw request sent'
        this.state.snackbar.snackbar.bg = 'green'
        return dispatch('getTransactions')
    }
}

export default { actions, state }