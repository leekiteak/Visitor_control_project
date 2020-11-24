module.exports.register_visitor_face = print_register_visitor_face;

var register_visitor_face = `
  <div>
    <div class="top">
      <div class="left">
        <div class="logo">방문자 얼굴 등록 페이지</div>
      </div>
      <div class="center">
        <div class="title">방문 등록</div>
      </div>
      <div class="right">
      </div>
    </div>
    
    <div class="middle">
      <div class="left"></div>
      <div class="center">
        <p>방문 날짜와 시간, 직원 이름과 방문 목적을 입력하세요</p>
        <div class="div1">
          <body>방문 일시</body>
          <div class="textbox">
            <input type="date" id="date" style="border: 1px solid #d8d8d8">
            <input type="time" id="time" style="border: 1px solid #d8d8d8">
          </div>
        </div>
        
        <div class="div2">
          <body>직원 이름</body>
          <div class="textbox">
            <label for="staff_name">예) 홍길동</label>
            <input type="text" id="staff_name" style="border: 1px solid #d8d8d8">
          </div>
        </div> 

        <div class="div3">
          <body>방문 목적</body>
          <div class="textbox">
            <label for="visit_purpose">예) 직원 미팅</label>
            <input type="text" id="visit_purpose" style="border: 1px solid #d8d8d8">
          </div>
        </div>
        <div class="div7">
        </div>
        <p>방문자 정보를 입력하세요</p>
        <div class="div4">
          <body>이름  </body>
          <div class="textbox">
            <label for="visitor_name"></label>
            <input type="text" id="visitor_name" style="border: 1px solid #d8d8d8">
          </div>
        </div>

        <div class="div5">
          <body>생년월일</body>
          <div class="textbox">
            <label for="birth_date"></label>
            <input type="text" id="birth_date" maxlength=8 style="border: 1px solid #d8d8d8">
          </div>
        </div>

        <div class="div6">
          <body>전화번호</body>
          <div class="textbox">
            <label for="phone_number"></label>
            <input type="text" id="phone_number" maxlength=11 style="border: 1px solid #d8d8d8">
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="bottom">
      <button class="btn_register">확인</button>
    </div>
  </div>
`;

function print_register_visitor_face() {
    return `
      ${register_visitor_face}
    `;
}