$(function() {
    //投资组合基金列表换色
    $('.prolist').mouseover(function() {
        $(this).css('background', '#F9F9FC');
    })
    $('.prolist').mouseout(function() {
        $(this).css('background', '#fff');
    })
})