$(document).ready(function() {
    var placeholderTarget = $('.textbox input[type="text"], .textbox input[type="password"]');
    //포커스시
    placeholderTarget.on('focus', function(){
      $(this).siblings('label').fadeOut('fast');
    });
  
    //포커스아웃시
    placeholderTarget.on('focusout', function(){
      if($(this).val() == ''){
        $(this).siblings('label').fadeIn('fast');
      }
    });

    $("#visitor_name").val(name);
    $("#birth_date").val(birth_date);
    $("#phone_number").val(phone_number);
  });
//확인 클릭 시
$(document).on("click", ".btn_register", function () {
  var date = $("#date").val();
  var time = $("#time").val();
  var staff_name = $("#staff_name").val();
  var visit_purpose = $("#visit_purpose").val();

  if (date.length == 0 || time.length == 0 || staff_name.length == 0 ||visit_purpose.length == 0) {
    alert("정보를 입력 해주세요.");
  }else{
    console.log(date + " : " + time + " : " + staff_name+ " : " +visit_purpose);

    register_schedule(date,time,staff_name,visit_purpose,name,birth_date,phone_number);
  }

  //location.href = "/schedule_list";
});

function register_schedule(date,time,staff_name,visit_purpose,visitor_name,birth_date,phone_number){

  var data = {
    visitor_name: visitor_name,
    staff_name: staff_name,
    visit_date: date,
    visit_time: time,
    visitor_birth_date: birth_date,
    visit_purpose: visit_purpose,
    visitor_phone_number: phone_number,
    visitor_uid: uid
  };

  db.collection('Schedules').add(data).then(function (){
    console.log("c-bal");
    location.href = "/schedule_list";

  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });

}