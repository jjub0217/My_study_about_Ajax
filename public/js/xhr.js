// export const ajax = (() => {
//     const req = (method, url, payload, callback) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open('method', url);
//         xhr.setRequestHeader('Content-type', 'application/json');
//         xhr.send(JSON.stringify(payload));

//         xhr.onload = () => {
//             if (xhr.status === 200 || xhr.status === 201) {
//                 callback(JSON.parse(xhr.response)); // 후속처리
//             }else{
//                 console.error(xhr.status);
//     }
//  };
// };

// return {
//     get(url, callback) {
//         req('GET', url, callback);
//     },
//     post(url, payload, callback) {
//         req('POST', url, callback, payload);
//     },
//     patch(url, payload, callback) {
//         req('PATCH', url, callback);
//     },
//     post(url, callback) {
//         req('GET', url, callback);
//     },
// }

// }
//REST API란?
// 너가 서버한테 부탁할거잖아. 어떤식으로 부탁할거야?
// 명사와 술어가 있을거잖아. 술어가 뭐가 있겠니? 고쳐주세요, 지워주세요 등등이 있잖니.
// 그것을 정해줄게. 
// GET / POST / PATCH / DELETE ... 
// ex) GET / todos / 1 
//     메소드 / url(여기에 명사로만 주자) / 1번 데이터  : "투두스의 1번 데이터를 주세요." 
// 네이밍을 어케 하는지가 중요하다. 
// 서로 이렇게 REST API를 설계해서 프론트와 백이 통신을 했으면 좋겠다.

export const ajax = (() => {
    const req = (method, url, callback, payload) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('method', url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(payload));

        xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 201) {
                resolve(JSON.parse(xhr.response)); // 후속처리
            } else {
            reject.error(xhr.status);
            }
        }; 
     
    return {
        get(url) {
        return req('GET', url);
        },
        post(url, payload) {
            req('POST', url, payload);
            },
        patch(url, payload) {
            req('PATCH', url, payload);
            },
        remove(url) {
            req('DELETE', url);
            }
        }
    
})
    }
});

window.onload = () => {
    ajax.get('/todos', _todos => {
      todos = _todos;
    });
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
  patch();

   