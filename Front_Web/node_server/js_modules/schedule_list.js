module.exports.schedule_list = print_schedule_list;

var schedule_list = `
  <div>
    <div class="top"></div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">

        <div class="div1">
          <div class="textbox">
            <label>일정 목록</label>
          </div>
        </div>
        
        <div class="div2">
          <div class="textbox">
            <label>목록 박스</label>

          </div>
        </div> 

        <div class="div3">
          <div class="textbox">
            <label>방문 일정 등록</label>
          </div>
        </div>

      </div>
      <div class="right"></div>
    </div>
    <div class="bottom"></div>
  </div>
`;

function print_schedule_list() {
    return `
      ${schedule_list}
    `;
}