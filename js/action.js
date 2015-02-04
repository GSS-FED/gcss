$(document).ready(function(){
  // nav switch
  $('.nav-ctrl').on('click', function(){
    $(this).toggleClass('is-active');
    $('.ap-wrap').toggleClass('is-nav-open');
    $('.ap-nav').toggleClass('is-show');
  });

  // remove text node
  $('.removeTextNodes').contents().filter(function() {
    return this.nodeType === 3;
  }).remove();
    // console.log('123');
});

// $(window).load(function() {
//   alert('123');
// });
