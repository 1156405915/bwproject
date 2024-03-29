var captchapng = require('captchapng');

var z = require('zengming');
var BMP24 = z.BMP24;
var font = z.Font;

exports.getCaptcha=function(){
	var result=new Array();
	var num=parseInt(Math.random()*9000+1000);

//  var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZ3456789";
//  var str = '';
//  for(var i=0; i<5; i++){
//      str += p.charAt(Math.random() * p.length |0);
//  }

	var p = new captchapng(80,30,num); // width,height,numeric captcha
    p.color(255, 255, 255, 255);  // First color: background (red, green, blue, alpha)
    p.color(255, 106, 102, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    result.push(num);
    result.push(imgbase64);
    return result;
}


exports.makeCapcha=function() {
    var result=new Array();
    var img = new BMP24(100, 40);
    img.drawCircle(11, 11, 10, z.rand(0, 0xffffff));
    img.drawRect(0, 0, img.w-1, img.h-1, z.rand(0, 0xffffff));
    img.fillRect(53, 15, 88, 35, z.rand(0, 0xffffff));
    img.drawLine(50, 6, 3, 60, z.rand(0, 0xffffff));
    //return img;

    //画曲线
    var w=img.w/2;
    var h=img.h;
    var color = z.rand(0, 0xffffff);
    var y1=z.rand(-5,5); //Y轴位置调整
    var w2=z.rand(10,15); //数值越小频率越高
    var h3=z.rand(4,6); //数值越小幅度越大
    var bl = z.rand(1,5);
    for(var i=-w; i<w; i+=0.1) {
        var y = Math.floor(h/h3*Math.sin(i/w2)+h/2+y1);
        var x = Math.floor(i+w);
        for(var j=0; j<bl; j++){
            img.drawPoint(x, y+j, color);
        }
    }

    var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZ3456789";
    var str = '';
    for(var i=0; i<5; i++){
        str += p.charAt(Math.random() * p.length |0);
    }

    var fonts = [font.font8x16, font.font12x24, font.font16x32];
    var x = 15, y=8;
    for(var i=0; i<str.length; i++){
        var f = fonts[Math.random() * fonts.length |0];
        y = 8 + z.rand(-10, 10);
        img.drawChar(str[i], x, y, f, z.rand(0, 0xffffff));
        x += f.w + z.rand(2, 8);
    }
    result.push(str);
    result.push(img._data);
    return result;
}


// console.info(this.makeCapcha());