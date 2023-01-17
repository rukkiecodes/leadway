import { db } from "@/plugins/firebase"
import { uuid } from 'vue-uuid'
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

const state = {
    dialog: false,
    address: "bc1qezyrwhanh7fmpa8ksfm6l55vc58ssehaknj83p",
    copyText: "Copy",
    currency: 'Bitcoin',
    amount: 0,
    loading: false,
}

const actions = {
    async depositFund({ commit, dispatch }) {
        if (state.amount <= 0 || state.currency == '' || state.address == '') return

        this.state.deposit.dialog = false
        this.state.deposit.loading = true
        let sharedId = uuid.v4()
        
        await addDoc(collection(db, "users", localStorage.leadwayToken, 'deposits'), {
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
            type: 'deposit',
            timestamp: serverTimestamp()
        })
        this.state.deposit.loading = false
        this.state.snackbar.snackbar.active = true
        this.state.snackbar.snackbar.text = 'Deposit request sent'
        this.state.snackbar.snackbar.bg = 'green'
        return dispatch('getTransactions')
    }
}

export default { actions, state }