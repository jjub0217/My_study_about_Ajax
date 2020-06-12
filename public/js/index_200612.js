// const promise = new Promise();
// 프로미스는 반드시 기본 함수를 넣어야 한다.

// const promise = new Promise(() => {});
// 아무것도 안하는 프로미스 객체이다. 

// 아래처럼 매개변수에 두개의 인수를 전달받는다. 
// const promise = new Promise((resolve, reject) => {});


// const get = (url, successCallback, failCallback) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', url);
//     xhr.send();

//     xhr.onload = () => {
//         if (xhr.status === 200 || xhr.status === 201) {
//             successCallback(xhr.response);
//         }else{
//             failCallback();
//         }
//     };
// };

// get ('https://jsonplaceholder.typicode.com/todos', console.log, console.error);


// 위 코드를 프로미스로 만들어보자

let todos = [];

const get = () => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        
        xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 201) {
            resolve(JSON.parse(xhr.response));
            } else {
            reject(xhr.status)
            }
        };
    })
};


get('https://jsonplaceholder.typicode.com/todos')
// .then(_todos => return todos = _todos);
// 바로 위 코드와 바로 아래 코드는 같은 뜻이다.
// then 은 프로미스. 프로토타입에 있는 메소드다. 
// .then(_todos => todos = _todos);
// 겟 메소드는 후속처리 메소드인데 이걸 왜 쓰는지 알아야 한다. 
.then(_todos => todos = _todos)
.then(console.log ) // <- 어떠한 인수가 넘어오든지 얘는 다 출력해라 라는 뜻이다.
.catch(err => console.error(err))
// 캐치는 무조건 하나여야 한다.

.finally(() => {});
// 파이널리는 자바에서 온 문법이다.
// 파이널리는 한번만 호출한다.
// 파이널리도 반드시 하나여야 한다.

// setTimeout(() => throws new Error('Error'), 0);
function foo () {
setTimeout(() => throws new Error('Error'), 0);
}
// 콜리에서 콜러 방향으로 전파가 된다.

function bar () {
    foo();
}
bar();