import { db } from "@/plugins/firebase"
import { doc, updateDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import router from "@/router"

const actions = {
    lightTheme() {
        if (!this.state.profile.theme) return
        
        this.state.profile.theme = false
        
        updateDoc(doc(db, "users", localStorage.leadwayToken), { theme: false })
        
        this.state.snackbar.snackbar.active = true
        this.state.snackbar.snackbar.text = 'Light theme activated'
        this.state.snackbar.snackbar.bg = 'green'
    },
    
    darkTheme() {
        if (this.state.profile.theme) return

        this.state.profile.theme = true

        updateDoc(doc(db, "users", localStorage.leadwayToken), { theme: true })
        this.state.snackbar.snackbar.active = true
        this.state.snackbar.snackbar.text = 'Dark theme activated'
        this.state.snackbar.snackbar.bg = 'green'
    },

    updateName() {
        this.state.profile.theme = true

        updateDoc(doc(db, "users", localStorage.leadwayToken), { theme: true })
        this.state.snackbar.snackbar.active = true
        this.state.snackbar.snackbar.text = 'Dark theme activated'
        this.state.snackbar.snackbar.bg = 'green'
    },

    updateName() {
        updateDoc(doc(db, "users", localStorage.leadwayToken), { name: this.state.profile.name })
        this.state.snackbar.snackbar.active = true
        this.state.snackbar.snackbar.text = 'Name updated'
        this.state.snackbar.snackbar.bg = 'green'
    },

    updateEmail() {
        updateDoc(doc(db, "users", localStorage.leadwayToken), { email: this.state.profile.email })
        this.state.snackbar.snackbar.active = true
        this.state.snackbar.snackbar.text = 'Email updated'
        this.state.snackbar.snackbar.bg = 'green'
    },

    updatePhone() {
        updateDoc(doc(db, "users", localStorage.leadwayToken), { phone: this.state.profile.phone })
        this.state.snackbar.snackbar.active = true
        this.state.snackbar.snackbar.text = 'Phone number updated'
        this.state.snackbar.snackbar.bg = 'green'
    },

    logoutUser() {
        localStorage.removeItem('leadwayToken')
        router.push('/')
    },

    pickAvatar({ commit }, file) {
        let _file = file.target.files[0]

        if (!_file) return

        const storage = getStorage()

        const storageRef = ref(storage, `avatars/${_file.name}`)

        const uploadTask = uploadBytesResumable(storageRef, _file)

        uploadTask.on('state_changed', (snapshot) => {
        }, (error) => {
            console.log(error)
            snackbar.active = true
            snackbar.text = 'Error uploading avatar'
            snackbar.bg = 'red'
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                updateDoc(doc(db, "users", localStorage.leadwayToken), { avatar: downloadURL })
                this.state.snackbar.snackbar.active = true
                this.state.snackbar.snackbar.text = 'Avatar updated'
                this.state.snackbar.snackbar.bg = 'green'
            })
        })
    }
}

export default { actions }