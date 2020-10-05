import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import store from '@/store/store'


const firebaseConfig = {
    apiKey: "AIzaSyDyWFIA0kHZb4wdUw6yGLULwqmbnxZa2jU",
    authDomain: "paws-e6c4f.firebaseapp.com",
    databaseURL: "https://paws-e6c4f.firebaseio.com",
    projectId: "paws-e6c4f",
    storageBucket: "paws-e6c4f.appspot.com",
    messagingSenderId: "484217315548",
    appId: "1:484217315548:web:1ee5858f1408eeeb"
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

auth.onAuthStateChanged(async function (user) {
    if (user) {
        store.commit('setUser', user);
    } else {
        store.commit('unsetUser');
    }
});


// collection references
// const usersCollection = db.collection('users')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')

// export utils/refs
export {
    db,
    auth,
    firebase,
    // usersCollection,
    // postsCollection,
    // commentsCollection,
    // likesCollection
}

//export default firebase;
