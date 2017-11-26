import React from 'react';
import ReactDOM from 'react-dom';
import TaskObjects from './taskObjects';
import AddTask from './addTask';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

// import RemoveTask from './removeTask';

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
// Users can select 'new day' to save data for a new day/week/month. The previous day/week/month's information will be available for access (still stored in Firebase).
// Stretch goals: user authentication, and adding dates into the app so that the information automatically refreshes (use the date object, and add a 'created' property to the task object)

// Move the to do objects into an array
// Using the .map method, print the to do objects to the settings section.
// Create an app component that prints ta
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
                    <h1>Don't Sweat It <i className="fa fa-tint"></i></h1>
                    <p className="date">{moment().format('MMM D YYYY')}</p>
                    <AddTask />
                </header>
                <TaskObjects />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
