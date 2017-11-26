import React from 'react';

// User adds a task using the form. Take the task, update the object, and push it to Firebase. Make sure the updates are printed to the respective categories on the main page
class AddTask extends React.Component {
    constructor() {
        super();
        this.state = {
            // task:'',
            // taskCategory:''
            newTask: {
                display: true,
                task: '',
                taskCategory: 'daily',
                taskStatus: 'default',
                iconType: 'fa fa-leaf'
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        let updatedTask1 = Object.assign({}, this.state.newTask);
        updatedTask1.task = e.target.value
        this.setState({
            newTask:updatedTask1
        })
    }
    selectChange(e){
        let updatedTask2 = Object.assign({}, this.state.newTask);
        updatedTask2.taskCategory = e.target.value
        this.setState({
            newTask:updatedTask2
        })
    }
    handleSubmit(e){
        e.preventDefault();
        const newTaskData = firebase.database().ref('userTasks');
        const newInfo = this.state.newTask;
        newTaskData.push(newInfo);
        let updateInputTask = Object.assign({},this.state.newTask);
        updateInputTask.task = ''
        this.setState({
            newTask:updateInputTask
        })
    }
    render() {
        return (
            <form action="" onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChange} className="inputBox" value={this.state.newTask.task} required="true"/>
                <TaskForm selectChange={this.selectChange} />
                <button type="submit">Add Task</button>
            </form>
        )
    }
}

const TaskForm = (props) => {
    return (
            <select name="taskCategory" id="" htmlFor="newTaskCategory" onChange={props.selectChange}>
                <option value="daily">Daily Task</option>
                <option value="weekly">Weekly Task</option>
                <option value="monthly">Monthly Task</option>
            </select>
    )
}

// add displayNone class to button
// var addClass = document.getElementById('geoButton');
// addClass.className += 'displayNone';

export default AddTask;