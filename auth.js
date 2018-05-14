import Firebase from "firebase";

const currentUser = () => {
    var user = Firebase.auth().currentUser;
    if (user) {
        localStorage.setItem('currentUser', user.uid);
    } else {
        localStorage.setItem('currentUser', 'visitor');
    }
    console.log(localStorage);
}

export const signIn = (email, password) => {
    return Firebase.auth().signInWithEmailAndPassword(email, password).then(() => currentUser());
}

export const signUp = (email, password) => {
    return  Firebase.auth().createUserWithEmailAndPassword(email, password).then(() => currentUser());
}

export const signOut = () => {
    return Firebase.auth().signOut().catch(console.log);
    localStorage.clear();
}