module.exports.nav = print_nav;

function print_nav(user_status, modal) {
    let login = user_status.login_status;
    let userImg = '';
    let userName = '';
    if (login == 1) {
        userImg = user_status.user_info.userImg;
        userName = user_status.user_info.userName;
        if (userImg == '' || userImg == null) {
            userImg = "/subpage/images/user_icon.jpg";
        }
    }
    var nav = `
    `;
    nav += /*html*/`
        <script>
            function getIdToken() {
                firebase.auth().onAuthStateChanged((user) => {
                    if(user) {
                        user.getIdToken(true).then((idToken) => {
                            if(!user.emailVerified){
                                alert("이메일 인증을 진행해주세요");
                                firebase.auth().signOut().then(() => {
                                    location.href = "/auth/signup";
                                    return;
                                });
                            }
                            else{
                                $.ajax({
                                        url: "/auth/set-idToken",
                                        type: "POST",
                                        data: {
                                            idToken: idToken
                                        },
                                        success: function (data) {    
                                            if(${login} === 0) {
                                                historyLocation(window.location.href, 'get', {}, window.location.href);
                                            }
                                        },
                                        error: function (request, status, error) {
                                            console.log(error);
                                        }
                                    });
                                /* $.ajax({
                                    url: "/auth/check-signup",
                                    type: "PATCH",
                                    headers: {
                                        idToken: idToken
                                    },
                                    success: (data) => {
                                        $.ajax({
                                            url: "/auth/set-idToken",
                                            type: "POST",
                                            data: {
                                                idToken: idToken
                                            },
                                            success: function (data) {    
                                                if(${login} === 0) {
                                                    historyLocation(window.location.href, 'get', {}, window.location.href);
                                                }
                                            },
                                            error: function (request, status, error) {
                                                console.log(error);
                                            }
                                        });
                                    },
                                    error: (request, status, error) => {
                                        alert("개인정보 확인에 동의해주세요");
                                        location.href = "/auth/signup/social/progress";
                                    }
                                });*/
                            }
                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                    else{
                        $.ajax({
                            url: "/auth/set-idToken",
                            type: "POST",
                            async: false,
                            data: {
                                idToken: ''
                            },
                            success: function (data) {
                            },
                            error: function (request, status, error) {
                                console.log(error);
                            }
                        });
                        if(${login} === 1) location.reload();
                    }
                });
            }
            getIdToken();
        </script>
    `


    nav += /*html*/`
    <div id="holding_area"></div>
    <div class="nav_wrapper">
        <nav class="navbar navbar-expand-lg fixed-top navbar-light smooting_nav" >
            <!-- 네비게이션 바 -->
            <span class="navbar-toggler-icon toggle_nav_left" id="nav_toggle_btn" onclick="toggle_leftNav()"></span>
            <a class="navbar-brand" id="logo" href="/"><img class="rounded" src="/main/img/new_logo.jpg" style="width: 35px; height: 35px;"></a>
            <a class="navbar-brand nav_title_smooting" href="/">Smoothing</a>
            <span id="toggle_search_plus" class="toggle_search" onclick="toggle_search_bar(0)">
                <i class="fas fa-search-plus"></i>
            </span>
            <span id="toggle_search_minus" class="toggle_search" onclick="toggle_search_bar(1)">
                <i class="fas fa-search-minus"></i>
            </span>
            <div id="search_wrapper">
                <div class="input-group nav_search search_click" onblur="removeRecommended()" >
                    <input type="text" id="search_text" class="form-control search_click" onkeydown="typing_check()" onkeyup="recommendedSearchItem()" onclick="recommendedSearchItem()">
                    <div class="input-group-append" onclick="search()">
                        <span class="nav_search_icon_wrapper btn btn-outline-secondary">
                            <i class="fas fa-search nav_search_icon"></i>
                        </span>
                    </div>
                </div>
                <div id="recommended_search_data" style="display:none">
                </div>
            </div>
    `
    if (login === 0) {
        nav += `
<!--                <div class="collapse navbar-collapse" id="navbarSupportedContent">-->
                    <div class="navbar-right-wrapper">
                    <ul class="navbar-nav navbar-right">
                        <li class="nav-item"><a class="nav-link"><div class="nav_login_btn" data-toggle="modal" data-target="#LoginModal">로그인</div></a></li>
                        <li class="nav-item">
                            <a class="nav-link" href="/auth/signup">
                                무료 회원가입
                            </a>
                        </li>
                    </ul>
                </div>
                </nav> <!-- 네비게이션바 종료 -->
                </div>                                `;
    } else if (login === 1) {
        nav += /*html*/`
                <script>
                    user_chargeCash = ${(user_status.user_info.cash)?user_status.user_info.cash.chargeCash:0};
                </script>
                <div class="navbar-right-wrapper">
                    <ul class="navbar-nav navbar-right">
                        <li id="cart" class="smoothing_dropdown">
                            <img src=${userImg} id="user-image" class="smoothing_dropdown">
                            <span id="user-name" class="smoothing_dropdown">${userName}</span> 님 ▼
                        </li>
                    </ul>
                </div>
                </nav> <!-- 네비게이션바 종료 -->
                <div class="container myList">
                    <div id="smoothing_dropdown" class="smoothing_dropdown shopping-cart" style="display:none">
                    <div class="smoothing_dropdown shopping-cart-header">
                        <i class="fas fa-bell"></i> <span class="badge">3</span>
                        <div class="shopping-cart-total">
                        <span class="main-color-text">Smoothing</span>
                        </div>
                    </div> <!--end shopping-cart-header -->
                    <ul class="smoothing_dropdown shopping-cart-items">
                        <li class="clearfix" onclick='window.location.href="/subpage"'> <span><i class="fas fa-shopping-cart"></i></span> &nbsp마이페이지
                        </li>
                        <li class="clearfix" onclick='window.location.href="/register/profile_register"'> <span><i class="fas fa-user-edit"></i></span> &nbsp프로필 관리
                        </li>
                        <li class="clearfix" onclick='window.location.href="/register/professional_register"'> <span><i class="fas fa-address-card"></i></span> &nbsp전문가 등록
                        </li>
                        <li class="clearfix" onclick='window.location.href="/chat/list/chatroom"'> <span><i class="far fa-comment-dots"></i></span> &nbsp메시지
                        </li>
                    </ul>
                    <div id="logout-btn" class="button">로그아웃</div>
                    </div> <!--end shopping-cart -->
                </div> <!--end container -->
            </div><!-- end navbar wrapper-->
            `;
    }
    if (login === 0) {
        nav += modal;
    }
    return nav;
}