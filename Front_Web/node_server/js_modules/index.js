module.exports.main = print_main;
module.exports.search = print_search;
var login = `
  <div>
    <div class="top"></div>
    <div class="middle">
      <div class="left"></div>
      <div class="center">
        <div class="div1">
          <div class="textbox">
            <label for="idea">아이디</label>
            <input type="text" id="idea">
          </div>
        </div>
        
        <div class="div2">
          <div class="textbox">
            <label for="password">패스워드</label>
            <input type="password" id="password">
          </div>
        </div> 
        <div class="div3">
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="bottom">
      <div class="btn_box">
        <div class="btn_left">로그인</div>
        <div class="btn_right">회원가입</div>
      </div>
    </div>
  </div>
`;

var nav = `
  <!-- 배너 부분(삽입할 예정) -->
  <div class="banner">
    <a id="banner_icon_link" href="javascript:void(0);onclick=nav_open()">
      <div class="banner_bar">
      </div>
    </a>
  </div>
  <div class="nav_bg"></div>
    <!-- 메인 영역 -->
    <div class="nav_sub" id="left_nav">
    <nav class="nav scrollbar scrollbar-lady-lips">
    <div class="nav_1"> <!-- 영역분리 -->
      <div class="nav_title">
        Category
      </div>
      <div class="nav_content">
        <a>
          <div><div class="nav_1_iconBox"><i class="fab fa-blogger-b"></i></div><span class="nav_content_item underline_center highlight" onclick="check_category(1)">Vlog</span>
            <div class="checkbox_wrapper">
              <input type="checkbox" id="chk1"><label></label>
            </div>
          </div>
        </a>

        <a>
          <div><div class="nav_1_iconBox"><i class="fas fa-gamepad"></i></div><span class="nav_content_item underline_center" onclick="check_category(2)" >Game</span>
            <div class="checkbox_wrapper">
              <input type="checkbox" id="chk2"><label></label>
            </div>
          </div>
        </a>

        <a>
          <div><div class="nav_1_iconBox"><i class="fas fa-magic"></i></div><span class="nav_content_item underline_center" onclick="check_category(3)">Beauty</span>
            <div class="checkbox_wrapper">
              <input type="checkbox" id="chk3"><label></label>
            </div>
          </div>
        </a>

        <a>
          <div><div class="nav_1_iconBox"><i class="fas fa-utensils"></i></div><span class="nav_content_item underline_center" onclick="check_category(4)">먹방</span>
            <div class="checkbox_wrapper">
              <input type="checkbox" id="chk4"><label></label>
            </div>
          </div>
        </a>

        <a>
          <div><div class="nav_1_iconBox"><i class="fas fa-headphones-alt"></i></div><span class="nav_content_item underline_center" onclick="check_category(5)">ASMR</span>
            <div class="checkbox_wrapper">
              <input type="checkbox" id="chk5"><label></label>
            </div>
          </div>
        </a>

        <a>
          <div><div class="nav_1_iconBox"><i class="fas fa-tv"></i></div><span class="nav_content_item underline_center" onclick="check_category(6)">방송/연예</span>
            <div class="checkbox_wrapper">
              <input type="checkbox" id="chk6"><label></label>
            </div>
          </div>
        </a>

        <a>
          <div><div class="nav_1_iconBox"><i class="fas fa-swimmer"></i></div><span class="nav_content_item underline_center" onclick="check_category(7)">Sports</span>
            <div class="checkbox_wrapper">
              <input type="checkbox" id="chk7"><label></label>
            </div>
          </div>
        </a>

        <a>
          <div><div class="nav_1_iconBox"><i class="fas fa-newspaper"></i></div><span class="nav_content_item underline_center" onclick="check_category(8)">시사/이슈</span>
            <div class="checkbox_wrapper">
              <input type="checkbox" id="chk8"><label></label>
            </div>
          </div>
        </a>

        <a>
          <div><div class="nav_1_iconBox"><i class="fas fa-user-edit"></i></div><span class="nav_content_item underline_center" onclick="check_category(9)">리뷰</span>
            <div class="checkbox_wrapper">
              <input type="checkbox" id="chk9"><label></label>
            </div>
          </div>
        </a>

        <a>
          <div><div class="nav_1_iconBox"><i class="fab fa-font-awesome-flag"></i></div><span class="nav_content_item underline_center" onclick="check_category(10)">캐릭터/로고</span>
            <div class="checkbox_wrapper">
              <input type="checkbox" id="chk10"><label></label>
            </div>
          </div>
        </a>

        <a>
          <div><div class="nav_1_iconBox"><i class="fas fa-film"></i></div><span class="nav_content_item underline_center" onclick="check_category(11)">애니메이션</span>
            <div class="checkbox_wrapper">
              <input type="checkbox" id="chk11"><label></label>
            </div>
          </div>
        </a>

        <a>
          <div><div class="nav_1_iconBox"><i class="fas fa-cube"></i></div><span class="nav_content_item underline_center" onclick="check_category(12)">3D</span>
            <div class="checkbox_wrapper">
              <input type="checkbox" id="chk12"><label></label>
            </div>
          </div>
        </a>

      </div>
      <div class="nav_title">
        가격 설정 : <span>10</span>분
      </div>

      <div class="nav_title">
        등급
      </div>
      <div class="nav_content nav_checkList">

        <div>
          <input type="checkbox" name="" value="">&nbspNewable
        </div>

        <div>
          <input type="checkbox" name="" value="">&nbspSemiamateur
        </div>

        <div>
          <input type="checkbox" name="" value="">&nbspAmateur
        </div>

        <div>
          <input type="checkbox" name="" value="">&nbspSemipro
        </div>

        <div>
          <input type="checkbox" name="" value="">&nbspProfessional
        </div>

      </div>
    </div>
    <div class="nav_3">
      <div class="nav_title">
        설정
      </div>
      <div class="nav_checkList">
        <div class="nav_content">
          <i class="fas fa-question-circle"></i><span onclick="window.location.href='http://www.khncompany.com/'">&nbsp고객센터</span>
        </div>

        <div class="nav_content">
          <i class="fas fa-exclamation-circle"></i><span onclick="window.location.href='http://www.khncompany.com/'">&nbsp의견 보내기</span>
        </div>
      </div>
    </div>
    <div class="nav_footer">
      <div class="nav_f_1">
        <div class="nav_content">정보</div>
        <div class="nav_content">프레스</div>
        <div class="nav_content">저작권</div>
        <div class="nav_content">문의하기</div>
        <div class="nav_content">크리에이터</div>
        <div class="nav_content">광고</div>
        <div class="nav_content">개발자</div>
      </div>
      <div class="nav_f_2">
        <div class="nav_content">이용약관</div>
        <div class="nav_content">개인정보 보호</div>
        <div class="nav_content">정책 및 안전</div>
      </div>
    </div>
  </nav>
  </div>
`;
var footer = `
  <footer class="footer">
  <div class="row">
    <div class="col-md-6 footer_1">
      <div class="footer_1_title">(주)케이에이치 사업자 정보</div>
      <br>
      <div>(주)케이에이치 | 경기도 성남시 분당구 돌마로 46, 4층</div>
      <div>대표 김경훈 권규한 | 개인정보보호책임 : 김경훈, 권규한</div>
      <div>사업자 등록번호 : 696-35-00782</div>
      010-9136-4105 | khcompany.bizacc@gmail.com
      <br>
      <br>
      <img src="/main/img/google-play-badge.png">
      <img src="/main/img/AppStore.svg">
    </div>
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-3 footer_righter_wrapper">
          <div class="footer_right_title">스무딩</div>
          <div class="footer_right_element" onclick="window.location.href='http://www.khncompany.com/'">마켓</div>
          <div class="footer_right_element" onclick="window.location.href='http://www.khncompany.com/'">맞춤견적</div>
          <div class="footer_right_element" onclick="window.location.href='http://www.khncompany.com/'">엔터프라이즈</div>
        </div>
        <div class="col-md-3 footer_righter_wrapper">
          <div class="footer_right_title" onclick="window.location.href='http://www.khncompany.com/'">스무딩 정보</div>
          <div class="footer_right_element" onclick="window.location.href='http://www.khncompany.com/'">서비스소개</div>
          <div class="footer_right_element" onclick="window.location.href='http://www.khncompany.com/'">인재영입</div>
          <div class="footer_right_element" onclick="window.location.href='http://www.khncompany.com/'">스무딩PRESS</div>
        </div>
        <div class="col-md-3 footer_righter_wrapper">
          <div class="footer_right_title">관련사이트</div>
          <div class="footer_right_element">스무딩 블로그</div>
          <div class="footer_right_element">스무딩 페이스북</div>
          <div class="footer_right_element">스무딩 인스타그램</div>
          <div class="footer_right_element">스무딩 유튜브</div>
        </div>
        <div class="col-md-3 footer_righter_wrapper">
          <div class="footer_right_title" onclick="window.location.href='http://www.khncompany.com/'">고객센터</div>
          <div class="footer_right_element" onclick="window.location.href='http://www.khncompany.com/'">공지사항</div>
          <div class="footer_right_element" onclick="window.location.href='http://www.khncompany.com/'">FAQ</div>
          <div class="footer_right_element" onclick="window.location.href='http://www.khncompany.com/'">이용약관</div>
          <div class="footer_right_element" onclick="window.location.href='http://www.khncompany.com/'">개인정보처리방침</div>
          <div class="footer_right_element" onclick="window.location.href='http://www.khncompany.com/'">전문가 센터</div>
          <div class="footer_right_element" onclick="window.location.href='http://www.khncompany.com/'">1:1문의</div>
        </div>
      </div>
    </div>
  </div>
  <div class="main_copyright">
    copyright 2020 ⓒ KH_company all rights reserved.
  </div>
  </footer>
`
function print_main() {
  return `
      ${login}
      <!--<main id="right_body" class="main main_body">-->
      <!--</main>-->
      <!-- 푸터 영역 -->
    `;
}
function print_search(searchId, sendDataArray) {
  return `
    <script>
      var searchId = "${searchId}";
      var index=${sendDataArray.length};
    </script>
    ${nav}
    <main class="search_body_wrapper">
      <header><i class="fas fa-search"></i> "${searchId}"로 검색한 결과입니다.</header>
      <div class="search_body">
        <hr>
        ${makeSearchPolio(sendDataArray)}
      </div>
      <div id="loading_box">
      </div>
      <aside onclick="add_search_post()">더보기</aside>
      </main>
      ${footer}
  `;
}
function makeSearchPolio(searchData) {
  var polios = '';
  for (item of searchData) {
    polios += `
      <article class="search_item" onclick="window.location.href = '/page/page_read?page=${item.id}' ">
      <div class="row">
        <div class="thumbnail col-3">
          <img src="${item.thumbnail}"/>
        </div>
        <div class="description col-9">
          <header>
            ${item.title}
            <span><i class="far fa-heart"></i>&nbsp${(item.price * 10).format()}&#8361/<span>10분</span></span>
          </header>
          <article>
            <span>${item.displayName}</span> |
            <span>${item.time}</span>
          </article>
          <article>
            ${item.service_description}
          </article>
          <aside>
            <span><i class="fas fa-eye"></i>&nbsp${item.readCount}회</span>&nbsp
            <span>★${item.score}</span>&nbsp
            <span><i class="fas fa-user"></i>&nbsp ${item.comment}</span>
          </aside>
        </div>
      </div>
      </article>
    `
  }
  return polios;
}