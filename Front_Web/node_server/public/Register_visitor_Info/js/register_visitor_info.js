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
//완료 클릭 시
$(document).on("click", ".btn_register", function () {
  var name = $("#name").val();
  var date = $("#date").val();
  var phone_number = $("#phone_number").val();
  var id = $("#id").val();
  var password = $("#password").val();

  console.log(typeof(date))

  if (name.length == 0 || date.length == 0 || phone_number.length == 0 ||id.length == 0 || password.length == 0) {
    alert("정보를 입력 해주세요.");
  }else{
    console.log(name + " : " + date + " : " + phone_number+ " : " +id+ " : " +password);
    register_visitor(id,password,name,date,phone_number);
  }
});


function register_visitor(id, password,name,birth_date,phone_number) {
  firebase.auth().createUserWithEmailAndPassword(id, password).then(function () {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var email = user.email;
        var uid = user.uid;

        var data = {
          name: name,
          birth_date: birth_date,
          phone_number: phone_number,
          face: false
        };

        db.collection('Visitors').doc(uid).set(data).then(function (){
          console.log("c-bal");

          $.ajax({
            url: '/log_in_process',
            method: 'POST',
            data: {
              email: email,
              uid: uid
            },
            json: true,
            success: (result) => {
              alert("정상적으로 등록되셨습니다.");
  
              //이름, 생년월일, 전화번호 데이터베이스에 저장시키기
  
              location.href = "/schedule_list";
            },
            error: (requests, status, error) => {
              alert(error);
            }
          })
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });

      } else {
        console.log("not a user");
      }
    });
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    
    console.log(error);
  });

}