module.exports.main = print_main;

var login = `
  <div>
    <div class="top">
      <div class="title">로그인</div>
      <p>방문 일정 등록을 위해 로그인 해주세요</p>
    </div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">
        <div class="div4">
        </div>
        <div class="div1">
          <body>아이디</body>
          <div class="textbox">
            <label for="idea">이메일 형식으로 입력</label>
            <input type="text" id="idea">
          </div>
        </div>
        
        <div class="div2">
        <body>비밀번호</body>
          <div class="textbox">
            <label for="password">비밀번호</label>
            <input type="password" id="password">
          </div>
        </div> 
        <div class="div3">
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="bottom">
      <div class="btn_box">
        <div class="btn_left" style="text-align:center">로그인</div>
        <div class="btn_right" style="text-align:center">회원가입</div>
      </div>
    </div>
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
