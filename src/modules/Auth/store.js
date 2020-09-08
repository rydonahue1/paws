import { firebase, auth, db } from '@/fire'
import { get, pick } from 'lodash'

const state = {
    user: {},
    token: '',
}

const getters = {}

const mutations = {
    setUser(state, payload) {
        console.log(payload.user)
        state.user = payload.user;
    },
    unsetUser(state) {
        state.user = {};
    }
}

const actions = {
    // registerUserWithEmail(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         auth.createUserWithEmailAndPassword(payload.email, payload.password)
    //             .then(response => {
    //                 context.commit({
    //                     type: 'setUser',
    //                     user: response.user,
    //                     token: null,
    //                 });
    //                 resolve(response);
    //             }).catch(error => {
    //                 reject(error);
    //             });
    //     });
    // },
    // setUser(context, user) {
    //     context.commit({
    //         type: 'setUser',
    //         user: user,
    //     });
    // },
    // signinUserWithEmail(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         auth.signInWithEmailAndPassword(payload.email, payload.password)
    //             .then(response => {
    //                 context.commit({
    //                     type: 'setUser',
    //                     user: response.user,
    //                     token: null,
    //                 });
    //                 resolve(response);
    //             })
    //             .catch(error => {
    //                 reject(error);
    //             });
    //     });
    // },
    // async signinUserWithGoogle(context) {
    //     const provider = new firebase.auth.GoogleAuthProvider();

    //     try {
    //         const signedIn = await auth.signInWithPopup(provider)
    //         const userRef = await db.collection('users').doc(signedIn.user.uid)
    //         const doc = await userRef.get();

    //         const data = pick(signedIn.user, ['uid', 'displayName', 'email', 'photoURL', 'phoneNumber'])

    //         if (doc.exists) {
    //             context.commit({
    //                 type: 'setUser',
    //                 user: data,
    //             });
    //         } else {

    //             const res = await userRef.set({
    //                 ...data,
    //                 orgs: []
    //             }).then()

    //             console.log(res)
    //         }

    //         console.log(doc, 'document')

    //     } catch (err) {
    //         console.log(err, 'didnt make it')
    //         return err
    //     }

    //     console.log(context);

    //     // return new Promise((resolve, reject) => {
    //     //     if (res) resolve(response)
    //     //     else reject(err)
    //     // }
    //         // .then(response => {
    //         //     // The signed-in user info.
    //         //     this.saveUser()
    //         //     console.log(response, 'response from store')
    //         //     console.log(context, 'response from store')
    //         //     resolve(response);
    //         // })
    //         // .catch(error => {
    //         //     // Handle Errors here.
    //         //     reject(error);
    //         // });
    //     // return new Promise((resolve, reject) => {


    //     // });
    // },
    async getUser(context) {
        const uid = await auth.currentUser.uid;
        const docRef = db.collection('users').doc(uid);
        const record = await docRef.get();
        context.commit({
            type: 'setUser',
            user: record.data(),
        });
    },
    async saveUser(context, signIn) {
        const docRef = db.collection('users').doc(signIn.user.uid)
        const user = await auth.currentUser
        const profile = pick(user, ['displayName', 'email', 'phoneNumber', 'photoURL', 'providerId', 'uid']) ;
        
        //const { given_name: firstName, family_name: lastName } = signIn.additionalUserInfo.profile
        const firstName = get(signIn, 'additionalUserInfo.profile.given_name', '');
        const lastName = get(signIn, 'additionalUserInfo.profile.family_name', '');
        
        await docRef.set({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            ...profile,
            firstName,
            lastName,
            orgs: [],
            geometry: null,
        })

        const record = await docRef.get();
        context.commit({
            type: 'setUser',
            user: record.data(),
        });
       
    },
    signOut(context) {
        return new Promise((resolve, reject) => {
            auth.signOut()
                .then(response => {
                    context.commit({ type: 'unsetUser' });
                    resolve(response);
                })
                .catch(error => {
                    // Handle Errors here.
                    reject(error);
                });
        });
    },
    unsetUser(context) {
        context.commit({ type: 'unsetUser' });
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}