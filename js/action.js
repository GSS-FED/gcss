$(document).ready(function(){
  // // nav action
  // $('.nav>.nav-item>a').click(function(){
  //   if($('.nav>.nav-item').hasClass('has-child')) {
  //     $('sub-nav').addClass('is-show');
  //   }
  // });

  // nav switch
  $('.nav-ctrl').bind('click', function(){
     $(this).toggleClass('is-active');
     $('.ap-wrap').toggleClass('is-nav-open');
     $('.ap-nav').toggleClass('is-show');
  })

  // remove text node
  $('.removeTextNodes').contents().filter(function() {
    return this.nodeType === 3;
  }).remove();
});
