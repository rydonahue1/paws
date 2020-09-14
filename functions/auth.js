const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.saveUser = functions.auth.user().onCreate(async (user) => {
    const docRef = admin.firestore().collection('users').doc(user.uid);
    const { displayName, email, emailVerified, phoneNumber, photoURL, uid, } = user;
    const { creationTime } = user.metadata;

    return docRef.set({
        creationTime,
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        orgs: [],
        uid,
    })
});
