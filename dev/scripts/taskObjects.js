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
        this.completeTask = this.completeTask.bind(this);
        this.updateDB = this.updateDB.bind(this);
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
    updateDB(task) {
        // Copied the daily user task array
        // Copied the key for the selected element
        const completedTaskKey = task.key;
        // Updated the task status property in that selected object
        task.taskStatus = 'completed';
        // Update that specific object in firebase
        const dbRefComplete = firebase.database().ref(`userTasks/${completedTaskKey}/`);
        dbRefComplete.update(task);
    }
    getClassName(task) {
        if (task.taskStatus === 'completed') {
            return 'completedClass';
        }
            else {
                return 'neutral'
            }
    }
    completeTask(task) {
        this.updateDB(task);
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
        console.log('render')
        return (
            <section className="taskLists">
                <ul>Daily Tasks
                    {this.state.dailyUserTasks.map((dailyDo,i) => {
                        return <li key={dailyDo.key} id={dailyDo.key} className={this.getClassName(dailyDo)}>
                        {dailyDo.task}
                            <DailyTaskCompletion completeTask={this.completeTask} deleteDailyTask={this.deleteDailyTask} task={dailyDo} />
                        </li>
                    })}
                </ul>
                <ul>Weekly Tasks
                    {this.state.weeklyUserTasks.map((weeklyDo,i) => {
                        return <li key={weeklyDo.key} className={this.getClassName(weeklyDo)}>{weeklyDo.task} 
                            <WeeklyTaskCompletion completeTask={this.completeTask} deleteWeeklyTask={this.deleteWeeklyTask} task={weeklyDo} />
                        </li>
                    })}
                </ul>
                <ul>Monthly Tasks
                    {this.state.monthlyUserTasks.map((monthlyDo,i) => {
                        return <li key={monthlyDo.key} className={this.getClassName(monthlyDo)}>{monthlyDo.task}
                            <MonthlyTaskCompletion completeTask={this.completeTask} deleteMonthlyTask={this.deleteMonthlyTask} task={monthlyDo} />
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
            <input htmlFor='complete' value='complete' type="radio" name='taskStatus' onClick={() => props.completeTask(props.task)} />
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
            <input htmlFor='complete' value='complete' type="radio" name='taskStatus' onClick={() => props.completeTask(props.task)} />
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
            <input htmlFor='complete' value='complete' type="radio" name='taskStatus' onClick={() => props.completeTask(props.task)} />
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