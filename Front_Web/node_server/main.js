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
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "vams-ef3c4.appspot.com"
});

//따로 만든 모듈
var head = require('./js_modules/head'); //main 화면  
var navbar = require('./js_modules/navbar');//navigation 바
var main = require('./js_modules/index'); //main화면
var body = require('./js_modules/body'); 
var register_visitor_info = require('./js_modules/register_visitor_info');
var register_schedule = require('./js_modules/register_schedule');
var register_visitor_face = require('./js_modules/register_visitor_face');
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

//방문자 얼굴 사진 등록
router.route('/register_visitor_face').get(function (req, res) {
    if(req.session.is_logined == true){
        var uid = req.session.uid;
        res.send(head.head_register_visitor_face() + register_visitor_face.register_visitor_face(uid) + body.body());
    }else{
        console.log("로그인 후 이용하시기 바랍니다.");
        res.redirect("/");
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
            var face = queryDoc.data().face;
            console.log(face);

            if(face){
                res.send(head.head_register_schedule() + register_schedule.register_schedule(uid,name,birth_date,phone_number) + body.body());
            }else{
                console.log("얼굴 등록을 먼저 해주세요!");
                res.redirect("/schedule_list");
            }
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
    /*
    client.messages
    .create({
        body: 'http://vams.iptime.org:8080/QR_code?doc_id='+doc_id+'&date='+date,   
        from: '+18303553053',
        to: '+821044098230'
    })
    .then(message => console.log(message));
    */
    res.send("success!!!!");

});

//로그인 정보 세션에 저장
router.route('/log_in_process').post(function (req, res) {

    if(req.body.is_visitor === "true"){
        req.session.email = req.body.email;
        req.session.uid = req.body.uid;
        req.session.is_logined = true;
        req.session.is_visitor = true;
        req.session.is_picture = false;
    }else if(req.body.is_visitor === "false"){
        req.session.email = req.body.email;
        req.session.uid = req.body.uid;
        req.session.is_logined = true;
        req.session.is_visitor = false;
        req.session.is_picture = false;
    }

    res.send("success");
});

//얼굴 등록 후 세션에 저장
router.route('/face_register_process').get(function (req, res) {
    var visitors_db = admin.firestore().collection("Visitors");
    var uid = req.session.uid;
    visitors_db.doc(uid).update({
        face: true,
      }).then(function (){
        console.log("c-bal");
        res.redirect("/schedule_list");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
});

//로그아웃 정보 세션 삭제
router.route('/log_out_process').get(function (req, res) {
    req.session.destroy(function(err){
        res.redirect('/');
    });
});

//run python shell
function activate_python(){
      
    var {PythonShell} = require('python-shell');

    var options = {
        scriptPath: path.join(__dirname, 'face_recognition')
        //args: ['1','2']
    };
    /*
    let pyshell = new PythonShell('demo_video.py', options) // Options 설정 가능

    // stdin을 통해 Python Script에 변수 전달
    //pyshell.send('hello')
    //pyshell.send('world')
    // Python Script로부터 출력된 결과 값 받기(Python Script의 print에서 받아오는 값이 msg임)
    pyshell.on('message', function(message) {
        console.log(message);
        //res.send("done");
      })

    // Python Script의 프로세스 종료하기                
        pyshell.end((err, code, signal) => {
	    if(err) throw err;
        console.log('The exit code was: ' + code);
  	    console.log('The exit signal was: ' + signal);
        console.log('finished');
        res.send("done!!");
    })*/
    
    PythonShell.run('./demo_video.py',options, function (err,results) {
        if (err) throw err;
        console.log('finished with:',results);
        console.log('data: ',results[1]);
        update_visit_info(results[1]);
        
    });  
}
function update_visit_info(uid){
    console.log(uid);

    //날짜 확인 과정 추가하기
    var date_info = moment().format("YYYY-MM-DD HH:mm:ss");
    var current_date = date_info.substr(0,10);
    var time = date_info.substr(11,5);
    var schedules_db = admin.firestore().collection("Schedules");

    console.log("current_date : " + current_date);
    console.log("time : " + time);
    console.log("uid : " + uid);

    var all_schedule = schedules_db.get().then(queryDoc => {
        queryDoc.forEach(doc=>{
            console.log(doc.id,'=>',doc.data().visit_date,doc.data().visitor_uid ,doc.data().confirm_status);
            if(doc.data().visit_date == current_date && doc.data().visitor_uid == uid && doc.data().confirm_status == 2 && doc.data().is_visited == 0){
                schedules_db.doc(doc.id).update({
                    r_visit_time: time,
                    is_visited: 1,
                  }).then(function (){
                      console.log("visit_process is completed successfully");
                      return doc.data().visitor_name;
                  })
                  .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                  });
            }
            return "No matching schedule!!";
        });
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        //res.send(errorMessage);

    });

}

//방문자 visit face 인식
router.route('/face_in').post(function (req, res) {

    //activate_python();
    var is_correct_schedule = 0;
    var status = 0;
    var name = '';
    var bucket = admin.storage().bucket();

    bucket.getFiles(function(err, files) {
        if (!err) {
            // files is an array of File objects.
            var num_file = 0;
            files.forEach(function(file,index){
                var str_arr = file.name.split('/');
                if(str_arr[1] != ''){
                    num_file++;
                }
            });

            files.forEach(function(file,index){
                
                if(file.name.includes('faces_in_server')){
                    var strarray = file.name.split('/')
                    
                    if(strarray[1] != ''){
                        var localfilename = './face_recognition/faces_in_server/'+strarray[1]
                        
                        file.createReadStream()
                            .on('error', function(err) {
                                console.log(err);
                            }).on('response', function(response) {
                                // Server connected and responded with the specified status and headers.
                            }).on('end', function() {
                                // The file is fully downloaded.
                                num_file--;
                                console.log("download is completed in ",localfilename);
                                if(num_file == 0){
                                    console.log("activate python file");
                                    var {PythonShell} = require('python-shell');

                                    var options = {
                                        scriptPath: path.join(__dirname, 'face_recognition')
                                    };
                                    
                                    PythonShell.run('./demo_video.py',options, function (err,results) {
                                        if (err) throw err;
                                        //console.log('finished with:',results);
                                        console.log('python result : ',results[1]);
                                        
                                        var uid = results[1];

                                        //날짜 확인 과정 추가하기
                                        var date_info = moment().format("YYYY-MM-DD HH:mm:ss");
                                        var current_date = date_info.substr(0,10);
                                        var time = date_info.substr(11,5);
                                        var schedules_db = admin.firestore().collection("Schedules");

                                        console.log("current_date : " + current_date);
                                        console.log("time : " + time);
                                        console.log("uid : " + uid);

                                        var all_schedule = schedules_db.get().then(queryDoc => {
                                            var doc_length = queryDoc.length;
                                            queryDoc.forEach(doc=>{
                                                console.log(doc.id,'=>',doc.data().visit_date,doc.data().visitor_uid ,doc.data().confirm_status,doc.data().is_visited);
                                                if( doc.data().visitor_uid == uid ){
                                                    is_correct_schedule = 1
                                                    if(doc.data().visit_date == current_date){
                                                        if(doc.data().is_visited == 0){
                                                            if(doc.data().confirm_status == 2){
                                                                status = 4;
                                                                console.log("in process ", doc.data().uid," ",doc.data().visitor_name);
                                                                name = doc.data().visitor_name;
                                                                schedules_db.doc(doc.id).update({
                                                                r_visit_time: time,
                                                                is_visited: 1,
                                                                }).then(function (){
                                                                    console.log("visit_process is completed successfully");
                                                                    //res.send("success!!");
                                                                }).catch(function(error) {
                                                                    // Handle Errors here.
                                                                    var errorCode = error.code;
                                                                    var errorMessage = error.message;
                                                                    console.log(errorMessage);
                                                                });                                                                
                                                            }else{
                                                                status = 3;
                                                            }

                                                        }else{
                                                            status = 2;
                                                        }
                                                    }else{
                                                        status = 1;
                                                    }

                                                }
                                                /*
                                                if(doc.data().visit_date == current_date && doc.data().visitor_uid == uid && doc.data().confirm_status == 2 && doc.data().is_visited == 0){
                                                    console.log("in process ", doc.data().uid," ",doc.data().visitor_name);
                                                    is_correct_schedule = 1
                                                    name = doc.data().visitor_name;
                                                    schedules_db.doc(doc.id).update({
                                                    r_visit_time: time,
                                                    is_visited: 1,
                                                    }).then(function (){
                                                        console.log("visit_process is completed successfully");
                                                        //res.send("success!!");
                                                    }).catch(function(error) {
                                                        // Handle Errors here.
                                                        var errorCode = error.code;
                                                        var errorMessage = error.message;
                                                        console.log(errorMessage);
                                                    });
                                                }
                                                */
                                                
                                            });
                                            if(is_correct_schedule == 0){
                                                //no matching uid 일치하는 uid의 스케줄이 존재하지 않음
                                                res.send("0.error");
                                            }else{
                                                if(status == 1){
                                                    //날짜 틀림
                                                    res.send("1.error");
                                                }else if(status == 2){
                                                    //이미 방문해서 건물 내  존재 상태이거나 방문하고 나서 건물 밖으로 나온 상태
                                                    res.send("2.error");
                                                }else if(status == 3){
                                                    //방문 신청이 직원에 의해 승인 되지 않은 상태
                                                    res.send("3.error");
                                                }else if(status == 4){
                                                    //방문 정상 처리 완료
                                                    res.send("4."+name);
                                                }else{
                                                    //status == 0
                                                    res.send("else");
                                                }
                                                
                                            }
                                        }).catch(function(error) {
                                            // Handle Errors here.
                                            var errorCode = error.code;
                                            var errorMessage = error.message;
                                            console.log(errorMessage);
                                            //res.send(errorMessage);
                                        });                        
                                    });  


                                }
                            })
                            .pipe(fs.createWriteStream(localfilename));                        
                    }
                
                } else if(file.name.includes('faces_comp')) {
                    var strarray = file.name.split('/')
                    if(strarray[1] != ''){
                        var localfilename = './face_recognition/faces_comp/'+strarray[1]
                        
                        file.createReadStream()
                            .on('error', function(err) {
                                console.log(err)
                            }).on('response', function(response) {
                                // Server connected and responded with the specified status and headers.
                            }).on('end', function() {
                                // The file is fully downloaded.
                                num_file--;
                                console.log("download is completed in ",localfilename);
                                if(num_file == 0){
                                    console.log("activate python file");
                                    var {PythonShell} = require('python-shell');

                                    var options = {
                                        scriptPath: path.join(__dirname, 'face_recognition')
                                    };
                                    
                                    PythonShell.run('./demo_video.py',options, function (err,results) {
                                        if (err) throw err;
                                        //console.log('finished with:',results);
                                        console.log('python result : ',results[1]);
                                        
                                        var uid = results[1];

                                        //날짜 확인 과정 추가하기
                                        var date_info = moment().format("YYYY-MM-DD HH:mm:ss");
                                        var current_date = date_info.substr(0,10);
                                        var time = date_info.substr(11,5);
                                        var schedules_db = admin.firestore().collection("Schedules");

                                        console.log("current_date : " + current_date);
                                        console.log("time : " + time);
                                        console.log("uid : " + uid);

                                        var all_schedule = schedules_db.get().then(queryDoc => {
                                            var doc_length = queryDoc.length;
                                            queryDoc.forEach(doc=>{
                                                console.log(doc.id,'=>',doc.data().visit_date,doc.data().visitor_uid ,doc.data().confirm_status,doc.data().is_visited);
                                                if( doc.data().visitor_uid == uid ){
                                                    is_correct_schedule = 1
                                                    if(doc.data().visit_date == current_date){
                                                        if(doc.data().is_visited == 0){
                                                            if(doc.data().confirm_status == 2){
                                                                status = 4;
                                                                console.log("in process ", doc.data().uid," ",doc.data().visitor_name);
                                                                name = doc.data().visitor_name;
                                                                schedules_db.doc(doc.id).update({
                                                                r_visit_time: time,
                                                                is_visited: 1,
                                                                }).then(function (){
                                                                    console.log("visit_process is completed successfully");
                                                                    //res.send("success!!");
                                                                }).catch(function(error) {
                                                                    // Handle Errors here.
                                                                    var errorCode = error.code;
                                                                    var errorMessage = error.message;
                                                                    console.log(errorMessage);
                                                                });                                                                
                                                            }else{
                                                                status = 3;
                                                            }

                                                        }else{
                                                            status = 2;
                                                        }
                                                    }else{
                                                        status = 1;
                                                    }

                                                }
                                                
                                            });
                                            if(is_correct_schedule == 0){
                                                //no matching uid 일치하는 uid의 스케줄이 존재하지 않음
                                                res.send("0.error");
                                            }else{
                                                if(status == 1){
                                                    //날짜 틀림
                                                    res.send("1.error");
                                                }else if(status == 2){
                                                    //이미 방문해서 건물 내  존재 상태이거나 방문하고 나서 건물 밖으로 나온 상태
                                                    res.send("2.error");
                                                }else if(status == 3){
                                                    //방문 신청이 직원에 의해 승인 되지 않은 상태
                                                    res.send("3.error");
                                                }else if(status == 4){
                                                    //방문 정상 처리 완료
                                                    res.send("4."+name);
                                                }else{
                                                    //status == 0
                                                    res.send("else");
                                                }
                                                
                                            }
                                        }).catch(function(error) {
                                            // Handle Errors here.
                                            var errorCode = error.code;
                                            var errorMessage = error.message;
                                            console.log(errorMessage);
                                            //res.send(errorMessage);
                                        });                        
                                    });  


                                }
                            })
                            .pipe(fs.createWriteStream(localfilename));
                    }
                    
                }
            });
        }else{
            console.log(err)
        }
    });
});

//방문자 exit face 인식
router.route('/face_out').post(function (req, res) {

    var is_correct_schedule = 0;
    var status = 0;
    var name = '';
    var bucket = admin.storage().bucket();

    bucket.getFiles(function(err, files) {
        if (!err) {
            // files is an array of File objects.
            var num_file = 0;
            files.forEach(function(file,index){
                var str_arr = file.name.split('/');
                if(str_arr[1] != ''){
                    num_file++;
                }
            });

            files.forEach(function(file,index){
                
                if(file.name.includes('faces_in_server')){
                    var strarray = file.name.split('/')
                    
                    if(strarray[1] != ''){
                        var localfilename = './face_recognition/faces_in_server/'+strarray[1]
                        
                        file.createReadStream()
                            .on('error', function(err) {
                                console.log(err);
                            }).on('response', function(response) {
                                // Server connected and responded with the specified status and headers.
                            }).on('end', function() {
                                // The file is fully downloaded.
                                num_file--;
                                console.log("download is completed in ",localfilename);
                                if(num_file == 0){
                                    console.log("activate python file");
                                    var {PythonShell} = require('python-shell');

                                    var options = {
                                        scriptPath: path.join(__dirname, 'face_recognition')
                                    };
                                    
                                    PythonShell.run('./demo_video.py',options, function (err,results) {
                                        if (err) throw err;
                                        //console.log('finished with:',results);
                                        console.log('python result : ',results[1]);
                                        
                                        var uid = results[1];

                                        //날짜 확인 과정 추가하기
                                        var date_info = moment().format("YYYY-MM-DD HH:mm:ss");
                                        var current_date = date_info.substr(0,10);
                                        var time = date_info.substr(11,5);
                                        var schedules_db = admin.firestore().collection("Schedules");

                                        console.log("current_date : " + current_date);
                                        console.log("time : " + time);
                                        console.log("uid : " + uid);

                                        var all_schedule = schedules_db.get().then(queryDoc => {
                                            var doc_length = queryDoc.length;
                                            queryDoc.forEach(doc=>{
                                                console.log(doc.id,'=>',doc.data().visit_date,doc.data().visitor_uid ,doc.data().confirm_status,doc.data().is_visited);
                                                if( doc.data().visitor_uid == uid ){
                                                    is_correct_schedule = 1
                                                    if(doc.data().visit_date == current_date){
                                                        if(doc.data().is_visited == 1){
                                                            if(doc.data().confirm_status == 2){
                                                                status = 4;
                                                                console.log("in process ", doc.data().uid," ",doc.data().visitor_name);
                                                                name = doc.data().visitor_name;
                                                                
                                                                
                                                                var r_visit_time = doc.data().r_visit_time;
                                            
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
            
            
            
                                                                schedules_db.doc(doc.id).update({
                                                                    r_exit_time: time,
                                                                    is_visited: 2,
                                                                    time_of_stay: time_of_stay,
                                                                }).then(function (){
                                                                    console.log("exit_process is completed successfully");
                                                                    //res.send("success!!");
                                                                }).catch(function(error) {
                                                                    // Handle Errors here.
                                                                    var errorCode = error.code;
                                                                    var errorMessage = error.message;
                                                                    console.log(errorMessage);
                                                                });


                                                            }else{
                                                                status = 3;
                                                            }

                                                        }else{
                                                            status = 2;
                                                        }
                                                    }else{
                                                        status = 1;
                                                    }

                                                }
                                                /*
                                                if(doc.data().visit_date == current_date && doc.data().visitor_uid == uid && doc.data().confirm_status == 2 && doc.data().is_visited == 1){
                                                    is_correct_schedule = 1
                                                    name = doc.data().visitor_name;
                                                    
                                                    var r_visit_time = doc.data().r_visit_time;
                                            
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



                                                    schedules_db.doc(doc.id).update({
                                                        r_exit_time: time,
                                                        is_visited: 2,
                                                        time_of_stay: time_of_stay,
                                                    }).then(function (){
                                                        console.log("exit_process is completed successfully");
                                                        //res.send("success!!");
                                                    }).catch(function(error) {
                                                        // Handle Errors here.
                                                        var errorCode = error.code;
                                                        var errorMessage = error.message;
                                                        console.log(errorMessage);
                                                    });
                                                }
                                                */
                                            });
                                            if(is_correct_schedule == 0){
                                                //no matching uid 일치하는 uid의 스케줄이 존재하지 않음
                                                res.send("0.error");
                                            }else{
                                                if(status == 1){
                                                    //날짜 틀림
                                                    res.send("1.error");
                                                }else if(status == 2){
                                                    //건물 내  방문하지 않아 상태이거나 방문하고 나서 건물 밖으로 나온 상태
                                                    res.send("2.error");
                                                }else if(status == 3){
                                                    //방문 신청이 직원에 의해 승인 되지 않은 상태
                                                    res.send("3.error");
                                                }else if(status == 4){
                                                    //방문 정상 처리 완료
                                                    res.send("4."+name);
                                                }else{
                                                    //status == 0
                                                    res.send("else");
                                                }
                                                
                                            }
                                        }).catch(function(error) {
                                            // Handle Errors here.
                                            var errorCode = error.code;
                                            var errorMessage = error.message;
                                            console.log(errorMessage);
                                            //res.send(errorMessage);
                                        });                        
                                    });  


                                }
                            })
                            .pipe(fs.createWriteStream(localfilename));                        
                    }
                
                } else if(file.name.includes('faces_comp')) {
                    var strarray = file.name.split('/')
                    if(strarray[1] != ''){
                        var localfilename = './face_recognition/faces_comp/'+strarray[1]
                        
                        file.createReadStream()
                            .on('error', function(err) {
                                console.log(err)
                            }).on('response', function(response) {
                                // Server connected and responded with the specified status and headers.
                            }).on('end', function() {
                                // The file is fully downloaded.
                                num_file--;
                                console.log("download is completed in ",localfilename);
                                if(num_file == 0){
                                    console.log("activate python file");
                                    var {PythonShell} = require('python-shell');

                                    var options = {
                                        scriptPath: path.join(__dirname, 'face_recognition')
                                    };
                                    
                                    PythonShell.run('./demo_video.py',options, function (err,results) {
                                        if (err) throw err;
                                        //console.log('finished with:',results);
                                        console.log('python result : ',results[1]);
                                        
                                        var uid = results[1];

                                        //날짜 확인 과정 추가하기
                                        var date_info = moment().format("YYYY-MM-DD HH:mm:ss");
                                        var current_date = date_info.substr(0,10);
                                        var time = date_info.substr(11,5);
                                        var schedules_db = admin.firestore().collection("Schedules");

                                        console.log("current_date : " + current_date);
                                        console.log("time : " + time);
                                        console.log("uid : " + uid);

                                        var all_schedule = schedules_db.get().then(queryDoc => {
                                            var doc_length = queryDoc.length;
                                            queryDoc.forEach(doc=>{
                                                console.log(doc.id,'=>',doc.data().visit_date,doc.data().visitor_uid ,doc.data().confirm_status,doc.data().is_visited);
                                                if( doc.data().visitor_uid == uid ){
                                                    is_correct_schedule = 1
                                                    if(doc.data().visit_date == current_date){
                                                        if(doc.data().is_visited == 1){
                                                            if(doc.data().confirm_status == 2){
                                                                status = 4;
                                                                console.log("in process ", doc.data().uid," ",doc.data().visitor_name);
                                                                name = doc.data().visitor_name;
                                                                
                                                                
                                                                var r_visit_time = doc.data().r_visit_time;
                                            
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
            
            
            
                                                                schedules_db.doc(doc.id).update({
                                                                    r_exit_time: time,
                                                                    is_visited: 2,
                                                                    time_of_stay: time_of_stay,
                                                                }).then(function (){
                                                                    console.log("exit_process is completed successfully");
                                                                    //res.send("success!!");
                                                                }).catch(function(error) {
                                                                    // Handle Errors here.
                                                                    var errorCode = error.code;
                                                                    var errorMessage = error.message;
                                                                    console.log(errorMessage);
                                                                });


                                                            }else{
                                                                status = 3;
                                                            }

                                                        }else{
                                                            status = 2;
                                                        }
                                                    }else{
                                                        status = 1;
                                                    }

                                                }                                                
                                                
                                            });
                                            if(is_correct_schedule == 0){
                                                //no matching uid 일치하는 uid의 스케줄이 존재하지 않음
                                                res.send("0.error");
                                            }else{
                                                if(status == 1){
                                                    //날짜 틀림
                                                    res.send("1.error");
                                                }else if(status == 2){
                                                    //건물 내  방문하지 않아 상태이거나 방문하고 나서 건물 밖으로 나온 상태
                                                    res.send("2.error");
                                                }else if(status == 3){
                                                    //방문 신청이 직원에 의해 승인 되지 않은 상태
                                                    res.send("3.error");
                                                }else if(status == 4){
                                                    //방문 정상 처리 완료
                                                    res.send("4."+name);
                                                }else{
                                                    //status == 0
                                                    res.send("else");
                                                }
                                                
                                            }
                                        }).catch(function(error) {
                                            // Handle Errors here.
                                            var errorCode = error.code;
                                            var errorMessage = error.message;
                                            console.log(errorMessage);
                                            //res.send(errorMessage);
                                        });                        
                                    });  


                                }
                            })
                            .pipe(fs.createWriteStream(localfilename));
                    }
                    
                }
            });
        }else{
            console.log(err)
        }
    });
});

app.use('/', router);

var server = http.createServer(app).listen(app.get('port'), function () {
});
