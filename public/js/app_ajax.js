
// State
let todos = [];
// DOM Nodes
const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');

// Function
const render = () => {
  let html = '';
  todos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item">
      <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <i class="remove-todo far fa-times-circle"></i>
  </li>`;``
  });
  console.log(todos);
  $todos.innerHTML = html;
};
const getNextId = () => Math.max(0, ...todos.map(({ id }) => id)) + 1;
// Ajax
const get = () => {
  const xhr = new XMLHttpRequest();
  // 1. 요청 생성
  xhr.open('GET', '/todos');
  // 2. 요청 send
  xhr.send();
    // ------------------------ //
  xhr.onload = () => {
    // 3. 서버가 응답했을때 (언제인지는 모름)
    if (xhr.status === 200 || xhr.status === 201) {
      // 3.1. 서버가 제대로 todos를 반환했다.
      todos = JSON.parse(xhr.response);
      // 2. ul 밑에 li로서 render한다.
      render();
    } else {
      // 3.2. 서버가 오류를 반환했다.
      console.error(xhr.status);
    }
  };
};
const post = payload => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/todos');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(payload));
  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
      todos = [JSON.parse(xhr.response), ...todos];
      render();
    } else {
      console.error(xhr.status);
    }
  };
};
const remove = id => {
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', `/todos/${id}`);
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
      todos = todos.filter(todo => todo.id !== id);
      render();
    } else {
      console.error(xhr.status);
    }
  };
};
const patch = (id, completed) => {
  const xhr = new XMLHttpRequest();
  xhr.open('PATCH', `/todos/${id}`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ completed }));
  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
      const newTodo = JSON.parse(xhr.response);
      todos = todos.map(todo => todo.id === id ? newTodo : todo);
      render();
    } else {
      console.error(xhr.status);
    }
  }
};
// Event Handler
window.onload = () => {
  // 1. 서버로부터 todos를 가져온다.
  get();
};

$inputTodo.onkeyup = ({target, keyCode}) => {
    const content = target.value.trim();
if(!content || keyCode !== 13) return;
const newTodo = { id: getNextId(), content, completed: false};
post(newTodo);
};


$todos.onclick = ({ target }) => {
  if (!target.matches('.remove-todo')) return;
  const targetId = +target.parentNode.id;
  remove(targetId);
};

$todos.onchange = ({ target }) => {
  const completed = target.checked;
  const targetId = +target.parentNode.id;
  patch(targetId, completed);
};