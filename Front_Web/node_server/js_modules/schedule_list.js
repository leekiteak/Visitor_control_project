module.exports.schedule_list = print_schedule_list;

var schedule_list = `
  <div>
    <div class="top">
      <div class="title">방문 기록</div>
    </div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">
        <div class="category">
          <div class="date">방문 날짜</div>
          <div class="staff_name">직원 이름</div>
          <div class="purpose">방문 목적</div>
        </div>
        <div class="div1">
          <div class="schedule_container" id = "schedule_container"></div>

          <ul class="pagination" id="pagination"></ul>
        </div>
      </div>      
      <div class="right"></div>
    </div>
    <div class="bottom">
      <div class="btn_register">새 방문 등록하기</div>
    </div>
  </div>
`;

function print_schedule_list(uid) {
    return `
      <script>
        var uid = "${uid}";
      </script>
      ${schedule_list}
    `;
}