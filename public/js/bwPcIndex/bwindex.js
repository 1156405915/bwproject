$(function() {
    /*头部下载客户端/微信公众号/新浪微博*/
    // $('.tips li').hover(function() {
    //         $(this).find('div').css('display', 'block');
    //     }, function() {
    //         $(this).find('div').css('display', 'none');
    //     })
    /*导航滑块移动*/
    // var navL = $('.navb').offset().left;
    // $('.navb>li').mouseover(function(e) {
    //     var sw = $(this).width() + 2;
    //     var ml = $(this).offset().left - 2 - navL;
    //     $('span.line').css({
    //             'width': sw,
    //             'left': ml,
    //             'transition': 'all 0.2s linear'
    //         })
    //         $(this).children('.insure-type').stop();
    //         $(this).children('.insure-type').css('opacity', '1');
    //         $(this).children('.insure-type').fadeIn();
    // });
    // $('.navb>li').mouseout(function() {
    //     $(this).children('.insure-type').stop();
    //     $(this).children('.insure-type').fadeOut();
    // })
    $('.insure-type p').hover(function() {
        $(this).addClass('insure-red');
    }, function() {
        $(this).removeClass('insure-red');
    });

    /*话题宝精选经过添加阴影效果*/
    $('.pro-list').mouseover(function() {
        $('.pro-list').removeClass('act');
        $(this).addClass('act');
    });
    $('.pro-list').mouseout(function() {
        $('.pro-list').removeClass('act');
        //$(this).addClass('act');
    });
    $('.pro-list a').mouseover(function() {
        $(this).html('立即购买');
    });
    $('.pro-list a').mouseout(function() {
        $(this).html('立即购买');
    });
    //活期理财/定期理财/公募基金选中效果
    $('.ul-pro-list').mouseover(function() {
        $(this).css('background', '#f9f9fc');
    });
    $('.ul-pro-list').mouseout(function() {
        $(this).css('background', '#fff');
    });
    $('.tab-list').mouseover(function() {
        $(this).css('background', '#f9f9fc');
    });
    $('.tab-list').mouseout(function() {
        $(this).css('background', '#fff');
    });
    /*活期理财/定期理财TAB切换*/
    $('.pro-tab li').click(function() {
        $('.tabl').addClass('hidden');
        var num = $(this).index();
        $('.pro-tab li').removeClass('active');
        $(this).addClass('active');
        //alert(num);
        $('.tabl').eq(num).removeClass('hidden');
    });
    //合作机构滚动
    var num = 0;
    var allWidth = $('#in-box a').size() * 210;
    $('#in-box').css('width', allWidth);
    $('.cont-l-box').click(function() {
        num--;
        if (num < 0) {
            num = 0;
            return false;
        } else {
            left = -209 * num;
        }
        $('#in-box').css({ 'left': left, 'transition': 'all .5s linear' })
    });
    $('.cont-r-box').click(function() {
        num++;
        if (num > $('#in-box a').size() - 5) {
            num--;
            return false;
        } else {
            left = -209 * num;
        }
        $('#in-box').css({ 'left': left, 'transition': 'all .5s linear' })
    });
    /*保险产品列表切换*/
    $('.insure-tab li').mouseover(function() {
        var num1 = 3 - $(this).index();
        $('.insure-tab li').removeClass('acts');
        $(this).addClass('acts');
        $('.insure-pro').addClass('hidden');
        $('.insure-pro').eq(num1).removeClass('hidden');
    });
    var navHtml = '<ul class="flex-direction-nav">' +
        '<li><a class="flex-prev" href="javascript:void(0);">Previous</a></li>' +
        '<li><a class="flex-next" href="javascript:void(0);">Next</a></li>' +
        '</ul>';
    //轮播图
    // new Promise(indexImg)
    //     .then(function(body) {
    //         var bnrListHtml = "";
    //         var bnrNum = body.CircleImg.length; //banner个数
    //         var circleImg = body.CircleImg;
    //         // var rowsData = data.rows;
    //         for (var i = 0; i < bnrNum && i < 6; i++) {
    //             if (circleImg[i].link == 'undefined' || circleImg[i].link == null || circleImg[i].link == '') { circleImg[i].link = "javascript:void(0);"; }
    //             bnrListHtml += '<li><a target="_blank" href="' + circleImg[i].link + '" class="banner_img' + (i + 1) + '" style="background: url(' + circleImg[i].pic_path + ') no-repeat center;"></a></li>';
    //         }
    //         $("#scrollBannerUl").html(bnrListHtml);

    //         //banner切换效果
    //         addSliderContral("#scrollBanner", 0);
    //         $("#scrollBanner").append(navHtml + bnrHtml);
    //         $("#silderCtrl0").find("li:first").addClass("active");
    //         var bannerSlider = new Slider($('#scrollBanner'), {
    //             time: 4500,
    //             delay: 400,
    //             event: 'hover',
    //             auto: true,
    //             mode: 'fade',
    //             controller: $('#silderCtrl0'),
    //             activeControllerCls: 'active'
    //         });

    //         $('#scrollBanner .flex-prev').click(function() {
    //             bannerSlider.prev()
    //         });
    //         $('#scrollBanner .flex-next').click(function() {
    //             bannerSlider.next()
    //         });
    //     }).catch(function(err) {
    //         console.info("err:" + err);
    //     });
    addSliderContral("#scrollBanner", 0);
    $("#scrollBanner").append(navHtml + bnrHtml);
    $("#silderCtrl0").find("li:first").addClass("active");
    var bannerSlider = new Slider($('#scrollBanner'), {
        time: 4500,
        delay: 400,
        event: 'hover',
        auto: true,
        mode: 'fade',
        controller: $('#silderCtrl0'),
        activeControllerCls: 'active'
    });

    $('#scrollBanner .flex-prev').click(function() {
        bannerSlider.prev()
    });
    $('#scrollBanner .flex-next').click(function() {
        bannerSlider.next()
    });
    var notice_count = 1;
    var notice_len = $(".notice-in-div .notice-span").length;
    if (notice_len > 1) {
        setInterval(function() {
            noticeRun(notice_count);
            if (notice_count <= (notice_len + 1)) {
                $(".notice-in-div").css("z-index", "99");
                $(".notice-in-div-2").css("z-index", "1");
            } else if (notice_count > (notice_len + 1)) {
                $(".notice-in-div").css("z-index", "1");
                $(".notice-in-div-2").css("z-index", "99");
            }
            notice_count++;
            if (notice_count == (notice_len * 2)) {
                notice_count = 0;
            }

        }, 5000);
    }


})



