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
        this.notCompleteTask = this.notCompleteTask.bind(this);
        this.forgottenTask = this.forgottenTask.bind(this);
        this.updateDB = this.updateDB.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.renderTask = this.renderTask.bind(this);
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
                    // display: taskList[tasks].display,
                    task: taskList[tasks].task,
                    taskCategory: taskList[tasks].taskCategory,
                    taskStatus: taskList[tasks].taskStatus,
                    iconType: taskList[tasks].iconType
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
            console.log(newDailyTasks);
        });
    }
    // Write a method to change the taskStatus to complete if the complete button is selected
    updateDB(task, newStatus) {
        const completedTaskKey = task.key;
        // Updated the task status property in that selected object
        task.taskStatus = newStatus;
        // Update that specific object in firebase
        const dbRefComplete = firebase.database().ref(`userTasks/${completedTaskKey}/`);
        dbRefComplete.update(task);
    }
    getClassName(task) {
        switch(task.taskStatus) {
            case 'completed':
                return 'completedClass';
            case 'not completed':
                return 'notCompleteClass';
            case 'forgotten':
                return 'forgottenClass';
            default:
                return 'default';
        }
    }
    completeTask(task) {
        this.updateDB(task, 'completed');
    }
    notCompleteTask(task) {
        this.updateDB(task, 'not completed');
    }
    forgottenTask(task) {
        this.updateDB(task, 'forgotten');
    }
    // Write a method to delete the tasks if the delete button is selected
    deleteTask(task) {
        const deleteItem = task.key;
        const deleteRef = firebase.database().ref(`userTasks/${deleteItem}`);
        deleteRef.remove();
    }
    // write a method to restore the task status to default when you click the button
    refreshList(taskArray) {
        for (let tasks of taskArray){
            this.updateDB(tasks, 'default');
        }
    }
    renderTask(task) {
        return <li key={task.key} id={task.key} className={this.getClassName(task)}>
            <i className={task.iconType}></i>{task.task}
            <TaskCompletion completeTask={this.completeTask} notCompleteTask={this.notCompleteTask} forgottenTask={this.forgottenTask} deleteTask={this.deleteTask} task={task} />
        </li>
    }
    // Print the tasks onto the page
    render() {
        console.log('render')
        return (
            <section className="taskLists">
                <div>
                    <button onClick={() => this.refreshList(this.state.dailyUserTasks)}>New Day</button>
                    <ul>Daily Tasks
                        {this.state.dailyUserTasks.map((task) => {
                            return this.renderTask(task)
                            // return <li key={dailyDo.key} id={dailyDo.key} className={this.getClassName(dailyDo)}>
                            // <i className={dailyDo.iconType}></i>{dailyDo.task}
                            //     <TaskCompletion completeTask={this.completeTask} notCompleteTask={this.notCompleteTask} forgottenTask={this.forgottenTask} deleteTask={this.deleteTask} task={dailyDo} />
                            // </li>
                        })}
                    </ul>
                </div>
                <div>
                    <button onClick={() => this.refreshList(this.state.weeklyUserTasks)}>New Week</button>
                    <ul>Weekly Tasks
                        {this.state.weeklyUserTasks.map((task) => {
                            return this.renderTask(task);
                        })}
                    </ul>
                </div>
                <div>
                    <button onClick={() => this.refreshList(this.state.monthlyUserTasks)}>New Month</button>
                    <ul>Monthly Tasks
                        {this.state.monthlyUserTasks.map((task) => {
                            return this.renderTask(task);
                        })}
                    </ul>
                </div>
            </section>
        )
    }
}

const TaskCompletion = (props) => {
    return (
        <form action="">
            <label htmlFor='complete' name='taskStatus'>&#10004;</label>
            <input htmlFor='complete' value='complete' type="radio" name='taskStatus' onClick={() => props.completeTask(props.task)} />
            <label htmlFor='notComplete' name='taskStatus'>&#10005;</label>
            <input htmlFor='notComplete' value='notComplete' type="radio" name='taskStatus' onClick={() => props.notCompleteTask(props.task)} />
            <label htmlFor='forgot' name='taskStatus'>???</label>
            <input htmlFor='forgot' value='forgot' type="radio" name='taskStatus' onClick={() => props.forgottenTask(props.task)} />
            <label htmlFor='delete' name='taskStatus' className='deleteButton'>Delete</label>
            <input htmlFor='delete' value='delete' type="radio" name='taskStatus' className='deleteButton' onClick={() => props.deleteTask(props.task)} />
        </form>
    )
}


export default TaskObjects;