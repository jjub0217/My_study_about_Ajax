import {ajax} from './xhr.js';


// DOMs
const $todos = document.querySelector('.todos');
const $nav = document.querySelector('.nav');
const $inputTodo = document.querySelector('.input-todo');
const $removeTodo = document.querySelector('.remove-todo');

const $completeAll = document.querySelector('.complete-all');

const $clearCompleted = document.querySelector('.clear-completed');
const $btn = document.querySelector('.btn');
const $completedTodos = $clearCompleted.querySelector('.completed-todos');
const $activeTodos = $clearCompleted.querySelector('.active-todos');
// State
let todos = [];
let navState = $nav.querySelector('.active').id;

// test Todos
const getTodos = () => {
    ajax.get('/todos')
    .then(_todos => todos = _todos)
        .then(render)
        .catch(err => console.Error('err'))
    }
    
//   todos = [
//     { id: 1, content: 'HTML', completed: false },
//     { id: 2, content: 'CSS', completed: false },
//     { id: 3, content: 'Javascript', completed: false },
//   ];
//   todos = todos.sort((todo1, todo2) => todo2.id - todo1.id);

//   render();
// };

// Event Function
const getTodoId = () =>
  todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

const addTodo = (content) => {
    ajax.post('/todos', {id: gernerateID(), content, completed: false }, _todos =>{
todos = _todos;
render();
    })
};
const toggleTodo = (id) => {
  todos = todos.map((todo) =>
    todo.id === +id ? { ...todo, completed: !todo.completed } : { ...todo }
  );
};

const delTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== +id);
  console.log(todos);
};

const toggleAllTodo = (checked) => {
  todos = todos.map((todo) => ({ ...todo, completed: checked }));
};

const completedDelTodos = () => {
  todos = todos.filter((todo) => !todo.completed);
  console.log(todos);
};

// render
const render = () => {
  let html = '';
  // let $changeTodos = todos.filter(({ completed }) =>
  //   navState === 'complete'
  //     ? completed
  //     : navState === 'active'
  //     ? !completed
  //     : true
  // );

  if (navState === 'all') {
    $changeTodos = todos;
  } else if (navState === 'active') {
    $changeTodos = todos.filter((todo) => !todo.completed);
  } else if (navState === 'completed') {
    $changeTodos = todos.filter((todo) => todo.completed);
  }

  $changeTodos.map(({ id, content, completed }) => {
    html += `
      <li id="${id}" class="todo-item">
        <input id="ck-${id}" class="checkbox" type="checkbox" ${
      completed ? 'checked' : ''
    }>
        <label for="ck-${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>
      `;
  });

  $completedTodos.textContent = todos.filter(
    (todo) => todo.completed !== false
  ).length;
  $activeTodos.textContent = todos.filter(
    (todo) => todo.completed === false
  ).length;

  $todos.innerHTML = html;
};

// Event
const changeavState = (id) => {
  [...$nav.children].forEach(($navItem) => {
    $navItem.classList.toggle('active', $navItem.id === id);
  });
  navState = id;
};
$nav.onclick = ({ target }) => {
  // if (!target.matches('.nav li')) return;
  // let $active = $nav.querySelector('.active');
  // if ($active === target) return;
  // $active.classList.remove('active');
  // target.classList.add('active');
  // render();
  if (!target.matches('.nav > li:not(.active)')) return;
  changeavState(target.id);
  render();
};

$inputTodo.onkeypress = (e) => {
  if (e.keyCode !== 13) return;
  addTodo(e.target.value);
  e.target.value = '';
  render();
};

$todos.onchange = (e) => {
  toggleTodo(e.target.parentNode.id);
  render();
};

$todos.onclick = (e) => {
  if (!e.target.matches('i')) return;
  delTodo(e.target.parentNode.id);
  render();
};

$completeAll.onchange = (e) => {
  toggleAllTodo(e.target.checked);
  render();
};

$btn.onclick = (e) => {
  completedDelTodos();
  render();
};

// start
window.onload = getTodos;
