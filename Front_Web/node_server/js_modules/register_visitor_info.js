module.exports.register_visitor_info = print_register_visitor_info;

var register_visitor_info = `
  <div>
    <div class="top">
      <div class="left">
        <div class="logo">방문자 등록 서비스</div>
      </div>
      <div class="center">
        <div class="title">회원가입</div>
      </div>
      <div class="right">
      </div>
  </div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">
        <div class="div1">
          <body>이름</body>
          <div class="textbox">
            <label for="name">예) 홍길동</label>
            <input type="text" id="name" style="border: 1px solid #d8d8d8">
          </div>
        </div>
        
        <div class="div2">
          <body>생년월일</body>
          <div class="textbox">
            <input type="date" id="date" style="border: 1px solid #d8d8d8">
          </div>
        </div> 

        <div class="div3">
          <body>전화번호</body>
          <div class="textbox">
            <label for="phone_number">예) 01012345678</label>
            <input type="text" id="phone_number" maxlength=11 style="border: 1px solid #d8d8d8">
          </div>
        </div>

        <div class="div4">
          <body>아이디</body>
            <div class="textbox">
              <label for="id">이메일 형식으로 입력</label>
              <input type="text" id="id" style="border: 1px solid #d8d8d8">
            </div>
        </div>

        <div class="div5">
          <body>비밀번호</body>
            <div class="textbox">
              <label for="password">비밀번호</label>
              <input type="password" id="password" style="border: 1px solid #d8d8d8">
            </div>
        </div>

      </div>
      <div class="right"></div>
    </div>
    <div class="bottom">
      <button class="btn_register" style="text-align:center">완료</button>
    </div>
  </div>
`;

function print_register_visitor_info() {
    return `
      ${register_visitor_info}
    `;
}