import Firebase from "firebase";
import {modelInstance} from './data/MovieModel';

const currentUser = () => {
    var user = Firebase.auth().currentUser;
    if (user) {
        modelInstance.setCookie(user.uid);
    } else {
        modelInstance.setCookie();
    }
}

export const signIn = (email, password) => {
    return Firebase.auth().signInWithEmailAndPassword(email, password).then(() => currentUser());
}

export const signUp = (email, password) => {
    return  Firebase.auth().createUserWithEmailAndPassword(email, password).then(() => currentUser());
}

export const signOut = () => {
    modelInstance.removeCookie();
    return Firebase.auth().signOut().catch(console.log);
}