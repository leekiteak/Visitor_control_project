module.exports.register_visitor_info = print_register_visitor_info;

var register_visitor_info = `
  <div>
    <div class="top"></div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">

        <div class="div1">
          <div class="textbox">
            <label for="name">이름</label>
            <input type="text" id="name">
          </div>
        </div>
        
        <div class="div2">
          <div class="textbox">
            <label for="resident_registration_number">주민등록번호</label>
            <input type="text" id="resident_registration_number">
          </div>
        </div> 

        <div class="div3">
          <div class="textbox">
            <label for="phone_number">전화번호</label>
            <input type="text" id="phone_number">
          </div>
        </div>

        <div class="div4">
        </div>

      </div>
      <div class="right"></div>
    </div>
    <div class="bottom"></div>
  </div>
`;

function print_register_visitor_info() {
    return `
      ${register_visitor_info}
    `;
}