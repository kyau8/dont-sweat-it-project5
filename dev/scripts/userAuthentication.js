// import React from 'react';

// class UserAuthentication extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             loggedIn: false,
//             userID: ''
//         }
//         this.login = this.login.bind(this);
//         this.logout = this.logout.bind(this);
//         // this.listenToLogin = this.listenToLogin.bind(this);
//     }
//     login(e) {
//         e.preventDefault();
//         const provider = new firebase.auth.GoogleAuthProvider();
//         console.log('logging in!')
//         // When the user clicks login, popup appears
//         firebase.auth().signInWithPopup(provider)
//             // the sign in with popup will return a promise
//             .then((user) => {
//                 // If I click log in, then logged in should be true
//                 console.log(user.user.uid);
//                 this.setState({
//                     loggedIn: true,
//                     userID: user.user.uid
//                 });
//                 // this.listenToLogin();
//             });
//     }

//     logout(e) {
//         e.preventDefault();
//         firebase.auth().signOut()
//             .then(() => {
//                 console.log('Signed out successfully');
//                 this.setState({
//                     loggedIn: false,
//                     userID: ''
//                 });
//                 // this.listenToLogin();
//             });
//     }

//     // Write a function to evaluate the state of the login on click of the login button. If login is true, run a method to display the taskobjects and add task page
//     // loginState() {
//     //     if (this.state.loggedIn === false) {
//     //         // if false, display none for the entire app
//     //         headerClass = 'loggedOutHeader';
//     //         mainClass = 'hideMain'
//     //     }
//     // }

//     // listenToLogin() {
//     //     if (this.state.loggedIn === false) {
//     //         document.getElementById("mainSection").className = "hideMain;"
//     //     }
//     // }

//     componentDidMount() {
//         // Listens to when things change, if the login state is false, then display none for my entire app and ask them to login. else, display the app
//         firebase.auth().onAuthStateChanged((user) => {
//             if (user) {
//                 console.log('User is logged in');
//                 // this.setState({
//                 //     loggedIn: true,
//                 // });
//                 document.getElementById("mainSection").removeClass = "hideMain";

//             }
//             else {
//                 console.log('User is logged out');
//                 document.getElementById("mainSection").className = "hideMain";
//             }
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <a href="" onClick={this.login}>Login</a>
//                 <a href="" onClick={this.logout}>Logout</a>
//             </div>
//         )
//     }
// }

// export default UserAuthentication;

// // Login state is empty - then don't display the stuff. if login state is true, then display the information. 