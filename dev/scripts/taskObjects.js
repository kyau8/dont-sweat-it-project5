import React from 'react';

// Create a list of task objects - these are the tasks the users can push into their daily, weekly, or monthly arrays
class TaskObjects extends React.Component {
    constructor() {
        super();
        this.state = {
            userTasks: {
                lockCar: {
                    task: 'Locked the car',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                lockHouse: {
                    task: 'Locked the front door',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                closeGarage: {
                    task: 'Closed the garage door',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                bringKeys: {
                    task: 'Brought my keys',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                bringPhone: {
                    task: 'Brought my phone',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                bringwallet: {
                    task: 'Brought my wallet',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                bringUmbrella: {
                    task: 'Brought my umbrella',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                bringTransitPass: {
                    task: 'Brought my transit pass',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                lightsOff: {
                    task: 'Turned the lights off',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                chargePhone: {
                    task: 'Charged my phone',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                defrostingMeat: {
                    task: 'Put the meat out to defrost',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                wateringPlants: {
                    task: 'Watered the plants',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                takeMedicine: {
                    task: 'Took your medicine',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                feedPet: {
                    task: 'Fed my pet',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                cleanBathroom: {
                    task: 'Cleaned the bathroom',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                shovelSnow: {
                    task: 'Shoveled the snow',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                getMail: {
                    task: 'Got the mail',
                    // dateCreated:
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                respondTexts: {
                    task: 'Responded to a text',
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                loadTransitPass: {
                    task: 'Loaded your transit pass',
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                groceryShopped: {
                    task: 'Went grocery shopping',
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                didLaundry: {
                    task: 'Did your laundry',
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                putOutGarbage: {
                    task: 'Took the garbage out',
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                respondTexts: {
                    task: 'Responded to a text',
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                libraryReturn: {
                    task: 'Returned library books',
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                getGas: {
                    task: 'Got gas',
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                payCreditCard: {
                    task: 'Paid credit card bills',
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                payUtilityBills: {
                    task: 'Paid utility bills',
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                payRent: {
                    task: 'Paid rent',
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                healthcareAppt: {
                    task: "Visited the doctor's",
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                gymAppt: {
                    task: 'Went to the gym',
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                },
                therapistAppt: {
                    task: "Visited the therapist",
                    taskStatus: [
                        'Default',
                        'Completed',
                        'Nope',
                        "Can't remember"
                    ]
                }
            }
        }
    }
    // write a method that allows users to add their own task inside of a form element
    // Push the object into the tasks object
    render() {
        return (
            console.log('Still confused.')
        )
    }
}

export default TaskObjects;