import React from 'react';


// Create a list of task objects - these are the tasks the users can push into their daily, weekly, or monthly arrays
class TaskObjects extends React.Component {
    constructor() {
        super();
        this.state = {
            userTasks: []
        }
    }
    // Grab the task data from Firebase, and update the userTasks state
    componentDidMount() {
        const dbRef = firebase.database().ref('userTasks');
        dbRef.on('value', (response) => {
            // console.log(response.val());
            const newUserTasks = [];
            const taskList = response.val();
            // Make a new object and push key and the key value pairs into this object
            
            for (let tasks in taskList) {
                const newObject = {
                    key: tasks,
                    display: taskList[tasks].display,
                    task: taskList[tasks].task,
                    taskCategory: taskList[tasks].taskCategory,
                    taskStatus: taskList[tasks].taskStatus
                };
                newUserTasks.push(newObject);
            }
            this.setState({
                userTasks: newUserTasks
            });
        });
    }
    // Print the tasks onto the page
    render() {
        return (
            <ul>
                {this.state.userTasks.map((toDo) => {
                    <li>{toDo.task}</li>
                    console.log(toDo.task);
                })}
            </ul>
        )
    }
}

export default TaskObjects;