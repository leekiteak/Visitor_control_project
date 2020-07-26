module.exports.register_schedule = print_register_schedule;

var register_schedule = `
  <div>
    <div class="top"></div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">

        <div class="div1">
          <div class="textbox">
            <label for="date_time">날짜 및 시간</label>
            <input type="text" id="date_time">
          </div>
        </div>
        
        <div class="div2">
          <div class="textbox">
            <label for="staff_name">직원 이름</label>
            <input type="text" id="staff_name">
          </div>
        </div> 

        <div class="div3">
          <div class="textbox">
            <label for="visit_purpose">방문 목적</label>
            <input type="text" id="visit_purpose">
          </div>
        </div>

        <div class="div4">
          <div class="textbox">
            <label for="visitor_name">방문자 이름</label>
            <input type="text" id="visitor_name">
          </div>
        </div>

        <div class="div5">
          <div class="textbox">
            <label for="birthdate">생년월일</label>
            <input type="text" id="birthdate">
          </div>
        </div>

        <div class="div6">
          <div class="textbox">
            <label for="phone_number">핸드폰 번호</label>
            <input type="text" id="phone_number">
          </div>
        </div>

        <div class="div7">
        </div>

      </div>
      <div class="right"></div>
    </div>
    <div class="bottom"></div>
  </div>
`;

function print_register_schedule() {
    return `
      ${register_schedule}
    `;
}