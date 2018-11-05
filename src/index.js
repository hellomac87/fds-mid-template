import "@babel/polyfill";
import axios from 'axios';
let token; // 서버로부터 응답받은 토큰 저장 변수

// 로그인 요청 보내기 :: 서버로부터 토큰 받기
document.querySelector('.login-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // 기본 form 태그의 submit 이벤트를 막아준다.

  const username = e.target.elements.username.value;
  const password = e.target.elements.password.value;

  // post 요청 보내기 :: async await 사용
  const res = await axios.post('https://grave-staircase.glitch.me/users/login',{
    // body 정보
    username,
    password
  });

  token = res.data.token; // 토큰 저장하기
  console.log(token); // 확인용
  document.body.classList.add('login-after'); // body 태그에 class 추가하기 :: 로그인폼 hidden, list tag show, todo-input form show

  // todo-list 를 그리는 함수를 호출한다.
  await drawTodoList();
});


// drawTodoList function
const drawTodoList = async () => {

  const res = await axios.get('https://grave-staircase.glitch.me/todos',{
    headers: {"Authorization" : "Bearer " + token},
  });

  const todos = res.data;
  document.querySelector('.todo-list').innerHTML = '';

  todos.forEach(todo => {
    // create list element
    const listItemElem = document.createElement('li');
    listItemElem.textContent = todo.body;

    // create delete btn element
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';

    // append delete button element in listItemElem
    listItemElem.appendChild(deleteButton);

    // append list element
    const listElem = document.querySelector('.todo-list');
    listElem.appendChild(listItemElem);
  });

  console.log(todos); // data check
}

document.querySelector('.todo-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const body = e.target.elements.todoInput.value;

  const res = await axios.post('https://grave-staircase.glitch.me/todos',{
    body,
    complete: false
  },{
    headers: { "Authorization": "Bearer " + token },
  });

  console.log(res.data);
  drawTodoList();
})
