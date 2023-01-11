import { auth, db } from "@/plugins/firebase"
import { doc, getDoc } from "firebase/firestore"

const state = {
    profile: null
}

const actions = {
    getProfile({ commit, dispatch }) {
        getDoc(doc(db, "users", localStorage.leadwayToken)).then((doc) => {
            if (doc.exists()) {
                this.state.profile = doc.data()
                return dispatch("getAllTrades")
            } else {
                console.log("No such document!")
            }
        }).catch((error) => {
            console.log("Error getting document:", error)
        })
    }
}

export default { state, actions }
