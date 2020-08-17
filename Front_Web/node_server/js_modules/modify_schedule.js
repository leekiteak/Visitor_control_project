module.exports.modify_schedule = print_modify_schedule;

var modify_schedule = `
  <div>
    <div class="top">
      <div class="left">
        <div class="logo">방문자 등록 서비스</div>
      </div>
      <div class="center">
        <div class="title">일정 수정하기</div>
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
            <label for="staff_name"></label>
            <input type="text" id="staff_name" style="border: 1px solid #d8d8d8">
          </div>
        </div> 

        <div class="div3">
          <body>방문 목적</body>
          <div class="textbox">
            <label for="visit_purpose"></label>
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
      <div class="btn_register" style="text-align:center">수정 완료</div>
    </div>
  </div>
`;

function print_modify_schedule(doc_id,visit_date,visit_time,staff_name,visit_purpose,name,birth_date,phone_number) {
    return `
      <script>
        var doc_id = "${doc_id}";
        var visit_date = "${visit_date}";
        var visit_time = "${visit_time}";
        var staff_name = "${staff_name}";
        var visit_purpose = "${visit_purpose}";
        var visitor_name = "${name}";
        var birth_date = "${birth_date}";
        var phone_number = "${phone_number}";
      </script>
      ${modify_schedule}
    `;
}