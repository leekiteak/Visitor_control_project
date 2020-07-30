module.exports.register_visitor_info = print_register_visitor_info;

var register_visitor_info = `
  <div>
    <div class="top">
    <h3>회원가입</h3>
    </div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">
        <div class="div5">
        </div>
        <div class="div1">
          <body>이름</body>
          <div class="textbox">
            <label for="name">이름</label>
            <input type="text" id="name">
          </div>
        </div>
        
        <div class="div2">
          <body>생년월일</body>
          <div class="textbox">
            <label for="resident_registration_number">예) 900101</label>
            <input type="text" id="resident_registration_number">
          </div>
        </div> 

        <div class="div3">
          <body>전화번호</body>
          <div class="textbox">
            <label for="phone_number">이름</label>
            <input type="text" id="phone_number">
          </div>
        </div>

        <div class="div4">
        </div>

      </div>
      <div class="right"></div>
    </div>
    <div class="bottom">
      <div class="btn_register" style="text-align:center">완료</div>
    </div>
  </div>
`;

function print_register_visitor_info() {
    return `
      ${register_visitor_info}
    `;
}