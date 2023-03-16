const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");
const todosListElement = document.getElementById("todos-list");
const notificationEl = document.querySelector('.notification');

//vars
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let editTodoId = -1;

//1st render todos
renderTodos();

//from submit
form.addEventListener('submit', function(event){
    event.preventDefault();
    
    saveTodo();
    renderTodos();
    localStorage.setItem('todos', JSON.stringify(todos))

});

//save todo
function saveTodo(){
    const todoValue = todoInput.value
    //check if the todo is empty
    const isEmpty = todoValue === '';
    //check for duplicate todos
    const isDuplicate =
    todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase());
    if (isEmpty){
        showNotification("Todo input is empty");
    }
    else if(isDuplicate){
        showNotification('Todo already exists')
    }
    else{
        if(editTodoId >= 0){
            todos = todos.map((todo, index) => ({
                ...todo,
                value: index === editTodoId ? todoValue : todo.value,
              }));
              editTodoId = -1;
        }
        else{
            todos.push({
                value : todoValue,
                checked : false
        });
        }
        todoInput.value = '';
    }  
}
//render todos
function renderTodos(){
    if (todos.length === 0) {
        todosListElement.innerHTML = '<center>Nothing to do!</center>';
        return;
    }
    //clear element before a re-render
    todosListElement.innerHTML = "";
    //render todos
    todos.forEach((todo, index) =>{
        todosListElement.innerHTML += `
        <div class="todo" id =${index}>
            <i class= "bi ${todo.checked ? 'bi-check-circle' : 'bi-circle'} "data-action = "check"></i>
            <p class="${todo.checked ? 'checked' : ''}" data-action = "check">${todo.value}</p>
            <i class="bi bi-pencil-square" data-action = "edit"></i>
            <i class="bi bi-trash" data-action = "delete"></i>
        </div>
        `
    });
}

//click event listner for all the todos
todosListElement.addEventListener('click', (event) => {
    const target = event.target;
    const parentElement = target.parentNode;
  
    if (parentElement.className !== 'todo') return;
    //todo id
    const todo = parentElement;
    const todoId = Number(todo.id);
    //target action
    const action = target.dataset.action;
    action === 'check' && checkTodo(todoId);
    action === 'edit' && editTodo(todoId);
    action === 'delete' && deleteTodo(todoId);
    console.log(todoId, action);

});
//check a todo
function checkTodo(todoId){
    todos = todos.map((todo, index) => ({  
    ...todo,     
    checked: index === todoId ? !todo.checked : todo.checked,
    }));
    renderTodos();
    localStorage.setItem('todos', JSON.stringify(todos))

}
//edit todo
function editTodo(todoId){
    todoInput.value = todos[todoId].value;
    editTodoId = todoId;
}
//delete todo
function deleteTodo(todoId){
    todos = todos.filter((todo, index) => index !== todoId);
    editTodoId = -1;
    //re-render
    renderTodos();
}

// SHOW A NOTIFICATION
function showNotification(message) {
    // change the message
    notificationEl.innerHTML = message;
  
    // notification enter
    notificationEl.classList.add('notif-enter');
  
    // notification leave
    setTimeout(() => {
      notificationEl.classList.remove('notif-enter');
    }, 2000);
  }