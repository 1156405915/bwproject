$(function() {
    //判断activeMenu
    try {
        doswitch(activeMenu);
    } catch (e) {
        if (getQueryString("activeMenu")) {
            doswitch(getQueryString("activeMenu"));
        } else if ($.cookie('activeMenu')) {
            doswitch($.cookie('activeMenu'));
        } else {
            doNav("menu0");
        }
    }
    /*我的账户列表*/
    $('.my-pro').mouseover(function(e) {
        e.stopPropagation();
        $(this).children('i').removeClass('arrow-down');
        $(this).addClass("noradius");
        $(this).addClass("userCenter-hover");
    });
    $('.my-pro').mouseout(function(e) {
        e.stopPropagation();
        $(this).children('i').addClass('arrow-down');
        $(this).removeClass("noradius");
        $(this).removeClass("userCenter-hover");
    });
    /*用户资金显示/隐藏*/
    var all = $('.total-mon-text').html();
    var use = $('.total-use-text').html();
    $('.eye').on("click", function(e) {
        e.stopPropagation();
        if ($(this).hasClass('xs')) {
            $(this).removeClass('xs');
            $('.total-mon-text').html(all);
            $('.total-use-text').html(use);
        } else {
            $(this).addClass('xs');
            $('.total-mon-text').html('******');
            $('.total-use-text').html('******');
        }
    })
    $(".list").on("click", ".btn1", function() {
        window.location.href = "/login"
    })
    $(".list").on("click", ".btn1-reg", function() {
        window.location.href = "https://www.bundwealth.com/BundTrade/adm.login.register.action"
    })
    $(".list").on("click", ".los", function() {
            window.location.href = "https://www.bundwealth.com/BundTrade/adm.login.forgetPassword.action"
        })
        /*app下载*/
    $('.dow-a,.dow-w,.dow-s').mouseover(function() {
        $(this).find('div').removeClass('hidden');
    });
    $('.dow-a,.dow-w,.dow-s').mouseout(function() {
        $(this).find('div').addClass('hidden');
    });
    /*置顶按钮*/
    $(document).on('scroll', function() {
        var scrollTop = $(window, 'body').scrollTop();
        /*console.log(scrollTop)*/
        if (scrollTop > 650) {
            $('.fl_back').fadeIn();
        } else {
            $('.fl_back').fadeOut();
        }
    });
    $('.fl_back').click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 800);
    });
    //头部导航ico延时切换
    $('.kefu').hoverDelay({
        hoverDuring: 200,
        outDuring: 200,
        hoverEvent: function() {
            $(".kefu i").css({ 'background-position': '-80px -85px', 'transition': 'all .5s linear' });
        },
        outEvent: function() {
            $(".kefu i").css({ 'background-position': '-80px -105px', 'transition': 'all .5s linear' });
        }
    })
    $('.qq').hoverDelay({
        hoverDuring: 200,
        outDuring: 200,
        hoverEvent: function() {
            $(".qq i").css({ 'background-position': '-100px -85px', 'transition': 'all .5s linear' });
        },
        outEvent: function() {
            $(".qq i").css({ 'background-position': '-100px -105px', 'transition': 'all .5s linear' });
        }
    })
    $('.sina').hoverDelay({
        hoverDuring: 200,
        outDuring: 200,
        hoverEvent: function() {
            $(".sina i").css({ 'background-position': '-40px -85px', 'transition': 'all .5s linear' });
            $('.sina').find('div').css('display', 'block');
        },
        outEvent: function() {
            $(".sina i").css({ 'background-position': '-40px -105px', 'transition': 'all .5s linear' });
            $('.sina').find('div').css('display', 'none');
        }
    })
    $('.weixin').hoverDelay({
        hoverDuring: 200,
        outDuring: 200,
        hoverEvent: function() {
            $(".weixin i").css({ 'background-position': '-20px -85px', 'transition': 'all .5s linear' });
            $('.weixin').find('div').css('display', 'block');
        },
        outEvent: function() {
            $(".weixin i").css({ 'background-position': '-20px -105px', 'transition': 'all .5s linear' });
            $('.weixin').find('div').css('display', 'none');
        }
    })
    $('.soft').hoverDelay({
        hoverDuring: 200,
        outDuring: 200,
        hoverEvent: function() {
            $(".soft i").css({ 'background-position': '0 -85px', 'transition': 'all .5s linear' });
            $('.soft').find('div').css('display', 'block');
        },
        outEvent: function() {
            $(".soft i").css({ 'background-position': '0 -105px', 'transition': 'all .5s linear' });
            $('.soft').find('div').css('display', 'none');
        }
    });
    // 侧边hover效果
    $(".sidebar .fl_wx").hoverDelay({
        hoverDuring: 200,
        outDuring: 200,
        hoverEvent: function() {
            $(".sidebar .fl_hover_wrap").removeClass("er").css({
                "width": "163px"
            });
            $(".sidebar .fl_hover_wx").find("span").html("关注微信公众账号");
            $(".sidebar .fl_hover_wx").stop(true, false).animate({
                "left": "0px"
            }, 500);
        },
        outEvent: function() {

            $(".sidebar .fl_hover_wx").stop(true, false).animate({
                "left": "163px"
            }, 500, function() {
                $(".sidebar .fl_hover_wrap").css({
                    "width": "0px"
                });
            });

        }
    });
    $(".sidebar .fl_er").hoverDelay({
        hoverDuring: 200,
        outDuring: 200,
        hoverEvent: function() {
            $(".sidebar .fl_hover_wrap").addClass("er").css({
                "width": "163px"
            });
            $(".sidebar .fl_hover_wx").find("span").html("扫一扫手机下载APP");
            $(".sidebar .fl_wx").css({
                "z-index": 8
            });
            $(".sidebar .fl_hover_wx").stop(true, false).animate({
                "left": "0px"
            }, 500)
        },
        outEvent: function() {

            $(".sidebar .fl_wx").css({
                "z-index": 12
            });
            $(".sidebar .fl_hover_wx").stop(true, false).animate({
                "left": "163px"
            }, 500, function() {
                $(".sidebar .fl_hover_wrap").css({
                    "width": "0px"
                });
            });
        }
    });
})

