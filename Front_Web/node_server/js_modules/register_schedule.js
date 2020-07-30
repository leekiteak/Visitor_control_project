module.exports.register_schedule = print_register_schedule;

var today = new Date();
var today_date = today.getDate();
var register_schedule = `
  <div>
    <div class="top"></div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">
        <h4>방문 날짜와 시간, 직원 이름과 방문 목적을 입력하세요</h4>
        <div class="div1">
          <body>방문 일시</body>
            <input type="date" id="date">
            <input type="time" id="time">
        </div>
        
        <div class="div2">
          <body>직원 이름</body>
          <div class="textbox">
            <label for="staff_name">직원 이름</label>
            <input type="text" id="staff_name">
          </div>
        </div> 

        <div class="div3">
          <body>방문 목적</body>
          <div class="textbox">
            <label for="visit_purpose">방문 목적</label>
            <input type="text" id="visit_purpose">
          </div>
        </div>
        <div class="div7">
        </div>
        <h4>방문자 정보를 입력하세요</h4>
        <div class="div4">
          <body>방문자 이름</body>
          <div class="textbox">
            <label for="visitor_name">방문자 이름</label>
            <input type="text" id="visitor_name">
          </div>
        </div>

        <div class="div5">
          <body>방문자 생년월일</body>
          <input type="date" id="birth_date">
        </div>

        <div class="div6">
          <body>핸드폰 번호</body>
          <input type="tel" name="phone_number" maxlength=11>
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