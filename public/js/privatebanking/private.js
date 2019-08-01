$(function() {
    var navTop = $('.banner').offset().top;
    var jijinTop = $('#jijin').offset().top;
    var ziguanTop = $('#ziguan').offset().top;
    var nav2L = $('.pub-two-cont').offset().left;
    $('.nav-all').click(function() {
        $('html,body').animate({ scrollTop: navTop }, 800);
        var num = $(this).offset().left - nav2L;
        var wid = $(this).width();
        $('.pub-line').css({ 'left': num, 'width': wid });
    });
    $('.nav-jijin').click(function() {
        $('html,body').animate({ scrollTop: jijinTop }, 800);
        var num = $(this).offset().left - nav2L;
        var wid = $(this).width();
        $('.pub-line').css({ 'left': num, 'width': wid });
    });
    $('.nav-ziguan').click(function() {
        $('html,body').animate({ scrollTop: ziguanTop }, 800);
        var num = $(this).offset().left - nav2L;
        var wid = $(this).width();
        $('.pub-line').css({ 'left': num, 'width': wid });
    });
    //资管产品切换
    var num = 0;
    var left;
    $('.next').click(function() {
        num++;
        if (num > 2) {
            num = 2;
            return false;
        }
        left = -num * 837;
        $('.pro_content').css({ 'left': left, 'transition': 'all .5s ease-in-out' });
    })
    $('.prev').click(function() {
        num--;
        if (num < 0) {
            num = 0;
            return false;
        }
        left = -num * 837;
        $('.pro_content').css({ 'left': left, 'transition': 'all .5s ease-in-out' });
    })
})