import React from 'react';
import ReactDOM from 'react-dom';
import TaskObjects from './taskObjects';
import AddTask from './addTask';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

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

// PSEUDOCODE
// Overview: create a 'done it' app to mark down the simple tasks that have been completed, with the goal of allowing users to keep track of what has/has not been done
// Create an object of tasks. These tasks need to be categorized as daily, weekly, or monthly tasks. Allow user to select which tasks are displayed in each of their fields (select which objects go into that array, and then print those objects into their respective section of the page). This information should be pushed to Firebase as it is filled in
// Allow users the option to add their own tasks into each section (daily, weekly, monthly)
// Users can mark tasks as completed, not-completed, or ??? (forgotten) - default is neutral. This information will be saved to Firebase.


class App extends React.Component {
    constructor(){
        super();
        this.state = {
        }
    }
    render() {
        console.log(moment());
        return (
            <div>
                <header>
                    <div className="wrapper">
                        <div className="headerDiv">
                            <div className="title">
                                <h1 className="mainTitle">Don't Sweat It <i className="fa fa-tint"></i></h1>
                                <h3>You're #adulting just fine. Use the buttons below to keep track of your tasks.</h3>
                            </div>
                            <p className="date">{moment().format('MMM D YYYY')}</p>
                            <AddTask />
                        </div>
                            <ul className="legendContents">
                                <li><i className="fa fa-smile-o"></i>Completed</li>
                                <li><i className="fa fa-frown-o"></i>Not Completed</li>
                                <li><i className="fa fa-meh-o"></i>Can't Remember</li>
                                <li><i className="fa fa-times-circle-o"></i>Delete Task</li>
                            </ul>
                        </div>
                    </header>
                <TaskObjects />
            <footer>
                <div className="wrapper">
                    <div className="footerDiv">
                        <p className="footerText">Created by <a href="https://twitter.com/kyau8">@kyau8</a></p>
                        <h1 className="footerTitle">Don't Sweat It <i className="fa fa-tint"></i></h1>
                    </div>
                </div>
            </footer>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
