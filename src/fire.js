import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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

export default firebase;