//公共导航标签跳转
$(".navb li a").on("click", function(e) {
    e.preventDefault();
    $.cookie('activeMenu', $(this).attr("id"), { path: "/" });
    var _href = $(this).attr('href');
    window.location.href = _href;
});
$(".menuxhref").on("click", function(e) {
    e.preventDefault();
    $.cookie('activeMenu', 'menux', { path: "/" });
    var _href = $(this).attr('href');
    window.location.href = _href;
});
//用户资料
function getUserInfo(resolve, reject) {
    $.ajax({
        url: "/service/getUserInfo",
        type: 'POST',
        data: { cusCode: cusCode }, //"cusCode",
        async: true
    }).then(function(body) {
        if (body != "FAILED" && body != "connet-error") {
            var obj = JSON.parse(body);
            resolve(obj);
        } else {
            reject("失败");
        }
    });
}

function addSliderContral(obj, index) {
    bnrHtml = "";
    var b_i = $(obj).children().first().children().length;
    for (var i = 0; i < b_i; i++) {
        bnrHtml += "<li><a></a></li>";
    }
    bnrHtml = '<ol id="silderCtrl' + index + '" class="flex-control-nav flex-control-paging">' + bnrHtml + '</ol>';
    return bnrHtml;

}
// 判断是否登录
if (haslogin == "done") {
    new Promise(getUserInfo)
        .then(function(body) {})
}
//导航栏锚点控制
//首页	menu0
//活期	menu5
//定期	menu1
//保险	menu2
//公墓基金	menu3
//高端理财	menu4
//转让专区	menu6
//新手专享	menu7
//我的账户	menux
function doNav(_this) {
    var navL = $('.navb').offset().left;
    if (_this != "menux") {
        var sw = $("#" + _this).width() + 2;
        var ml = $("#" + _this).offset().left - 2 - navL;
        $('span.line').css({
            'width': sw,
            'left': ml,
            'display': 'block'
        });
    }
    $.cookie('activeMenu', _this, { path: '/' });
};

