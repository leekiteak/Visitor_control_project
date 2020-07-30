module.exports.schedule_list = print_schedule_list;

var schedule_list = `
  <div>
    <div class="top"></div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">
        <div class="div1">
          <div class="textbox">
            <label>방문 기록</label>
          </div>
        </div>
        <div class="div2">
          <div class="textbox">
            <label>목록 박스</label>
          </div>
        </div>
        <div class="div3">
        </div>
      </div>      
      <div class="right"></div>
    </div>
    <div class="bottom">
      <div class="btn_register">신규 방문 등록하기</div>
    </div>
  </div>
`;

function print_schedule_list() {
    return `
      ${schedule_list}
    `;
}