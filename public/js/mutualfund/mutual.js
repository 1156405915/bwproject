$(function() {
    $('.tz_tab li').click(function() {
        var num = $(this).index();
        $('.tz_tab li').removeClass('slect');
        $(this).addClass('slect');
        $('.zh_typ').addClass('hidden');
        $('.zh_typ').eq(num).removeClass('hidden');
    })
    var navTop = $('.banner').offset().top;
    var wisdomTop = $('#wisdom').offset().top;
    var jingxuanTop = $('#jingxuan').offset().top;
    var touziTop = $('#touzi').offset().top;
    var nav2L = $('.pub-two-cont').offset().left;
    $('.nav-all').click(function() {
        $('html,body').animate({ scrollTop: navTop }, 800);
        var num = $(this).offset().left - nav2L;
        var wid = $(this).width();
        $('.pub-line').css({ 'left': num, 'width': wid });
    });
    $('.nav-jingxuan').click(function() {
        $('html,body').animate({ scrollTop: jingxuanTop }, 800);
        var num = $(this).offset().left - nav2L;
        var wid = $(this).width();
        $('.pub-line').css({ 'left': num, 'width': wid });
    });
    $('.nav-touzi').click(function() {
        $('html,body').animate({ scrollTop: touziTop }, 800);
        var num = $(this).offset().left - nav2L;
        var wid = $(this).width();
        $('.pub-line').css({ 'left': num, 'width': wid });
    });
    $('.nav-wisdom').click(function() {
        $('html,body').animate({ scrollTop: wisdomTop }, 800);
        var num = $(this).offset().left - nav2L;
        var wid = $(this).width();
        $('.pub-line').css({ 'left': num, 'width': wid });
    });
    //投资组合基金列表换色
    $('.tz_list').mouseover(function() {
        $(this).css('background', '#F9F9FC');
    })
    $('.tz_list').mouseout(function() {
            $(this).css('background', '#fff');
        })
        //精选基金切换
    $('.small_tab li').click(function() {
        $('.small_tab li').removeClass('act');
        var num = $(this).index();
        $(this).addClass('act');
        $('.pro').addClass('hidden');
        $('.pro').eq(num).removeClass('hidden');
    })
})