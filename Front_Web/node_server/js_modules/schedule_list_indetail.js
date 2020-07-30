module.exports.schedule_indetail = print_schedule_indetail;

var schedule_indetail = `
  <div>
    <div class="top">
      <h3 style="text-align:center">방문 일정 자세히 보기</h3>
    </div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">

        <div class="div1">
        </div>
        
        <div class="div2">
          <div class="textbox">
            <label>방문 예정 일시</label>
          </div>
        </div> 

        <div class="div3">
          <div class="textbox">
            <label>방문 목적</label>
          </div>
        </div>
        <div class="div4">
          <div class="textbox">
            <label>직원 이름</label>
        </div>

        <div class="div5">
        </div>

      </div>
      <div class="right"></div>
    </div>
    <div class="bottom"></div>
  </div>
`;

function print_schedule_indetail() {
    return `
      ${schedule_indetail}
    `;
}