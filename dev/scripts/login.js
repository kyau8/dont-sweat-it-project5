import React from 'react';
import firebase, { auth, provider } from './firebase';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: false,
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
                });
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
            <div className="landing">
                <div className="wrapper">
                    <div className="loginPage">
                        <h1 className="mainTitle">Don't Sweat It <i className="fa fa-tint"></i></h1>
                        <h3>Forget whether or not you've locked the front door today? Gone to the grocery store this week? Visited the gym this month? We known #adulting can be tough. 
                        </h3>
                        <h3>Keep track of all the daily, weekly, and monthly tasks on your plate. Mark your tasks as completed, not completed, or even if you miss a step and forget! Don't sweat it - remember, you're doing your best.</h3>
                        <button className="log" onClick={this.login}>Log In</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;