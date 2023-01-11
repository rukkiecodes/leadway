import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../plugins/firebase";
import router from "../../router";

const register = {
    state: () => ({
        credentials: {
            email: '',
            password: '',
        },
        loading: false,
        googleLoading: false,
    }),

    actions: {
        loginUser() {
            let credentials = this.state.login.credentials

            if (credentials.email == '' || credentials.password == '') {
                this.state.snackbar.snackbar.active = true
                this.state.snackbar.snackbar.text = 'Please fill all fields'
                this.state.snackbar.snackbar.bg = 'red'
            } else {
                this.state.login.loading = true
                signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log(user)
                        localStorage.leadwayToken = user.uid
                        this.state.login.loading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'Logged in successfully'
                        this.state.snackbar.snackbar.bg = 'green'
                        router.push('/app') // redirect to app
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        if (errorCode == 'auth/email-already-in-use') {
                            this.state.login.loading = false
                            this.state.snackbar.snackbar.active = true
                            this.state.snackbar.snackbar.text = 'Email already in use'
                            this.state.snackbar.snackbar.bg = 'red'
                        } else if (errorCode == 'auth/invalid-email') {
                            this.state.login.loading = false
                            this.state.snackbar.snackbar.active = true
                            this.state.snackbar.snackbar.text = 'Invalid email'
                            this.state.snackbar.snackbar.bg = 'red'
                        } else if (errorCode == 'auth/weak-password') {
                            this.state.login.loading = false
                            this.state.snackbar.snackbar.active = true
                            this.state.snackbar.snackbar.text = 'Weak password'
                            this.state.snackbar.snackbar.bg = 'red'
                        } else if (errorCode == 'auth/operation-not-allowed') {
                            this.state.login.loading = false
                            this.state.snackbar.snackbar.active = true
                            this.state.snackbar.snackbar.text = 'Operation not allowed'
                            this.state.snackbar.snackbar.bg = 'red'
                        } else if (errorCode == 'auth/user-disabled') {
                            this.state.login.loading = false
                            this.state.snackbar.snackbar.active = true
                            this.state.snackbar.snackbar.text = 'User disabled'
                            this.state.snackbar.snackbar.bg = 'red'
                        } else if (errorCode == 'auth/user-not-found') {
                            this.state.login.loading = false
                            this.state.snackbar.snackbar.active = true
                            this.state.snackbar.snackbar.text = 'User not found'
                            this.state.snackbar.snackbar.bg = 'red'
                        } else if (errorCode == 'auth/wrong-password') {
                            this.state.login.loading = false
                            this.state.snackbar.snackbar.active = true
                            this.state.snackbar.snackbar.text = 'Wrong password'
                            this.state.snackbar.snackbar.bg = 'red'
                        } else if (errorCode == 'auth/invalid-verification-code') {
                            this.state.login.loading = false
                            this.state.snackbar.snackbar.active = true
                            this.state.snackbar.snackbar.text = 'Invalid verification code'
                            this.state.snackbar.snackbar.bg = 'red'
                        } else if (errorCode == 'auth/invalid-verification-id') {
                            this.state.login.loading = false
                            this.state.snackbar.snackbar.active = true
                            this.state.snackbar.snackbar.text = 'Invalid verification id'
                            this.state.snackbar.snackbar.bg = 'red'
                        }
                    });

            }
        },

        googleLogin() {
            this.state.login.googleLoading = true
            const provider = new GoogleAuthProvider();

            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    console.log(user)
                    localStorage.leadwayToken = user.uid
                    this.state.login.googleLoading = false
                    this.state.snackbar.snackbar.active = true
                    this.state.snackbar.snackbar.text = 'Logged in successfully'
                    this.state.snackbar.snackbar.bg = 'green'
                    router.push('/app')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    if (errorCode == 'auth/account-exists-with-different-credential') {
                        this.state.login.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'Account exists with different credential'
                        this.state.snackbar.snackbar.bg = 'red'
                    } else if (errorCode == 'auth/invalid-credential') {
                        this.state.login.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'Invalid credential'
                        this.state.snackbar.snackbar.bg = 'red'
                    } else if (errorCode == 'auth/operation-not-allowed') {
                        this.state.login.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'Operation not allowed'
                        this.state.snackbar.snackbar.bg = 'red'
                    } else if (errorCode == 'auth/user-disabled') {
                        this.state.login.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'User disabled'
                        this.state.snackbar.snackbar.bg = 'red'
                    } else if (errorCode == 'auth/user-not-found') {
                        this.state.login.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'User not found'
                        this.state.snackbar.snackbar.bg = 'red'
                    } else if (errorCode == 'auth/wrong-password') {
                        this.state.login.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'Wrong password'
                        this.state.snackbar.snackbar.bg = 'red'
                    } else if (errorCode == 'auth/invalid-verification-code') {
                        this.state.login.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'Invalid verification code'
                        this.state.snackbar.snackbar.bg = 'red'
                    } else if (errorCode == 'auth/invalid-verification-id') {
                        this.state.login.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'Invalid verification id'
                        this.state.snackbar.snackbar.bg = 'red'
                    }
                });
        },
    }
}

export default register
