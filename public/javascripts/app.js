//Define variables
const form = document.querySelector('#addBtn');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
  //DOM Loaded
  document.addEventListener('DOMContentLoaded' ,getTasks);
  //Add task Event
  form.addEventListener('click' ,addTask);
  //Remove task event
  taskList.addEventListener('click' , removeTask);
  //Remove task event
  clearBtn.addEventListener('click' , clearTask);
  //Filter task event
  filter.addEventListener('keyup' , filterTasks);
}

//Get tasks from local storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    //Create li element
    const li = document.createElement('li');
    //Give li item a class name
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement('a');
    //Give li item a class name
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
  });

}

//Load all event listeners
function addTask(e){
  if(taskInput.value === ''){
    showToast('Tasks cannot be empty!', 3000);
  }else{

    //Create li element
    const li = document.createElement('li');
    //Give li item a class name
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //Give li item a class name
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);


    //Append li to ul
    taskList.appendChild(li);
    //Clear Task input

    //Store task in local storage
    storeTaskIntoLocalStorage(taskInput.value);

    showToast(`You've added ${taskInput.value}`, 3000);
    
    taskInput.value = '';

    e.preventDefault();
  }
}

function showToast(message, duration) {
  Materialize.toast(message, duration, 'rounded');
}

//Store task
function storeTaskIntoLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Remove tasks
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();
    //Remove from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
        showToast(`You've removed ${taskItem.textContent}`, 3000);
      } 
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear tasks
function clearTask(){
  // TaskList.innerHTML = '';

  //Faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  //Clear from local storage
  clearTasksFromLocalStorage();

  
  showToast(`All the tasks are cleared &#128540;`, 3000);

}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
          task.style.display = 'block';
      }else{
          task.style.display = 'none';
      }
    }
  );
}