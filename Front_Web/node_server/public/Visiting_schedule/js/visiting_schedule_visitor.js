$(document).ready(function () {

  schedule_list();
});

//로그아웃 클릭 시
$(document).on("click", ".logout", function () {
  location.href = "/log_out_process";
});

//사진등록 클릭 시
$(document).on("click", ".register_pic", function () {
  location.href = "/register_visitor_face";
});

//신규 방문 등록 클릭 시
$(document).on("click", ".btn_register", function () {
  location.href = "/register_schedule";
});

//방문 일정 수정 클릭 시
function modify_clicked(doc_id) {

  console.log(doc_id + "방문 수정 클릭");
  location.href = "/modify_schedule?doc_id="+doc_id;
}

//방문 일정 취소 클릭 시
function cancel_clicked(doc_id) {
  console.log(doc_id + "방문 취소 클릭");
  db.collection('Schedules').doc(doc_id).delete().then(function () {
    console.log("방문 일정 취소 클릭 완료, 방문 일정 데이터 베이스 삭제됨");
    location.href = "/schedule_list";
  });
}

function schedule_list() {
  console.log("in schedule_list_visitor");
  var schedule_list = [];

  db.collection('Schedules').orderBy('visit_date', 'asc').get().then(queryDoc => {
    queryDoc.forEach(scheduleDoc => {
      if (scheduleDoc.data().visitor_uid === uid) {
        schedule_list.push([scheduleDoc.data(),scheduleDoc.id]);
      }
    });

    var totalpages = (schedule_list.length - 1) / 5 + 1;
    if (totalpages >= 3) {
      var visiblePages = 3;
    }

    $('#pagination').twbsPagination({
      totalPages: totalpages,
      visiblePages: visiblePages,
      prev: "이전",
      next: "다음",
      first: "<<",
      last: ">>",
      onPageClick: function (event, page) {
        $('.schedule_box').eq(0).parent().html('');
        onclick_pagination(schedule_list, page);
      }
    });
  });
}

function schedule_box(date, staff_name, purpose, confirm_status,doc_id) {
  var status;
  if (confirm_status == 1) {
    status = `<div class="status_container">
    <button class="modify" onclick="modify_clicked('${doc_id}')">수정</button>
    <button class="cancel" onclick="cancel_clicked('${doc_id}')">취소</button>
    </div>`;
  } else if (confirm_status == 2) {
    status = `<div class="confirm_status">승인 완료됨</div>`;
  } else if (confirm_status == 3) {
    status = `<div class="confirm_status">승인 거절됨</div>`;
  }

  var schedule_box = `
        <div class="schedule_box">
            <div class="date">${date}</div>
            <div class="staff_name">${staff_name}</div>
            <div class="purpose">${purpose}</div>
            ${status}
        </div>
    `;
  return schedule_box;
}

function onclick_pagination(schedule_list, page) {
  var start_position = (page - 1)*5;

  if(start_position + 5 <= schedule_list.length){
    for (var i = start_position; i < start_position + 5; i++) {
      var date = schedule_list[i][0].visit_date;
      var staff_name = schedule_list[i][0].staff_name;
      var purpose = schedule_list[i][0].visit_purpose;
      var confirm_status = schedule_list[i][0].confirm_status;
      var doc_id = schedule_list[i][1];
  
      $('#schedule_container').append(schedule_box(date, staff_name, purpose, confirm_status,doc_id));
    }
  }else{
    for (var i = start_position; i < schedule_list.length; i++) {
      var date = schedule_list[i][0].visit_date;
      var staff_name = schedule_list[i][0].staff_name;
      var purpose = schedule_list[i][0].visit_purpose;
      var confirm_status = schedule_list[i][0].confirm_status;
      var doc_id = schedule_list[i][1];
  
      $('#schedule_container').append(schedule_box(date, staff_name, purpose, confirm_status,doc_id));
    }
  }
}