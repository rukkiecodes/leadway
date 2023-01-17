import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, increment, setDoc } from "firebase/firestore";
import { auth, db } from "@/plugins/firebase";
import router from "@/router";

const register = {
    state: () => ({
        credentials: {
            name: '',
            email: '',
            phone: '',
            password: '',
        },
        agree: false,
        loading: false,
        googleLoading: false,
    }),

    actions: {
        registerUser() {
            let credentials = this.state.register.credentials
            
            if (credentials.name == '' || credentials.email == '' || credentials.phone == '' || credentials.password == '') {
                this.state.snackbar.snackbar.active = true
                this.state.snackbar.snackbar.text = 'Please fill all fields'
                this.state.snackbar.snackbar.bg = 'red'
            } else {
                if (!this.state.register.agree) {
                    this.state.snackbar.snackbar.active = true
                    this.state.snackbar.snackbar.text = 'You can not proceed without agreeing to the terms and conditions'
                    this.state.snackbar.snackbar.bg = 'red'
                } else {
                    this.state.register.loading = true
                    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            console.log(user)
                            this.state.register.loading = false
                            this.state.snackbar.snackbar.active = true
                            this.state.snackbar.snackbar.text = 'Account created successfully'
                            this.state.snackbar.snackbar.bg = 'green'
                            router.push('/app')
                            setDoc(doc(db, "users", user.uid), {
                                name: credentials.name,
                                email: credentials.email,
                                phone: credentials.phone,
                                provider: 'email',
                            })
                            setDoc(doc(db, "support", localStorage.leadwayToken), {
                                messageCount: increment(1)
                            })
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            if (errorCode == 'auth/email-already-in-use') {
                                this.state.register.loading = false
                                this.state.snackbar.snackbar.active = true
                                this.state.snackbar.snackbar.text = 'Email already in use'
                                this.state.snackbar.snackbar.bg = 'red'
                            } else if (errorCode == 'auth/invalid-email') {
                                this.state.register.loading = false
                                this.state.snackbar.snackbar.active = true
                                this.state.snackbar.snackbar.text = 'Invalid email'
                                this.state.snackbar.snackbar.bg = 'red'
                            } else if (errorCode == 'auth/weak-password') {
                                this.state.register.loading = false
                                this.state.snackbar.snackbar.active = true
                                this.state.snackbar.snackbar.text = 'Weak password'
                                this.state.snackbar.snackbar.bg = 'red'
                            } else if (errorCode == 'auth/operation-not-allowed') {
                                this.state.register.loading = false
                                this.state.snackbar.snackbar.active = true
                                this.state.snackbar.snackbar.text = 'Operation not allowed'
                                this.state.snackbar.snackbar.bg = 'red'
                            } else if (errorCode == 'auth/user-disabled') {
                                this.state.register.loading = false
                                this.state.snackbar.snackbar.active = true
                                this.state.snackbar.snackbar.text = 'User disabled'
                                this.state.snackbar.snackbar.bg = 'red'
                            } else if (errorCode == 'auth/user-not-found') {
                                this.state.register.loading = false
                                this.state.snackbar.snackbar.active = true
                                this.state.snackbar.snackbar.text = 'User not found'
                                this.state.snackbar.snackbar.bg = 'red'
                            } else if (errorCode == 'auth/wrong-password') {
                                this.state.register.loading = false
                                this.state.snackbar.snackbar.active = true
                                this.state.snackbar.snackbar.text = 'Wrong password'
                                this.state.snackbar.snackbar.bg = 'red'
                            } else if (errorCode == 'auth/invalid-verification-code') {
                                this.state.register.loading = false
                                this.state.snackbar.snackbar.active = true
                                this.state.snackbar.snackbar.text = 'Invalid verification code'
                                this.state.snackbar.snackbar.bg = 'red'
                            } else if (errorCode == 'auth/invalid-verification-id') {
                                this.state.register.loading = false
                                this.state.snackbar.snackbar.active = true
                                this.state.snackbar.snackbar.text = 'Invalid verification id'
                                this.state.snackbar.snackbar.bg = 'red'
                            }
                        });
                }
            }
        },

        googleRegister() {
            this.state.register.googleLoading = true
            const provider = new GoogleAuthProvider();

            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    console.log(user)
                    this.state.register.googleLoading = false
                    this.state.snackbar.snackbar.active = true
                    this.state.snackbar.snackbar.text = 'Account created successfully'
                    this.state.snackbar.snackbar.bg = 'green'
                    router.push('/app')
                    setDoc(doc(db, "users", user.uid), {
                        name: user.auth.currentUser.displayName,
                        email: user.auth.currentUser.email,
                        phone: user.auth.currentUser.phoneNumber,
                        provider: 'google',
                    })
                    setDoc(doc(db, "support", localStorage.leadwayToken), {
                        messageCount: increment(1)
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    if (errorCode == 'auth/account-exists-with-different-credential') {
                        this.state.register.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'Account exists with different credential'
                        this.state.snackbar.snackbar.bg = 'red'
                    } else if (errorCode == 'auth/invalid-credential') {
                        this.state.register.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'Invalid credential'
                        this.state.snackbar.snackbar.bg = 'red'
                    } else if (errorCode == 'auth/operation-not-allowed') {
                        this.state.register.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'Operation not allowed'
                        this.state.snackbar.snackbar.bg = 'red'
                    } else if (errorCode == 'auth/user-disabled') {
                        this.state.register.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'User disabled'
                        this.state.snackbar.snackbar.bg = 'red'
                    } else if (errorCode == 'auth/user-not-found') {
                        this.state.register.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'User not found'
                        this.state.snackbar.snackbar.bg = 'red'
                    } else if (errorCode == 'auth/wrong-password') {
                        this.state.register.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'Wrong password'
                        this.state.snackbar.snackbar.bg = 'red'
                    } else if (errorCode == 'auth/invalid-verification-code') {
                        this.state.register.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'Invalid verification code'
                        this.state.snackbar.snackbar.bg = 'red'
                    } else if (errorCode == 'auth/invalid-verification-id') {
                        this.state.register.googleLoading = false
                        this.state.snackbar.snackbar.active = true
                        this.state.snackbar.snackbar.text = 'Invalid verification id'
                        this.state.snackbar.snackbar.bg = 'red'
                    }
                });
        },
    }
}

export default register
