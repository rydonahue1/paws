import firebase from 'firebase'

export default {
    state: {
        user: {},
        token: '',
    },
    getters: {

    },
    mutations: {
        setUser(state, data) {
            console.log(data.user);
            state.token = data.token
            state.user = data.user;
        },
        unsetUser(state) {
            state.user = {};
        }
    },
    actions: {
        registerUserWithEmail(context, data) {
            return new Promise((resolve, reject) => {
                firebase.auth()
                    .createUserWithEmailAndPassword(data.email, data.password)
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
        signinUserWithEmail(context, data) {
            return new Promise((resolve, reject) => {
                firebase.auth()
                    .signInWithEmailAndPassword(data.email, data.password)
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
                
                firebase.auth()
                    .signInWithPopup(provider)
                    .then(response => {
                        // The signed-in user info.
                        context.commit({
                            type: 'setUser',
                            user: response.user,
                            token: response.credential.accessToken,
                        });
                        resolve(response)
                    })
                    .catch(error => {
                        // Handle Errors here.
                        reject(error);
                    });
            });
        },
        signOut(context) {
            return new Promise((resolve, reject) => {
                firebase.auth()
                    .signOut()
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