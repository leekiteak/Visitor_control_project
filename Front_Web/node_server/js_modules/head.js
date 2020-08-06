module.exports.head_all = print_head_all;
module.exports.head_register_visitor_info = print_head_register_visitor_info;
module.exports.head_register_schedule = print_head_register_schedule;
module.exports.head_schedule_list = print_head_schedule_list;
module.exports.head_schedule_indetail = print_head_schedule_indetail;

var head_common = `
    <!--css-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"/>
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js" integrity="sha384-6khuMg9gaYr5AxOqhkVIODVIvm9ynTT5J4V1cfthmT+emCG6yVmEZsRHdxlotUnm" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/57608ebaa2.js"></script>
    <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script src="https://cdn.bootpay.co.kr/js/bootpay-3.0.2.min.js" type="application/javascript"></script>
    <script>
        AOS.init();
    </script>

    <!--datepicker 라이브러리-->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <!-- font -->
    <link href="https://fonts.googleapis.com/css?family=El+Messiri&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Abril+Fatface&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap" rel="stylesheet">

    <script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-app.js"></script>
    <!-- Add Firebase products that you want to use -->
    <script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-firestore.js"></script>
    <script>
        var init = firebase.initializeApp({
            apiKey: "AIzaSyCuRYdN1dqAU2_zA0msxpvqp_TPF9PWWo8",
            authDomain: "vams-ef3c4.firebaseapp.com",
            databaseURL: "https://vams-ef3c4.firebaseio.com",
            projectId: "vams-ef3c4",
            storageBucket: "vams-ef3c4.appspot.com",
            messagingSenderId: "569431193014",
            appId: "1:569431193014:web:408e30be634bc47a6b7d17",
            measurementId: "G-HK524L8K92"
        });
        var db = init.firestore();
    </script>
`;

//방문자 정보 신규 등록(회원가입) 헤더
var head_register_visitor_info = `
    <!--css-->
    <link rel="stylesheet" href="/Register_visitor_Info/css/register_visitor_info.css">

    <!--js-->
    <script src="/Register_visitor_Info/js/Register_visitor_Info.js"></script>
`;

//신규 방문 일정 등록 헤더
var head_register_schedule = `
    <!--css-->
    <link rel="stylesheet" href="/Register_schedule/css/register_schedule.css">

    <!--js-->
    <script src="/Register_schedule/js/register_schedule.js"></script>

`;

//로그인 헤더
var head_login = `
    <!--css-->
    <link rel="stylesheet" href="/Log_In/css/log_in.css">

    <!--js-->
    <script src="/Log_In/js/log_in.js"></script>
`;

//방문 일정 리스트 헤더
var head_schedule_list = `
    <!--css-->
    <link rel="stylesheet" href="/Visiting_schedule/css/visiting_schedule.css">

    <!--js-->
    <script src="/Visiting_schedule/js/visiting_schedule.js"></script>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="/Visiting_schedule/js/jquery.twbsPagination.js"></script>
`;

//방문 일정 자세히 보기 헤더
var head_schedule_indetail = `
    <!--css-->
    <link rel="stylesheet" href="/Visiting_schedule_InDetail/css/visiting_schedule_indetail.css">

    <!--js-->
    <script src="/Visiting_schedule_InDetail/js/visiting_schedule_indetail.js"></script>
`;

var head_signup_js = `
    <!--js-->
    <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js"></script>
    <!-- Add Firebase products that you want to use -->
    <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-auth.js"></script>
    <script src="/login/js/signuputils.js"></script>
`;

function html_default() {
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, height = device-height, initial-scale=1.0, maximum-scale=1, minimum-scale=1">

    <meta property ="og:title" content="방문자 등록 서비스">
    <meta property ="og:description" content="방문자 등록 서비스 사이트입니다">

    `
}


//모든 헤드 출력
function print_head_all() {
    //헤드시작
    var head = html_default() + `
    <title>방문자 등록 서비스</title>
    `;

    //모든 헤더는 여기에
    head += head_common;
    head += head_login;

    //헤드끝
    head += `
    </head>
    <body>
    `
    ;

    return head;
}

function print_head_register_visitor_info() {
    return html_default() + `${head_common} ${head_register_visitor_info}</head> <body>`;
}

function print_head_register_schedule() {
    return html_default() + `${head_common} ${head_register_schedule} </head> <body>`;
}

function print_head_schedule_list(){
    return html_default() + `${head_common} ${head_schedule_list} </head> <body>`;
}

function print_head_schedule_indetail(){
    return html_default() + `${head_common} ${head_schedule_indetail} </head> <body>`;
}