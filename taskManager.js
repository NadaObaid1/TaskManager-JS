const fs = require('fs');
const taskFilePath = 'myTasks.json'; 

function loadMyTasks() {
    if (fs.existsSync(taskFilePath)) {
        const data = fs.readFileSync(taskFilePath, 'utf8');
        return JSON.parse(data);
    }
    return [];
}
function saveMyTasks(myTasks) {
    fs.writeFileSync(taskFilePath, JSON.stringify(myTasks, null, 2), 'utf8');
}

// addMyTask
function addMyTask(taskDescription) {
    const myTasks = loadMyTasks();
    const newTask = {
        id: myTasks.length + 1,
        description: taskDescription,
        completed: false,
    };
    myTasks.push(newTask);
    saveMyTasks(myTasks);
    console.log('Task added:', newTask);
}

// viewMyTasks
function viewMyTasks() {
    const myTasks = loadMyTasks();
    if (myTasks.length === 0) {
        console.log('No tasks found.');
    } else {
        myTasks.forEach(task => {
            console.log(`ID: ${task.id} | Description: ${task.description} | Completed: ${task.completed ? 'Yes' : 'No'}`);
        });
    }
}

// toggleMyTaskCompletion
function toggleMyTaskCompletion(taskId) {
    const myTasks = loadMyTasks();
    const task = myTasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveMyTasks(myTasks);
        console.log(`Task ${taskId} completion toggled to ${task.completed ? 'completed' : 'not completed'}`);
    } else {
        console.log('Task not found');
    }
}

// removeMyTask
function removeMyTask(taskId) {
    let myTasks = loadMyTasks();
    myTasks = myTasks.filter(task => task.id !== taskId);
    saveMyTasks(myTasks);
    console.log(`Task ${taskId} removed`);
}

// editMyTask
function editMyTask(taskId, newTaskDescription) {
    const myTasks = loadMyTasks();
    const task = myTasks.find(task => task.id === taskId);
    if (task) {
        task.description = newTaskDescription;
        saveMyTasks(myTasks);
        console.log(`Task ${taskId} description updated to "${newTaskDescription}"`);
    } else {
        console.log('Task not found');
    }
}

// searchMyTasks
function searchMyTasks(query) {
    const myTasks = loadMyTasks();
    const results = myTasks.filter(task => task.description.toLowerCase().includes(query.toLowerCase()));
    if (results.length > 0) {
        results.forEach(task => {
            console.log(`ID: ${task.id} | Description: ${task.description} | Completed: ${task.completed ? 'Yes' : 'No'}`);
        });
    } else {
        console.log('No tasks match your search.');
    }
}

const commandInput = process.argv[2]; 
const firstArgument = process.argv[3];  
const secondArgument = process.argv[4];

switch (commandInput) {
    case 'add':
        addMyTask(firstArgument);
        break;
    case 'view':
        viewMyTasks();
        break;
    case 'toggle':
        toggleMyTaskCompletion(parseInt(firstArgument));
        break;
    case 'remove':
        removeMyTask(parseInt(firstArgument));
        break;
    case 'edit':
        editMyTask(parseInt(firstArgument), secondArgument);
        break;
    case 'search':
        searchMyTasks(firstArgument);
        break;
    default:
        console.log('Unknown command. Use: add, view, toggle, remove, edit, search'); 
}
