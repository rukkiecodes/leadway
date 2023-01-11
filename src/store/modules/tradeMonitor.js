import { db } from "@/plugins/firebase"
import { doc, getDoc, getDocs, onSnapshot } from "firebase/firestore"

const state = {
    allTrades: []
}

const getters = {
    allTrades: state => state.allTrades
}

const actions = {
    getAllTrades({ commit }) {
        if (this.state.profile?.copies != undefined && this.state.profile?.copies.length > 0) {
            this.state.tradeMonitor.allTrades = []

            this.state.profile?.copies.forEach(async copy => {
                const copyTrade = await getDoc(doc(db, "copyTrades", copy))
                this.state.tradeMonitor.allTrades.push({
                    id: copyTrade.id,
                    ...copyTrade.data(),
                })
            })
        }
    }
}

export default { state, getters, actions }