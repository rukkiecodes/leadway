import { db } from "@/plugins/firebase"
import { addDoc, collection, doc, getDoc, increment, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore"

const state = {
    message: '',
    loading: false,
    chat: []
}

const getters = {
    chat: state => state.chat,
}

const mutations = {
    setChats(state, payload) {
        state.chat.push(payload)
    }
}

const actions = {
    sendMessage({ commit, dispatch }) {
        if (this.state.support.message == '') return

        addDoc(collection(db, "support", localStorage.leadwayToken, 'messages'), {
            message: this.state.support.message,
            user: localStorage.leadwayToken,
            timestamp: serverTimestamp()
        })
        this.state.support.message = ''

        const chatSheet = document.querySelector(".chatSheet");
        chatSheet.scrollTop = chatSheet.scrollHeight - chatSheet.clientHeight;
    },

    async getChat({ commit }) {
        const unsub = onSnapshot(query(collection(db, 'support', localStorage.leadwayToken, 'messages'), orderBy('timestamp', 'asc')),
            snapshot => {
                this.state.support.chat = []
                snapshot.forEach(doc => {
                    commit('setChats', {
                        id: doc.id,
                        ...doc.data()
                    })
                })
            })
        return unsub
    }
}

export default { actions, state, getters, mutations }