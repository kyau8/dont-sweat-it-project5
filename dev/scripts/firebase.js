// import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAQ3HLrQE7BMj_nmMUXNcgBEAYruHFzx-g",
    authDomain: "dont-sweat-it-todoapp.firebaseapp.com",
    databaseURL: "https://dont-sweat-it-todoapp.firebaseio.com",
    projectId: "dont-sweat-it-todoapp",
    storageBucket: "dont-sweat-it-todoapp.appspot.com",
    messagingSenderId: "461063263021"
};
firebase.initializeApp(config);

// Export the auth module of Firebase and the Google Provider to allow for use of Google Authentication anywhere in the app
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;