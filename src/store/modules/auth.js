import firebase from 'firebase'

export default {
    state: {
        user: {},
    },
    getters: {

    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        registerUser(context, data) {
            return new Promise((resolve, reject) => {
                firebase.auth()
                    .createUserWithEmailAndPassword(data.email, data.password)
                    .then(response => {
                        context.commit({
                            type: 'setUser',
                            user: response.user,
                        });
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }
    }
}