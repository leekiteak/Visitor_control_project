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

  $('#pagination').twbsPagination({
    totalPages: 1,
    visiblePages: 2,
    prev: "이전",
    next: "다음",
    first: "<<",
    last: ">>",
    onPageClick: function (event, page) {
      console.log("page: " + page);
    }
  })

  schedule_list();
});

//신규 방문 등록 클릭 시
$(document).on("click", ".btn_register", function () {
  location.href = "/register_schedule";
});

function schedule_list() {
  console.log("in schedule_list");
  db.collection('Schedules').orderBy('visit_date', 'asc').get().then(queryDoc => {
    queryDoc.forEach(scheduleDoc => {
      if(scheduleDoc.data().visitor_uid === uid){
        console.log(scheduleDoc.data());
        var date = scheduleDoc.data().visit_date;
        var staff_name = scheduleDoc.data().staff_name;
        var purpose = scheduleDoc.data().visit_purpose;
  
        $('#schedule_container').append(schedule_box(date,staff_name,purpose));
      }
    });

  });
}

function schedule_box(date,staff_name,purpose){
  var schedule_box = `
        <div class="schedule_box">
            <div class="date">${date}</div>
            <div class="staff_name">${staff_name}</div>
            <div class="purpose">${purpose}</div>
        </div>
    `;
    return schedule_box;
}