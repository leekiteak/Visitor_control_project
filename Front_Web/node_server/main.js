//외부 내부 모듈들
var http = require('http');
var express = require('express');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');
var sync_request = require('sync-request');
var multer = require('multer');
var fs = require('fs');
var async = require('async');
var querystring = require('querystring');
var url = require('url');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var admin = require('firebase-admin');
var serviceAccount = require('./cfg/vams-ef3c4-firebase-adminsdk-ie4uq-e7d74b048a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//따로 만든 모듈
var head = require('./js_modules/head'); //main 화면
var navbar = require('./js_modules/navbar');//navigation 바
var main = require('./js_modules/index'); //main화면
var body = require('./js_modules/body'); 
var register_visitor_info = require('./js_modules/register_visitor_info');
var register_schedule = require('./js_modules/register_schedule');
var schedule_list = require('./js_modules/schedule_list');
var modify_schedule = require('./js_modules/modify_schedule');
var QR_code = require('./js_modules/QR_code');


var app = express();
var router = express.Router();

app.set('port', process.env.PORT || 8080);
app.use(static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true,
    store:new FileStore()
}))

//메인 화면
router.route('/').get(function (req, res) {
    if(req.session.is_logined == true){
        res.redirect("/schedule_list");
    }else{
        res.send(head.head_all() + main.main() + body.body());
    }
});

//방문자 정보 신규 등록(회원가입)
router.route('/register_visitor_info').get(function (req, res) {
    
    res.send(head.head_register_visitor_info() + register_visitor_info.register_visitor_info() + body.body());

});

//신규 방문 일정 등록
router.route('/register_schedule').get(function (req, res) {
    if(req.session.is_logined == true){

        var visitors_db = admin.firestore().collection("Visitors");
        var uid = req.session.uid;

        visitors_db.doc(uid).get().then(queryDoc => {

            var phone_number = queryDoc.data().phone_number;
            var birth_date = queryDoc.data().birth_date;
            var name = queryDoc.data().name;

            res.send(head.head_register_schedule() + register_schedule.register_schedule(uid,name,birth_date,phone_number) + body.body());
        });

    }else{
        console.log("로그인 후 이용하시기 바랍니다.");
        res.redirect("/");
    }
});

//방문 일정 수정
router.route('/modify_schedule').get(function (req, res) {
    if(req.session.is_logined == true){

        var doc_id = req.query.doc_id;
        var schedules_db = admin.firestore().collection("Schedules");

        console.log(doc_id);

        schedules_db.doc(doc_id).get().then(queryDoc => {

            var visit_date = queryDoc.data().visit_date;
            var visit_time = queryDoc.data().visit_time;
            var staff_name = queryDoc.data().staff_name;
            var visit_purpose = queryDoc.data().visit_purpose;
            var phone_number = queryDoc.data().visitor_phone_number;
            var birth_date = queryDoc.data().visitor_birth_date;
            var name = queryDoc.data().visitor_name;

            res.send(head.head_modify_schedule() + 
                    modify_schedule.modify_schedule(doc_id,visit_date,visit_time,staff_name,visit_purpose,name,birth_date,phone_number) + 
                    body.body());
        });

    }else{
        console.log("로그인 후 이용하시기 바랍니다.");
        res.redirect("/");
    }
});

//방문 일정 목록
router.route('/schedule_list').get(function (req, res) {
    if(req.session.is_logined == true && req.session.is_visitor == true){
        //방문자에 대한 방문 목록
        var uid = req.session.uid;
        res.send(head.head_schedule_list_visitor() + schedule_list.schedule_list_visitor(uid) + body.body());
    }else if(req.session.is_logined == true && req.session.is_visitor == false){
        //직원에 대한 방문 목록
        var uid = req.session.uid;
        res.send(head.head_schedule_list_staff() + schedule_list.schedule_list_staff(uid) + body.body());
    }else{
        console.log("로그인 후 이용하시기 바랍니다.");
        res.redirect("/");
    }
});

//QR코드 생성
router.route('/QR_code').get(function (req, res) {
    res.send(head.head_QR_code() + QR_code.qr_code() + body.body());
});


//로그인 정보 세션에 저장
router.route('/log_in_process').post(function (req, res) {

    if(req.body.is_visitor === "true"){
        req.session.email = req.body.email;
        req.session.uid = req.body.uid;
        req.session.is_logined = true;
        req.session.is_visitor = true;
    }else if(req.body.is_visitor === "false"){
        req.session.email = req.body.email;
        req.session.uid = req.body.uid;
        req.session.is_logined = true;
        req.session.is_visitor = false;
    }

    res.send("success");
});

//로그아웃 정보 세션 삭제
router.route('/log_out_process').get(function (req, res) {
    req.session.destroy(function(err){
        res.redirect('/');
    });
});

app.use('/', router);

var server = http.createServer(app).listen(app.get('port'), function () {
});