//公告滚轮
function noticeRun(count) {
    var _count = count;
    var _len = $(".notice-in-div .notice-span").length;
    var _px = $(".notice-in-div").css("top").indexOf("p");
    var _top = $(".notice-in-div").css("top").slice(0, _px);
    var _px2 = $(".notice-in-div-2").css("top").indexOf("p");
    var _top2 = $(".notice-in-div-2").css("top").slice(0, _px2);
    if (count < _len) {
        if (count == 0) {
            $(".notice-in-div-2").animate({ top: (_top2 - 35) + "px" });
        } else {
            $(".notice-in-div-2").css("top", "35px");
        }
        $(".notice-in-div").animate({ top: (_top - 35) + "px" });
    } else if (count == _len) {
        $(".notice-in-div").animate({ top: (_top - 35) + "px" });
        $(".notice-in-div-2").animate({ top: (_top2 - 35) + "px" });
    } else {
        $(".notice-in-div").css("top", "35px");
        $(".notice-in-div-2").animate({ top: (_top2 - 35) + "px" });
    }
}



function noticeRun02() {
    var _px = $(".notice-in-div-2").css("top").indexOf("p");
    var _top = $(".notice-in-div-2").css("top").slice(0, _px);
    $(".notice-in-div-2").css("top", (_top - 35) + "px");
}
//轮播图
// function indexImg(resolve, reject) {
//     $.ajax({
//         url: "/service/indexImg",
//         type: 'POST',
//         async: true
//     }).then(function(body) {
//         if (body != "FAILED") {
//             var obj = JSON.parse(body);
//             resolve(obj);
//         } else {
//             reject("失败");
//         }
//     });
// }

function addSliderContral(obj, index) {
    bnrHtml = "";
    var b_i = $(obj).children().first().children().length;
    for (var i = 0; i < b_i; i++) {
        bnrHtml += "<li><a></a></li>";
    }
    bnrHtml = '<ol id="silderCtrl' + index + '" class="flex-control-nav flex-control-paging">' + bnrHtml + '</ol>';
    return bnrHtml;

}