class TaskManager {
    constructor() {
        this.tasks = [];
    }

    getWantedMethod() {
        const numberOfMethod = prompt('Choose an option from the menu:');
        return numberOfMethod;
    }

    addTask() {
        const description = prompt('Enter a description for the new task:');
        const id = this.tasks.length === 0 ? 1 : this.tasks[this.tasks.length - 1].id + 1;
        const task = { id, description, completed: false };
        this.tasks.push(task);
        console.log(`🎉 Task "${description}" has been successfully added ✅`);
    }

    displayTasks() {
        if (this.tasks.length === 0) {
            console.log('❌ No tasks found!!!');
        } else {
            console.log('📋 Task List:');
            this.tasks.forEach((task) => {
                console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.completed ? '✅ Completed' : '❌ Not completed'}`);
            });
        }
    }

    toggleTask() {
        const id = Number(prompt('Enter the task ID to toggle its status:'));
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            console.log(`🔄 Task ${id} status has been changed to ${task.completed ? 'Completed ✅' : 'Not completed ❌'}.`);
        } else {
            console.log(`⚠️ Task with ID ${id} not found!!!`);
        }
    }

    updateTask() {
        const id = Number(prompt('Enter the task ID to update its description:'));
        const newDescription = prompt('Enter the new description:');
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.description = newDescription;
            console.log(`✏️ Task ${id} has been successfully updated. New description: "${newDescription}"`);
        } else {
            console.log(`⚠️ Task with ID ${id} not found!!!`);
        }
    }

    removeTask() {
        const id = Number(prompt('Enter the task ID to remove:'));
        const index = this.tasks.findIndex(task => task.id === id);
        if (index > -1) {
            this.tasks.splice(index, 1);
            console.log(`🗑️ Task ${id} has been removed successfully.`);
        } else {
            console.log(`⚠️ Task with ID ${id} not found!!!`);
        }
    }

    searchTasks() {
        const description = prompt('Enter a description to search for tasks:');
        const foundTasks = this.tasks.filter(task => task.description.toLowerCase().includes(description.toLowerCase()));
        if (foundTasks.length > 0) {
            console.log(`🔍 Tasks containing "${description}":`);
            foundTasks.forEach(task => {
                console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.completed ? '✅ Completed' : '❌ Not completed'}`);
            });
        } else {
            console.log(`🚫 No tasks found containing "${description}"`);
        }
    }

    exit() {
        console.log('👋 Goodbye! See you next time.');
    }
}

console.log(`💼 Task Management Menu:
    [1] ➕ Add Task
    [2] 📋 Display Tasks
    [3] 🔄 Toggle Task Status
    [4] ✏️ Update Task Description
    [5] 🗑️ Remove Task
    [6] 🔍 Search Tasks
    [7] 🚪 Exit`); 

const taskManagerObject = new TaskManager();

function handleInput() {
    const choice = Number(taskManagerObject.getWantedMethod());
    if (choice >= 1 && choice <= 7) {
        switch (choice) {
            case 1:
                taskManagerObject.addTask();
                handleInput();
                break;
            case 2:
                taskManagerObject.displayTasks();
                handleInput();
                break;
            case 3:
                taskManagerObject.toggleTask();
                handleInput();
                break;
            case 4:
                taskManagerObject.updateTask();
                handleInput();
                break;
            case 5:
                taskManagerObject.removeTask();
                handleInput();
                break;
            case 6:
                taskManagerObject.searchTasks();
                handleInput();
                break;
            case 7:
                taskManagerObject.exit();
                break;
            default:
                console.log('🚫 Invalid choice!');
                handleInput();
        }
    } else {
        console.log('🚫 Invalid choice!');
        handleInput();
    }
}

handleInput();
