import React from 'react';
// import EditTask from './editTask';


// Create a list of task objects - these are the tasks the users can push into their daily, weekly, or monthly arrays
class TaskObjects extends React.Component {
    constructor() {
        super();
        this.state = {
            // One empty task array of all the tasks, and three empty arrays that will hold the categoried user tasks
            dailyUserTasks: [],
            weeklyUserTasks: [],
            monthlyUserTasks: [],
            taskStatus: ''
        }
        this.completeDailyTask = this.completeDailyTask.bind(this);
        this.deleteDailyTask = this.deleteDailyTask.bind(this);
        this.deleteWeeklyTask = this.deleteWeeklyTask.bind(this);
        this.deleteMonthlyTask = this.deleteMonthlyTask.bind(this);
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
    // Write a method to change the taskStatus to complete if the complete button is selected
    completeDailyTask(index) {
        const dailyCompleteTaskKey = this.state.dailyUserTasks[index].key;
        // const
        // loop through the array and select the required object using your key. Set the state to the new state, and push it to firebase.
        // Make an updated object and replace that object in firebase; .set to override it
        console.log(dailyUserTasks);
        // for (let items in dailyUserTasks){
        // }
        // const newTaskStatus = dailyCompleteTaskKey.taskStatus;

        // const finishTask = this.state.dailyUserTasks[index].key;
        // // const keyValue = removeTask.
        // const markComplete = document.getElementById(finishTask);
        // markComplete.className += 'completeText';
        // console.log(newTaskStatus);
    }
    // Write a method to delete the tasks if the delete button is selected
    deleteDailyTask(index) {
        const dailyDeleteItem = this.state.dailyUserTasks[index].key;
        const dailyDeleteRef = firebase.database().ref(`userTasks/${dailyDeleteItem}`);
        dailyDeleteRef.remove();
        console.log(dailyDeleteItem);
    }
    deleteWeeklyTask(index) {
        const weeklyDeleteItem = this.state.weeklyUserTasks[index].key;
        const weeklyDeleteRef = firebase.database().ref(`userTasks/${weeklyDeleteItem}`);
        weeklyDeleteRef.remove();
    }
    deleteMonthlyTask(index) {
        const monthlyDeleteItem = this.state.monthlyUserTasks[index].key;
        const monthlyDeleteRef = firebase.database().ref(`userTasks/${monthlyDeleteItem}`);
        monthlyDeleteRef.remove();
    }
    // Print the tasks onto the page
    render() {
        return (
            <section>
                <ul>Daily Tasks
                    {this.state.dailyUserTasks.map((dailyDo,i) => {
                        return <li key={dailyDo.key} id={dailyDo.key} >{dailyDo.task}
                            <DailyTaskCompletion completeDailyTask={this.completeDailyTask} deleteDailyTask={this.deleteDailyTask} dailyDoIndex={i} />
                        </li>
                    })}
                </ul>
                <ul>Weekly Tasks
                    {this.state.weeklyUserTasks.map((weeklyDo,i) => {
                        return <li key={weeklyDo.key}>{weeklyDo.task}
                            <WeeklyTaskCompletion deleteWeeklyTask={this.deleteWeeklyTask} weeklyDoIndex={i} />
                        </li>
                    })}
                </ul>
                <ul>Monthly Tasks
                    {this.state.monthlyUserTasks.map((monthlyDo,i) => {
                        return <li key={monthlyDo.key}>{monthlyDo.task}
                            <MonthlyTaskCompletion deleteMonthlyTask={this.deleteMonthlyTask} monthlyDoIndex={i} />
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
            <input htmlFor='complete' value='complete' type="radio" name='taskStatus' onClick={() => props.completeDailyTask(props.dailyDoIndex)} />
            <label htmlFor='notComplete' name='taskStatus'>&#10005;</label>
            <input htmlFor='notComplete' value='notComplete' type="radio" name='taskStatus' />
            <label htmlFor='forgot' name='taskStatus'>???</label>
            <input htmlFor='forgot' value='forgot' type="radio" name='taskStatus' />
            <label htmlFor='delete' name='taskStatus' className='deleteButton'>Delete</label>
            <input htmlFor='delete' value='delete' type="radio" name='taskStatus' className='deleteButton' onClick={() => props.deleteDailyTask(props.dailyDoIndex)} />
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
            <label htmlFor='delete' name='taskStatus' className='deleteButton'>Delete</label>
            <input htmlFor='delete' value='delete' type="radio" name='taskStatus' className='deleteButton' onClick={() => props.deleteWeeklyTask(props.weeklyDoIndex)} />
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
            <label htmlFor='delete' name='taskStatus' className='deleteButton'>Delete</label>
            <input htmlFor='delete' value='delete' type="radio" name='taskStatus' className='deleteButton' onClick={() => props.deleteMonthlyTask(props.monthlyDoIndex)} />
        </form>
    )
}

class EditTask extends React.Component {
    constructor(){
        super();
        this.state = {
            taskStatus:'',
        }
    }
    render() {
        return (
            <h1>Moo</h1>
        )
    }
}


export default TaskObjects;