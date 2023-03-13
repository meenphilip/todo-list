const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

// get from LS
const todos = JSON.parse(localStorage.getItem('todos'));

// display in UI
if (todos) {
  todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', e => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEL = document.createElement('li');
    if (todo && todo.completed) {
      todoEL.classList.add('completed');
    }

    todoEL.innerText = todoText;

    // mark completed
    todoEL.addEventListener('click', () => {
      todoEL.classList.toggle('completed');

      // to mark it complete in LS
      updateLS();
    });

    //delete with right click
    todoEL.addEventListener('contextmenu', e => {
      e.preventDefault();

      todoEL.remove();

      // to delete in LS
      updateLS();
    });

    todosUL.append(todoEL);

    // clear input
    input.value = '';

    // update LS
    updateLS();
  }
}

function updateLS() {
  const todosEL = document.querySelectorAll('li');

  const todos = [];

  todosEL.forEach(todoEL => {
    todos.push({
      text: todoEL.innerText,
      completed: todoEL.classList.contains('completed'),
    });
  });

  // set in LS
  localStorage.setItem('todos', JSON.stringify(todos));
}
