import React from 'react';
// import RemoveTask from './removeTask';


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
        this.completeTask = this.completeTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
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
    completeTask(index) {
        const finishTask = this.state.dailyUserTasks[index].key;
        // const keyValue = removeTask.
        const markComplete = document.getElementById(finishTask);
        markComplete.className += 'completeText';
        console.log(markComplete);
    }
    deleteTask(index) {
        const dailyDeleteItem = this.state.dailyUserTasks[index].key;
        const weeklyDeleteItem = this.state.weeklyUserTasks[index].key;
        const monthlyDeleteItem = this.state.monthlyUserTasks[index].key;
        const dailyDeleteRef = firebase.database().ref(`userTasks/${dailyDeleteItem}`);
        const weeklyDeleteRef = firebase.database().ref(`userTasks/${weeklyDeleteItem}`);
        const monthlyDeleteRef = firebase.database().ref(`userTasks/${monthlyDeleteItem}`);
        dailyDeleteRef.remove();
        weeklyDeleteRef.remove();
        monthlyDeleteRef.remove();

        console.log(dailyDeleteItem);
    }
    // Print the tasks onto the page
    render() {
        return (
            <section>
                <ul>Daily Tasks
                    {this.state.dailyUserTasks.map((dailyDo,i) => {
                        return <li key={dailyDo.key} id={dailyDo.key} >{dailyDo.task}
                            <DailyTaskCompletion completeTask={this.completeTask} deleteTask={this.deleteTask} dailyDoIndex={i} />
                        </li>
                    })}
                </ul>
                <ul>Weekly Tasks
                    {this.state.weeklyUserTasks.map((weeklyDo,i) => {
                        return <li key={weeklyDo.key}>{weeklyDo.task}
                            <WeeklyTaskCompletion deleteTask={this.deleteTask} weeklyDoIndex={i} />
                        </li>
                    })}
                </ul>
                <ul>Monthly Tasks
                    {this.state.monthlyUserTasks.map((monthlyDo,i) => {
                        return <li key={monthlyDo.key}>{monthlyDo.task}
                            <MonthlyTaskCompletion deleteTask={this.deleteTask} monthlyDoIndex={i} />
                        </li>
                    })}
                </ul>
            </section>
        )
    }
}

const DailyTaskCompletion = (props) => {
    return (
        <form action="">
            <label htmlFor='complete' name='taskStatus'>&#10004;</label>
            <input htmlFor='complete' value='complete' type="radio" name='taskStatus' onClick={() => props.completeTask(props.dailyDoIndex)} />
            <label htmlFor='notComplete' name='taskStatus'>&#10005;</label>
            <input htmlFor='notComplete' value='notComplete' type="radio" name='taskStatus' />
            <label htmlFor='forgot' name='taskStatus'>???</label>
            <input htmlFor='forgot' value='forgot' type="radio" name='taskStatus' />
            {/* <button className="deleteTask" onClick={props.hideTask}>Delete</button> */}
            {/* <RemoveTask /> */}
            <label htmlFor='delete' name='taskStatus' className='deleteButton'>Delete</label>
            <input htmlFor='delete' value='delete' type="radio" name='taskStatus' className='deleteButton' onClick={() => props.deleteTask(props.dailyDoIndex)} />
        </form>
    )
}

const WeeklyTaskCompletion = (props) => {
    return (
        <form action="">
            <label htmlFor='complete' name='taskStatus'>&#10004;</label>
            <input htmlFor='complete' value='complete' type="radio" name='taskStatus' onClick={() => props.completeTask(props.dailyDoIndex)} />
            <label htmlFor='notComplete' name='taskStatus'>&#10005;</label>
            <input htmlFor='notComplete' value='notComplete' type="radio" name='taskStatus' />
            <label htmlFor='forgot' name='taskStatus'>???</label>
            <input htmlFor='forgot' value='forgot' type="radio" name='taskStatus' />
            {/* <button className="deleteTask" onClick={props.hideTask}>Delete</button> */}
            {/* <RemoveTask /> */}
            <label htmlFor='delete' name='taskStatus' className='deleteButton'>Delete</label>
            <input htmlFor='delete' value='delete' type="radio" name='taskStatus' className='deleteButton' onClick={() => props.deleteTask(props.weeklyDoIndex)} />
        </form>
    )
}

const MonthlyTaskCompletion = (props) => {
    return (
        <form action="">
            <label htmlFor='complete' name='taskStatus'>&#10004;</label>
            <input htmlFor='complete' value='complete' type="radio" name='taskStatus' onClick={() => props.completeTask(props.dailyDoIndex)} />
            <label htmlFor='notComplete' name='taskStatus'>&#10005;</label>
            <input htmlFor='notComplete' value='notComplete' type="radio" name='taskStatus' />
            <label htmlFor='forgot' name='taskStatus'>???</label>
            <input htmlFor='forgot' value='forgot' type="radio" name='taskStatus' />
            {/* <button className="deleteTask" onClick={props.hideTask}>Delete</button> */}
            {/* <RemoveTask /> */}
            <label htmlFor='delete' name='taskStatus' className='deleteButton'>Delete</label>
            <input htmlFor='delete' value='delete' type="radio" name='taskStatus' className='deleteButton' onClick={() => props.deleteTask(props.monthlyDoIndex)} />
        </form>
    )
}

export default TaskObjects;