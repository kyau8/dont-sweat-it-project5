import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import Landing from './landing';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


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
