import React from 'react';

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
            <div className="taskItems">
                <i className={task.iconType} ></i><p>{task.task}</p>
            </div>
            <TaskCompletion completeTask={this.completeTask} notCompleteTask={this.notCompleteTask} forgottenTask={this.forgottenTask} deleteTask={this.deleteTask} task={task} />
        </li>
    }
    // Print the tasks onto the page
    render() {
        console.log('render')
        return (
            <div className="wrapper">
                <section className="taskLists">
                    <div className="dailyList list">
                        <h2>Daily Tasks</h2>
                        <button className="newListButton" onClick={() => this.refreshList(this.state.dailyUserTasks)}>'It's a <span>new</span> day'</button>
                        <ul>
                            {this.state.dailyUserTasks.map((task) => {
                                return this.renderTask(task)
                            })}
                        </ul>
                    </div>
                    <div className="weeklyList list">
                        <h2>Weekly Tasks</h2>
                        <button className="newListButton" onClick={() => this.refreshList(this.state.weeklyUserTasks)}>'It's a new week'</button>
                        <ul>
                            {this.state.weeklyUserTasks.map((task) => {
                                return this.renderTask(task);
                            })}
                        </ul>
                    </div>
                    <div className="monthlyList list">
                        <h2>Monthly Tasks</h2>
                        <button className="newListButton" onClick={() => this.refreshList(this.state.monthlyUserTasks)}>'It's a new month'</button>
                        <ul>
                            {this.state.monthlyUserTasks.map((task) => {
                                return this.renderTask(task);
                            })}
                        </ul>
                    </div>
                </section>
            </div>
        )
    }
}

const TaskCompletion = (props) => {
    return (
        <form className="taskStatusForm" action="">
            <div>
                <label htmlFor={`complete-${props.task.key}`} name='taskStatus'><i className="fa fa-star"></i></label>
                <input htmlFor='complete' id={`complete-${props.task.key}`} value='complete' type="radio" name='taskStatus' onClick={() => props.completeTask(props.task)} />
            </div>
            <div>
                <label htmlFor={`notComplete-${props.task.key}`} name='taskStatus'><i className="fa fa-star-o"></i></label>
                <input htmlFor='notComplete' value='notComplete' id={`notComplete-${props.task.key}`} type="radio" name='taskStatus' onClick={() => props.notCompleteTask(props.task)} />
            </div>
            <div>
                <label htmlFor={`forgot-${props.task.key}`} name='taskStatus'><i className="fa fa-star-half-full"></i></label>
                <input htmlFor='forgot' value='forgot' id={`forgot-${props.task.key}`} type="radio" name='taskStatus' onClick={() => props.forgottenTask(props.task)} />
            </div>
            <div>
                <label htmlFor={`delete-${props.task.key}`} name='taskStatus' className='deleteButton'><i className="fa fa-times-circle-o"></i></label>
                <input htmlFor='delete' id={`delete-${props.task.key}`} value='delete' type="radio" name='taskStatus' className='deleteButton' onClick={() => props.deleteTask(props.task)} />
            </div>
        </form>
    )
}


export default TaskObjects;