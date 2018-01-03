import React from 'react';
import firebase, { auth, provider } from './firebase';
import moment from 'moment';
import TaskObjects from './taskObjects';
import AddTask from './addTask';
import Login from './login';

class Landing extends React.Component {
    constructor() {
        super();
        this.state = {
            user: false,
            userId: '',
        }
        this.logout = this.logout.bind(this);
    }
    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: false
                });
            });
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                const id = firebase.auth().currentUser.uid;
                this.setState({ 
                    user: true, 
                    userId: id,
                });
            }
        });
    }
    render() {
        return (
            <div>
                {this.state.user === false ?
                    <Login />
                    :
                    <div className="footerParent">
                    <div>
                        <header>
                            <div className="wrapper">
                                <div className="headerDiv">
                                    <div className="title">
                                        <h1 className="mainTitle">Don't Sweat It <i className="fa fa-tint"></i></h1>
                                        <h3>You're #adulting just fine. Use the buttons below to colour code and keep track of your tasks.</h3>
                                    </div>
                                    <div className="headerDate">
                                        <p className="date">{moment().format('MMM D YYYY')}</p>
                                        <button className="log" onClick={this.logout}>Log Out</button>
                                    </div>
                                    <AddTask userId={this.state.userId} />
                                </div>
                                <ul className="legendContents">
                                    <li><i className="fa fa-smile-o"></i>Completed</li>
                                    <li><i className="fa fa-frown-o"></i>Not Completed</li>
                                    <li><i className="fa fa-meh-o"></i>Can't Remember</li>
                                    <li><i className="fa fa-trash-o"></i>Delete Task</li>
                                </ul>
                            </div>
                        </header>
                            <TaskObjects userId={this.state.userId} />
                    </div>
                    <footer>
                        <div className="wrapper">
                            <div className="footerDiv">
                                <p className="footerText">Created by <a href="https://twitter.com/kyau8">@kyau8</a></p>
                                <h1 className="footerTitle">Don't Sweat It <i className="fa fa-tint"></i></h1>
                            </div>
                        </div>
                    </footer>
                    </div>
                }
            </div>
                
        )
    }
}

export default Landing;