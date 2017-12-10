// // import React from 'react';

// class UserAuthentication extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             loggedIn: false,
//             userID: ''
//         }
//         this.login = this.login.bind(this);
//         this.logout = this.logout.bind(this);
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
//                 // console.log(user.user.uid);
//                 this.setState({
//                     loggedIn: true,
//                     userID: user.user.uid
//                 });
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
//             });
//     }

//     // componentDidMount() {
//     //     // Listens to when things change  
//     //     firebase.auth().onAuthStateChanged((user) => {
//     //         console.log(user);
//     //         if (user) {
//     //             console.log('User is logged in');
//     //             this.setState({
//     //                 loggedIn: true,
//     //                 userID: user.user.uid
//     //             });
//     //         }
//     //         else {
//     //             console.log('User is logged out');
//     //             this.setState({
//     //                 loggedIn: false,
//     //                 userID: ''
//     //             })
//     //         }
//     //     });
//     // }

//     render() {
//         return (
//             <div>
//                 <a href="" onClick={this.login}>Login</a>
//                 <a href="" onClick={this.logout}>Logout</a>
//             </div>
//         )
//     }
// }

// // export default UserAuthentication;