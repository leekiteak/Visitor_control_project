module.exports.main = print_main;

var login = `
  <div>
    <div class="top">
      <div class="title">방문자 등록 서비스</div>
    </div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">
        <div class="div4">LOGIN</div>
        <div class="div1">
          <body>아이디</body>
          <div class="textbox">
            <input type="text" id="idea" style="border: 1px solid #d8d8d8" value="이메일 형식으로 입력" onfocus="this.value=''">
          </div>
        </div>
        
        <div class="div2">
        <body>비밀번호</body>
          <div class="textbox">
            <input type="password" id="password" style="border: 1px solid #d8d8d8" value="비밀번호" onfocus="this.value=''">
          </div>
        </div> 
        <div class="div3">
          <div class="btn_box">
            <button class="btn_left" style="text-align:center">로그인</button>
            <button class="btn_right" style="text-align:center">회원가입</button>
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="bottom"></div>
  </div>
`;

function print_main() {
  return `
      ${login}
      <!--<main id="right_body" class="main main_body">-->
      <!--</main>-->
      <!-- 푸터 영역 -->
    `;
}
