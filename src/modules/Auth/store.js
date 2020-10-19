import { firebase, auth } from '@/fire'
//import { get, pick } from 'lodash'

const state = {
    user: {},
    token: '',
}

const getters = {}

const mutations = {
    setUser(state, user) {
        console.log(user)
        state.user = user;
    },
    unsetUser(state) {
        state.user = {};
    }
}

const actions = {
    async signUpUserWithEmail(context, payload) {
        const res = await auth.createUserWithEmailAndPassword(payload.email, payload.password)
        context.commit({
            type: 'setUser',
            user: res.user,
        });

        return res.user;
    },
    async signInUserWithEmail(context, payload) {
            const res = await auth.signInWithEmailAndPassword(payload.email, payload.password)
            // context.commit({
            //     type: 'setUser',
            //     user: res.user,
            // });
            return res.user;
    },
    async signInUserWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)
        // context.commit({ 
        //     type: 'setUser', 
        //     user: res.user, 
        // });

        return res.user;
    },
    async signOut() {
        const res = await auth.signOut()
        //context.commit({ type: 'unsetUser' });

        return res;
    },
    // unsetUser(context) {
    //     context.commit({ type: 'unsetUser' });
    // },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}