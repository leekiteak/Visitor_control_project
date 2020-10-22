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
var twilioInfo = require('./cfg/twilio');
var moment = require('moment');

const client = require('twilio')(twilioInfo.accountSid, twilioInfo.authToken);

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

        var staffs_db = admin.firestore().collection("Staffs");
    
        staffs_db.doc(uid).get().then(queryDoc => {
            var name = queryDoc.data().name;
            console.log(name);
            
            if(name == "admin"){
                res.send(head.head_schedule_list_admin() + schedule_list.schedule_list_admin(uid) + body.body());
            }else{
                res.send(head.head_schedule_list_staff() + schedule_list.schedule_list_staff(uid) + body.body());
            }

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            res.send(errorMessage);
        });
    }else{
        console.log("로그인 후 이용하시기 바랍니다.");
        res.redirect("/");
    }
});

//QR코드 생성
router.route('/QR_code').get(function (req, res) {
    var doc_id = req.query.doc_id;
    var date = req.query.date;

    res.send(head.head_QR_code() + QR_code.qr_code(doc_id,date) + body.body());
});

//QR코드 visit 요청
router.route('/QR_visit_request').post(function (req, res) {
    var doc_id = req.body.id;
    var schedules_db = admin.firestore().collection("Schedules");
    //날짜 확인 과정 추가하기
    var date_info = moment().format("YYYY-MM-DD HH:mm:ss");
    var current_date = date_info.substr(0,10);
    var time = date_info.substr(11,5);

    console.log("current_date : " + current_date);
    console.log("time : " + time);
    console.log("doc_id : " + doc_id);

    schedules_db.doc(doc_id).get().then(queryDoc => {

        var visit_date = queryDoc.data().visit_date;
        var is_visited = queryDoc.data().is_visited;
        var name = queryDoc.data().visitor_name;

        console.log("visit_date : " + visit_date + "visitor_name : " + name);

        //console.log(name);
        if(current_date == visit_date){
            if(is_visited == 0){
                schedules_db.doc(doc_id).update({
                    r_visit_time: time,
                    is_visited: 1,
                  }).then(function (){
                    res.send(doc_id);
                  })
                  .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                  });
            }else{
                res.send("uid is duplicated");
            }
        }else{
            res.send("date is wrong");
        }

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        res.send(errorMessage);

    });
});

//QR코드 exit 요청
router.route('/QR_exit_request').post(function (req, res) {
    var doc_id = req.query.message;
    var schedules_db = admin.firestore().collection("Schedules");
    //날짜 확인 과정 추가하기
    var date_info = moment().format("YYYY-MM-DD HH:mm:ss");
    var current_date = date_info.substr(0,10);
    var time = date_info.substr(11,5);

    console.log("current_date : " + current_date);
    console.log("time : " + time);
    console.log("doc_id : " + doc_id);

    schedules_db.doc(doc_id).get().then(queryDoc => {

        var r_visit_time = queryDoc.data().r_visit_time;
        var is_visited = queryDoc.data().is_visited;

        console.log("r_visit_date : " + r_visit_time );

        var v_hour = r_visit_time.substr(0,2);
        var v_minute = r_visit_time.substr(3,2);
        
        var e_hour = time.substr(0,2);
        var e_minute = time.substr(3,2);

        var cal_time = (parseInt(e_hour)*60 + parseInt(e_minute)) - (parseInt(v_hour)*60 + parseInt(v_minute));

        var s_hour = parseInt(cal_time/60);
        var s_minute = cal_time - (s_hour*60);

        if(s_hour == 0){
            var time_of_stay = String(s_minute)+"분"; 
        }else{
            var time_of_stay = String(s_hour)+"시간"+String(s_minute)+"분"; 
        }

        console.log("time_of_stay : " + time_of_stay );

        if(is_visited == 1){
            schedules_db.doc(doc_id).update({
                r_exit_time: time,
                time_of_stay: time_of_stay,
                is_visited: 0,
            }).then(function (){
                res.send(doc_id);
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
        }else{
            res.send("you should Enter first");
        }


    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        res.send(errorMessage);

    });
});

router.route('/send_QR_code').post(function (req, res) {
    //console.log(req.session);
    var doc_id = req.body.doc_id;
    var date = req.body.date;
    var phone_number = req.body.phone_number;

    console.log("visitor phone number is "+phone_number)

    client.messages
    .create({
        body: 'http://vams.iptime.org:8080/QR_code?doc_id='+doc_id+'&date='+date,   
        from: '+18303553053',
        to: '+821044098230'
    })
    .then(message => console.log(message));
    res.send("success!!!!");

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
