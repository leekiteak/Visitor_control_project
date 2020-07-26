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

$(document).on("click", ".btn", function () {
  console.log("btn is clicked");
  location.href = "/schedule_list";
});
/*
$.ajax({
  url: '/schedule_list',
  method: 'GET',
  data: {
    option: purchase_list,
    page: articleid,
    time: $('#run_time').val(),
    payMethod: pay_mode,
    roomID: roomid
  },
  json: true,
  beforeSend: () => {
    $('#upload_loading').append(`
      <div id="loading-background">
        <div class="loading-container">
          <div class="loading"></div>
          <div id="loading-text">loading</div>
        </div>
      </div>
      `)
  },
  success: (result) => {
    console.log(result);
    location.href = "/schedule_list";
  },
  error: (requests, status, error) => {
    $('#loading-background').remove();
    alert(error);
  }
})*/