$(function() {
    var navTop = $('.banner').offset().top;
    var htbTop = $('#htb').offset().top;
    var smallTop = $('#small').offset().top;
    $('.nav-all').click(function() {
        $('html,body').animate({ scrollTop: navTop }, 800);
    });
    $('.nav-htb').click(function() {
        $('html,body').animate({ scrollTop: htbTop }, 800);
    });
    $('.nav-small').click(function() {
        $('html,body').animate({ scrollTop: smallTop }, 800);
    });
})