$(document).ready(function () {
  var placeholderTarget = $('.textbox input[type="text"], .textbox input[type="password"]');

  //포커스시
  placeholderTarget.on('focus', function () {
    $(this).siblings('label').fadeOut('fast');
  });

  //포커스아웃시
  placeholderTarget.on('focusout', function () {
    if ($(this).val() == '') {
      $(this).siblings('label').fadeIn('fast');
    }
  });
});

//로그인 클릭 시
$(document).on("click", ".btn_left", function () {
  var id = $("#idea").val();
  var password = $("#password").val();
  input_log(id,password);
});

// 메시지 전송
$(document).on("keyup", "#password", function () {
  if (event.keyCode === 13) {
    var id = $("#idea").val();
    var password = $("#password").val();
    input_log(id,password);
  }
});

function input_log(id,password){
  if (id.length == 0 && password.length == 0) {
    alert("아이디 및 패스워드를 입력해주세요.");
  } else if(id.length == 0){
    alert("아이디를 입력해주세요.");
  }else if(password.length == 0){
    alert("패스워드를 입력해주세요.");
  }else{
    log_in(id, password);
  }
}

function login_process(email, uid, is_visitor){
  $.ajax({
    url: '/log_in_process',
    method: 'POST',
    data: {
      email: email,
      uid: uid,
      is_visitor: is_visitor
    },
    json: true,
    success: (result) => {
      console.log(result);
      location.href = "/schedule_list";
    },
    error: (requests, status, error) => {
      alert(error);
    }
  });
}

//회원가입 클릭 시
$(document).on("click", ".btn_right", function () {
  location.href = "/register_visitor_info";
});

function log_in(id, password) {
  firebase.auth().signInWithEmailAndPassword(id, password).then(function(){
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var email = user.email;
        var uid = user.uid;

        db.collection('Staffs').doc(uid).get().then(queryDoc => {

          if(!queryDoc.exists){
            console.log("visitor");
            login_process(email,uid,"true");
          }else{
            console.log("staff");
            login_process(email,uid,"false");
          }
      
        });

      } else {
        console.log("회원 가입 후 이용하시기 바랍니다.");
      }
    });
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
}