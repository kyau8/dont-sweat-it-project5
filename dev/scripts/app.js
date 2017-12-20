import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import Landing from './landing';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


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
        return (
            <div>
                <Landing />
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
