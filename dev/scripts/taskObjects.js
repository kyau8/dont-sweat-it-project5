import React from 'react';


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
                dailyWeeklyTasks: newWeeklyTasks,
                dailyMonthlyTasks: newMonthlyTasks
            });
        });
    }
    // Print the tasks onto the page
    render() {
        return (
            <ul>Daily Tasks
                {this.state.dailyUserTasks.map((dailyDo) => {
                    return <li key={dailyDo.key}>{dailyDo.task}
                    <TaskCompletionLevel />
                    </li>
                })}
            </ul>
        )
    }
}

const TaskCompletionLevel = () => {
    return (
        <form action="">
            <label htmlFor='complete'>&#10004;</label>
            <input htmlFor='complete' value='complete' type="radio" />
            <label htmlFor='notComplete'>&#10005;</label>
            <input htmlFor='notComplete' value='notComplete' type="radio" />
            <label htmlFor='forgot'>???</label>
            <input htmlFor='forgot' value='forgot' type="radio" />
        </form>
    )
}

export default TaskObjects;