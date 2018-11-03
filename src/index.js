const axios = require('axios');
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

  await console.log(res.data.token);
  // document.body.classList.add = 'login-after';

  // post 요청 보내기 :: async await 미사용

  // axios.post('https://grave-staircase.glitch.me/users/login', {
  //   // body
  //   username,
  //   password
  // }).then(res => {
  //   console.log(res.data.token);
  //   token = res.data.token;
  //   document.body.classList.add('login-after');
  //   drawTodoList();
  // });

});


