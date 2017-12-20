import React from 'react';
import firebase, { auth, provider } from './firebase';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: false,
            // userId: '',
        }
        this.login = this.login.bind(this);
    }
    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                const userId = result.user.uid;
                console.log(userId);
                this.setState({
                    user: true,
                    // userId
                });
                // const dbRef = firebase.database().ref(`${userId}/`);
                // const id = this.state.userId;
                // dbRef.update({
                //     name: 'buttface',
                // });
            });
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ 
                    user: true
                });
            }
        });
    }
    render() {
        return (
            <div className="login">
                <button onClick={this.login}>Log In</button>
            </div>
        )
    }
}

export default Login;