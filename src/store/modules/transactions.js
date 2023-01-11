import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "@/plugins/firebase"

const state = {
    allTransactions: []
}

const getters = {
    allTransactions: state => state.allTransactions
}

const mutations = {
    setTransactions(state, payload) {
        state.allTransactions.push(payload)
    }
}

const actions = {
    getTransactions({ commit }) {
        const unsub = onSnapshot(query(collection(db, 'users', localStorage.leadwayToken, 'transactions'), orderBy('timestamp', 'desc')),
            snapshot => {
                this.state.transactions.allTransactions = []
                snapshot.forEach(doc => {
                    commit('setTransactions', {
                        id: doc.id,
                        ...doc.data()
                    })
                })
            })
        return unsub
    }
}

export default { actions, state, getters, mutations }