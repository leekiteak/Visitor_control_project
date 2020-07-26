module.exports.body = print_body;
module.exports.under_nav = print_body_under_nav;
module.exports.copyright = print_body_copyright;
module.exports.footer = print_body_footer;
function print_body(){
    return `
        </body>
        </html>
    `;
}
function print_body_under_nav(){
    return `
        </body>
        </html>
    `;
}
function print_body_copyright(){
    return `
        <hr>
        <div style="text-align : center; padding-bottom : 10px;">
            copyright 2020 ⓒ KH_company all rights reserved.
        </div>
    `;
}
function print_body_footer(){
    return `
    <footer class="footer">
    <div class="row footer_upper">
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
            <div class="col-md-3 col-3 footer_righter_wrapper">
            <div class="footer_right_title">스무딩</div>
            <div class="footer_right_element">마켓</div>
            <div class="footer_right_element">마켓Prime</div>
            <div class="footer_right_element">맞춤견적</div>
            <div class="footer_right_element">엔터프라이즈</div>
            </div>
            <div class="col-md-3 col-3 footer_righter_wrapper">
            <div class="footer_right_title">스무딩 정보</div>
            <div class="footer_right_element">서비스소개</div>
            <div class="footer_right_element">인재영입</div>
            <div class="footer_right_element">스무딩PRESS</div>
            </div>
            <div class="col-md-3 col-3 footer_righter_wrapper">
            <div class="footer_right_title">관련사이트</div>
            <div class="footer_right_element">스무딩 블로그</div>
            <div class="footer_right_element">스무딩 네이버블로그</div>
            <div class="footer_right_element">스무딩 페이스북</div>
            <div class="footer_right_element">스무딩 인스타그램</div>
            <div class="footer_right_element">스무딩 유튜브</div>
            <div class="footer_right_element">스무딩 포스트</div>
            <div class="footer_right_element">스무딩 테크블로그</div>
            </div>
            <div class="col-md-3 col-3 footer_righter_wrapper">
            <div class="footer_right_title">고객센터</div>
            <div class="footer_right_element">공지사항</div>
            <div class="footer_right_element">FAQ</div>
            <div class="footer_right_element">이용약관</div>
            <div class="footer_right_element">개인정보처리방침</div>
            <div class="footer_right_element">전문가 센터</div>
            <div class="footer_right_element">1:1문의</div>
            </div>
        </div>
        </div>
    </div>
    <div class="main_copyright">
        copyright 2020 ⓒ KH_company all rights reserved.
    </div>
    </footer>
    `;
}