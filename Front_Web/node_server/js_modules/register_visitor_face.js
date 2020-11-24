module.exports.register_visitor_face = print_register_visitor_face;

var register_visitor_face = `
  <div>
    <div class="top">
      <div class="left">
        <div class="logo">방문자 등록 서비스</div>
      </div>
      <div class="center">
        <div class="title">얼굴 등록</div>
      </div>
      <div class="right">
      </div>
    </div>
    
    <div class="middle">
      <div class="left"></div>
      <div class="center">
        <div class="img">
          <button class="btn_addPic" align="center">눌러서 사진 추가</button>
        </div>
      </div>
      <div class="right"></div>
    </div>

    <div class="bottom">
      <button class="btn_register">등록 완료</button>
    </div>
  </div>
`;

function print_register_visitor_face() {
    return `
      ${register_visitor_face}
    `;
} 
