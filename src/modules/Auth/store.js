import { auth, db, firebase } from '@/fire'

console.log(db);

export default {
    state: {
        user: {},
        token: '',
    },
    getters: {

    },
    mutations: {
        setUser(state, payload) {
            state.token = payload.token
            state.user = payload.user;
        },
        unsetUser(state) {
            state.user = {};
            state.token = '';
        }
    },
    actions: {
        registerUserWithEmail(context, payload) {
            return new Promise((resolve, reject) => {
                auth.createUserWithEmailAndPassword(payload.email, payload.password)
                    .then(response => {
                        context.commit({
                            type: 'setUser',
                            user: response.user,
                            token: null,
                        });
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    });
            });
        },
        signinUserWithEmail(context, payload) {
            return new Promise((resolve, reject) => {
                auth.signInWithEmailAndPassword(payload.email, payload.password)
                    .then(response => {
                        context.commit({
                            type: 'setUser',
                            user: response.user,
                            token: null,
                        });
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        signinUserWithGoogle(context) {
            return new Promise((resolve, reject) => {

                var provider = new firebase.auth.GoogleAuthProvider();

                auth.signInWithPopup(provider)
                    .then(response => {
                        // The signed-in user info.
                        context.commit({
                            type: 'setUser',
                            user: response.user,
                            token: response.credential.accessToken,
                        });
                        resolve(response);
                    })
                    .catch(error => {
                        // Handle Errors here.
                        reject(error);
                    });
            });
        },
        signOut(context) {
            return new Promise((resolve, reject) => {
                auth.signOut()
                    .then(response => {
                        context.commit({
                            type: 'unsetUser'
                        });
                        resolve(response)
                    })
                    .catch(error => {
                        // Handle Errors here.
                        reject(error);
                    });
            });
        }
    }
}