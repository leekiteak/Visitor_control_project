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
var schedule_indetail = require('./js_modules/schedule_list_indetail');


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

    res.send(head.head_all() + main.main() + body.body());

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

//방문 일정 목록
router.route('/schedule_list').get(function (req, res) {
    if(req.session.is_logined == true){
        var uid = req.session.uid;
        res.send(head.head_schedule_list() + schedule_list.schedule_list(uid) + body.body());
    }else{
        console.log("로그인 후 이용하시기 바랍니다.");
        res.redirect("/");
    }

});

//로그인 정보 세션에 저장
router.route('/log_in_process').post(function (req, res) {
    //console.log(req.session);
    req.session.email = req.body.email;
    req.session.uid = req.body.uid;
    req.session.is_logined = true;
    //console.log(req.session);
    res.send("success");

});

app.use('/', router);

var server = http.createServer(app).listen(app.get('port'), function () {
});
