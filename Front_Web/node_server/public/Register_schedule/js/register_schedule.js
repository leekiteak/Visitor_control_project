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