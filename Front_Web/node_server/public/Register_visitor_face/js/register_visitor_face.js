/*
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

});
*/

function readURL(input) {
  if (input.files && input.files[0]) {
   var reader = new FileReader();
   
   reader.onload = function (e) {
    $('#image_section').attr('src', e.target.result);  
   }
   
   reader.readAsDataURL(input.files[0]);
   }
 }

//사진 선택 클릭 시
$(document).on("change", "#imginput", function () {
  readURL(this);
});

//확인 클릭 시
$(document).on("click", ".btn_register", function () {
  var ref = storage.ref();
  var file = document.querySelector("#imginput").files[0];
  var filetype = file.name.split('.')
  var path = "faces_in_server/"+uid+'.'+filetype[1];
  var metadata = {
    contentType:file.type
  }

  console.log(path);
  var task = ref.child(path).put(file,metadata)

  task.then(function(){
    console.log("upload is completed")
    location.href = "/face_register_process";
  })
});
/*
function register_schedule(date,time,staff_name,visit_purpose,visitor_name,birth_date,phone_number){

  var data = {
    visitor_name: visitor_name,
    staff_name: staff_name,
    visit_date: date,
    visit_time: time,
    visitor_birth_date: birth_date,
    visit_purpose: visit_purpose,
    visitor_phone_number: phone_number,
    visitor_uid: uid,
    confirm_status: 1,
    r_visit_time: "00:00",
    r_exit_time: "00:00",
    is_visited: 0,
    time_of_stay: 0 
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

}*/