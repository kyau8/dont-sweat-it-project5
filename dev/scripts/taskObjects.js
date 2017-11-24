import React from 'react';
import RemoveTask from './removeTask';


// Create a list of task objects - these are the tasks the users can push into their daily, weekly, or monthly arrays
class TaskObjects extends React.Component {
    constructor() {
        super();
        this.state = {
            // One empty task array of all the tasks, and three empty arrays that will hold the categoried user tasks
            dailyUserTasks: [],
            weeklyUserTasks: [],
            monthlyUserTasks: []
        }
        this.hideTask = this.hideTask.bind(this);
    }
    // Grab the task data from Firebase, evaluate what their taskCategory is, and update the userTasks state
    componentDidMount() {
        const dbRef = firebase.database().ref('userTasks');
        dbRef.on('value', (response) => {
            const newUserTasks = [];
            let newDailyTasks = [];
            let newWeeklyTasks = [];
            let newMonthlyTasks = [];
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
                newDailyTasks = newUserTasks.filter(function(dailyTask) {
                    return dailyTask.taskCategory === 'daily';
                });
                newWeeklyTasks = newUserTasks.filter(function(weeklyTask) {
                    return weeklyTask.taskCategory === 'weekly';
                });
                newMonthlyTasks = newUserTasks.filter(function(monthlyTask) {
                    return monthlyTask.taskCategory === 'monthly';
                });
            }
            this.setState({
                dailyUserTasks: newDailyTasks,
                weeklyUserTasks: newWeeklyTasks,
                monthlyUserTasks: newMonthlyTasks
            });
        });
    }
    // Write a method to hide the tasks if the radio button is selected
    hideTask(index) {
        const removeTask = this.state.dailyUserTasks[index].key;
        // const keyValue = removeTask.
        const thing = document.getElementById(removeTask);
        thing.className += 'displayNone';
        console.log(thing);
    }
    // Print the tasks onto the page
    render() {
        return (
            <section>
                <ul>Daily Tasks
                    {this.state.dailyUserTasks.map((dailyDo,i) => {
                        return <li key={dailyDo.key} id={dailyDo.key} >{dailyDo.task}
                            <TaskCompletionLevel hideTask={this.hideTask} dailyDoIndex={i} />
                        </li>
                    })}
                </ul>
                <ul>Weekly Tasks
                    {this.state.weeklyUserTasks.map((weeklyDo) => {
                        return <li key={weeklyDo.key}>{weeklyDo.task}
                            <TaskCompletionLevel hideTask={this.hideTask} />
                        </li>
                    })}
                </ul>
                <ul>Monthly Tasks
                    {this.state.monthlyUserTasks.map((monthlyDo) => {
                        return <li key={monthlyDo.key}>{monthlyDo.task}
                            <TaskCompletionLevel hideTask={this.hideTask} />
                        </li>
                    })}
                </ul>
            </section>
        )
    }
}

const TaskCompletionLevel = (props) => {
    return (
        <form action="">
            <label htmlFor='complete' name='taskStatus'>&#10004;</label>
            <input htmlFor='complete' value='complete' type="radio" name='taskStatus' />
            <label htmlFor='notComplete' name='taskStatus'>&#10005;</label>
            <input htmlFor='notComplete' value='notComplete' type="radio" name='taskStatus' />
            <label htmlFor='forgot' name='taskStatus'>???</label>
            <input htmlFor='forgot' value='forgot' type="radio" name='taskStatus' />
            {/* <button className="deleteTask" onClick={props.hideTask}>Delete</button> */}
            {/* <RemoveTask /> */}
            <label htmlFor='delete' name='taskStatus' className='deleteButton'>Delete</label>
            <input htmlFor='delete' value='delete' type="radio" name='taskStatus' onClick={() => props.hideTask(props.dailyDoIndex)} className='deleteButton' />
        </form>
    )
}

export default TaskObjects;