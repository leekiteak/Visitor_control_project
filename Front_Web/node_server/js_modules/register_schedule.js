module.exports.register_schedule = print_register_schedule;

var today = new Date();
var today_date = today.getDate();
var register_schedule = `
  <div>
    <div class="top">
      <div class="title">방문 등록</div>
    </div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">
        <p>방문 날짜와 시간, 직원 이름과 방문 목적을 입력하세요</p>
        <div class="div1">
          <body>방문 일시</body>
            <input type="date" id="date">
            <input type="time" id="time">
        </div>
        
        <div class="div2">
          <body>직원 이름</body>
          <div class="textbox">
            <label for="staff_name">예) 홍길동</label>
            <input type="text" id="staff_name">
          </div>
        </div> 

        <div class="div3">
          <body>방문 목적</body>
          <div class="textbox">
            <label for="visit_purpose">예) 직원 미팅</label>
            <input type="text" id="visit_purpose">
          </div>
        </div>
        <div class="div7">
        </div>
        <p>방문자 정보를 입력하세요</p>
        <div class="div4">
          <body>이름  </body>
          <div class="textbox">
            <label for="visitor_name">예) 홍길동</label>
            <input type="text" id="visitor_name">
          </div>
        </div>

        <div class="div5">
          <body>생년월일</body>
          <div class="textbox">
            <label for="birth_date">예) 900101</label>
            <input type="text" id="birth_date" maxlength=6>
          </div>
        </div>

        <div class="div6">
          <body>전화번호</body>
          <div class="textbox">
            <label for="phone_number">예) 01012345678</label>
            <input type="text" id="phone_number" maxlength=11>
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="bottom">
      <div class="btn_register" style="text-align:center">확인</div>
    </div>
  </div>
`;

function print_register_schedule() {
    return `
      ${register_schedule}
    `;
}