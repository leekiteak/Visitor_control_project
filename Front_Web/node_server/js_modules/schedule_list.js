module.exports.schedule_list_visitor = print_schedule_list_visitor;
module.exports.schedule_list_staff = print_schedule_list_staff;
module.exports.schedule_list_admin = print_schedule_list_admin;

var schedule_list_visitor = `
  <div>
    <div class="top">
      <div class="left">
        <div class="logo">방문자 등록 서비스</div>
      </div>
      <div class="center">
        <div class="title">방문 기록</div>
      </div>
      <div class="right">
        <button class="logout">로그아웃</button>
      </div>
    </div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">
        <div class="category">
          <div class="date">방문 날짜</div>
          <div class="staff_name">직원 이름</div>
          <div class="purpose">방문 목적</div>
          <div class="confirm_status">상태</div>
        </div>
        <div class="div1">
          <div class="schedule_container" id ="schedule_container"></div>
        </div>
      </div>      
      <div class="right"></div>
    </div>
    <div class="bottom">
      <ul class="pagination" id="pagination"></ul>
      <button class="btn_register">새 방문 등록하기</button>
    </div>
  </div>
`;

var schedule_list_staff = `
  <div>
    <div class="top">
      <div class="left"></div>
      <div class="center">
        <div class="title">방문 기록(직원용)</div>
      </div>
      <div class="right">
        <button class="logout">로그아웃</button>
      </div>
    </div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">
        <div class="category">
          <div class="date">방문 날짜</div>
          <div class="visitor_name">방문자 이름</div>
          <div class="purpose">방문 목적</div>
          <div class="confirm_status">승인 상태</div>
        </div>
        <div class="div1">
          <div class="schedule_container" id = "schedule_container"></div>

          <ul class="pagination" id="pagination"></ul>
        </div>
      </div>      
      <div class="right"></div>
    </div>
    <div class="bottom"></div>
  </div>
`;

var schedule_list_admin = `
  <div>
    <div class="top">
      <div class="left"></div>
      <div class="center">
        <div class="title">방문 기록(관리자용)</div>
      </div>
      <div class="right">
        <button class="logout">로그아웃</button>
      </div>
    </div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">
        <div class="category">
          <div class="date">방문 날짜</div>
          <div class="visitor_name">방문자 이름</div>
          <div class="staff_name">직원 이름</div>
          <div class="purpose">방문 목적</div>
          <div class="confirm_status">승인 상태</div>
          <div class="time">시간(Entry)</div>
          <div class="time">시간(Exit)</div>
          <div class="time">시간(Stay)</div>
        </div>
        <div class="div1">
          <div class="schedule_container" id = "schedule_container"></div>

          <ul class="pagination" id="pagination"></ul>
        </div>
      </div>      
      <div class="right"></div>
    </div>
    <div class="bottom"></div>
  </div>
`;

function print_schedule_list_visitor(uid) {
    return `
      <script>
        var uid = "${uid}";
      </script>
      ${schedule_list_visitor}
    `;
}

function print_schedule_list_staff(uid) {
  return `
    <script>
      var uid = "${uid}";
    </script>
    ${schedule_list_staff}
  `;
}

function print_schedule_list_admin(uid) {
  return `
    <script>
      var uid = "${uid}";
    </script>
    ${schedule_list_admin}
  `;
}