function doswitch(flag) {
    switch (flag) {
        case "menu0":
            doNav("menu0");
            break;
        case "menu1":
            doNav("menu1");
            break;
        case "menu2":
            doNav("menu2");
            break;
        case "menu3":
            doNav("menu3");
            break;
        case "menu4":
            doNav("menu4");
            break;
        case "menu5":
            doNav("menu5");
            break;
        case "menu6":
            doNav("menu6");
            break;
        case "menu7":
            doNav("menu7");
            break;
        case "menux":
            doNav("menux");
            break;
        default:
            doNav("menu0");
            break;
    }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
/**
 * slider插件可悬停控制
 */
$(function($, window, document, undefined) {

    Slider = function(container, options) {
        /*
        options = {
            auto: true,
            time: 3000,
            event: 'hover' | 'click',
            mode: 'slide | fade',
            controller: $(),
            activeControllerCls: 'className',
            exchangeEnd: $.noop
        }
        */

        "use strict"; //stirct mode not support by IE9-

        if (!container) return;

        var options = options || {},
            currentIndex = 0,
            cls = options.activeControllerCls,
            delay = options.delay,
            isAuto = options.auto,
            controller = options.controller,
            event = options.event,
            interval,
            slidesWrapper = container.children().first(),
            slides = slidesWrapper.children(),
            length = slides.length,
            childWidth = container.width(),
            totalWidth = childWidth * slides.length;

        function init() {
            var controlItem = controller.children();

            mode();

            event == 'hover' ? controlItem.mouseover(function() {
                stop();
                var index = $(this).index();

                play(index, options.mode);
            }).mouseout(function() {
                isAuto && autoPlay();
            }) : controlItem.click(function() {
                stop();
                var index = $(this).index();

                play(index, options.mode);
                isAuto && autoPlay();
            });

            isAuto && autoPlay();
        }

        //animate mode
        function mode() {
            var wrapper = container.children().first();

            options.mode == 'slide' ? wrapper.width(totalWidth) : wrapper.children().css({
                    'position': 'absolute',
                    'left': 0,
                    'top': 0
                })
                .first().siblings().hide();
        }

        //auto play
        function autoPlay() {
            interval = setInterval(function() {
                triggerPlay(currentIndex);
            }, options.time);
        }

        //trigger play
        function triggerPlay(cIndex) {
            var index;

            (cIndex == length - 1) ? index = 0: index = cIndex + 1;
            play(index, options.mode);
        }

        //play
        function play(index, mode) {
            slidesWrapper.stop(true, true);
            slides.stop(true, true);

            mode == 'slide' ? (function() {
                if (index > currentIndex) {
                    slidesWrapper.animate({
                        left: '-=' + Math.abs(index - currentIndex) * childWidth + 'px'
                    }, delay);
                } else if (index < currentIndex) {
                    slidesWrapper.animate({
                        left: '+=' + Math.abs(index - currentIndex) * childWidth + 'px'
                    }, delay);
                } else {
                    return;
                }
            })() : (function() {
                if (slidesWrapper.children(':visible').index() == index) return;
                slidesWrapper.children().fadeOut(delay).eq(index).fadeIn(delay);
            })();

            try {
                controller.children('.' + cls).removeClass(cls);
                controller.children().eq(index).addClass(cls);
            } catch (e) {}

            currentIndex = index;

            options.exchangeEnd && typeof options.exchangeEnd == 'function' && options.exchangeEnd.call(this, currentIndex);
        }

        //stop
        function stop() {
            clearInterval(interval);
        }

        //prev frame
        function prev() {
            stop();

            currentIndex == 0 ? triggerPlay(length - 2) : triggerPlay(currentIndex - 2);

            isAuto && autoPlay();
        }

        //next frame
        function next() {
            stop();

            currentIndex == length - 1 ? triggerPlay(-1) : triggerPlay(currentIndex);

            isAuto && autoPlay();
        }

        //init
        init();

        //expose the Slider API
        return {
            prev: function() {
                prev();
            },
            next: function() {
                next();
            }
        }
    };

}(jQuery, window, document));

(function($) {
    $.fn.hoverDelay = function(options) {
        var defaults = {
            hoverDuring: 200,
            outDuring: 200,
            hoverEvent: function() {
                $.noop();
            },
            outEvent: function() {
                $.noop();
            }
        };
        var sets = $.extend(defaults, options || {});
        var hoverTimer, outTimer;
        return $(this).each(function() {
            $(this).hover(function() {
                clearTimeout(outTimer);
                hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
            }, function() {
                clearTimeout(hoverTimer);
                outTimer = setTimeout(sets.outEvent, sets.outDuring);
            });
        });
    }
})(jQuery);

/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
        } catch (e) {
            return;
        }

        try {
            // If we can't parse the cookie, ignore it, it's unusable.
            return config.json ? JSON.parse(s) : s;
        } catch (e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function(key, value, options) {

        // Write
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires,
                    t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function(key, options) {
        if ($.cookie(key) !== undefined) {
            // Must not alter options, thus extending a fresh object...
            $.cookie(key, '', $.extend({}, options, { expires: -1 }));
            return true;
        }
        return false;
    };

}));