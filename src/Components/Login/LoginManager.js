import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeFramework = () => {
    firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedUser = { name: displayName, email: email, photo: photoURL, isSignedIn: true, success: true };
        return signedUser;
    }).catch(err => console.log(err.message));
}

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then((result) => {
        const user = result.user;
        user.success = true;
        return user;
    })
        .catch((error) => {
            console.log(error.code);
        });
}

export const createUserWithEmailAndPass = (name, email, pass) => {
    return firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.msg = 'Created user successful';
            newUserInfo.error = "";
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.msg = '';
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (email, pass) => {
    return firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.msg = 'Signed in successfully';
            newUserInfo.error = "";
            newUserInfo.success= true;
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.msg = '';
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const handleSignOut = () => {
    return firebase.auth().signOut().then(res => {
        const unSignedUser = { name: '', email: '', photo: '', isSignedIn: false, success: false };
        return unSignedUser;
    }).catch(err => console.log(err.message));
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
        // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
        console.log('Update successful')
    }).catch((error) => {
        console.log('An error occurred');
    });
}




const LoginManager = () => {
    return (
        <div>

        </div>
    );
};

export default LoginManager;