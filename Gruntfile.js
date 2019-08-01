module.exports = function(grunt) {
  var time=new Date().getTime();
  // 项目配置
  grunt.initConfig({
    // 获取package.json的配置信息
    pkg: grunt.file.readJSON('package.json'),
    //压缩JS
    uglify: {
      options: {
        // banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n', //给压缩文件添加banner
        preserveComments: 'false', //是否删除注释，（all:不删除注释 ,false:全部删除）
        // footer: '\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */', //添加footer
        beautify: {
          //防止中文乱码
          ascii_only: true
        }
      },
      my_target: {
        files: [{
          expand: true, //expand：设置为true打开以下选项
          cwd: 'public', //cwd：所有src指定的文件相对于这个属性指定的路径
          src: ['js/**/*.js'], // src:需要压缩的js文件(要匹配的路径，相对与cwd)
          dest: 'publicmin/' //生成的文件所在路径
          // rename: function(dest, src) { //一个函数，接受匹配到的文件名，和匹配的目标位置，返回一个新的目标路径
          //   var folder = src.substring(0, src.lastIndexOf('/'));
          //   var filename = src.substring(src.lastIndexOf('/'), src.length);
          //   filename = filename.substring(0, filename.lastIndexOf('.'));
          //   var fileresult = dest + folder + filename + '.js'; //为生成文件添加min.js后缀
          //   grunt.log.writeln("现处理文件" + src + ",处理后文件" + fileresult);
          //   return fileresult;
          // }
        }]
      }
    },
    //压缩CSS
    cssmin: {
      options: {
        // banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        beautify: {
          //防止中文乱码
          ascii_only: true
        },
        preserveComments: 'all'
      },
      my_target: {
        files: [{
          expand: true,
          cwd: 'public',
          src: ['css/**/*.css'],
          dest: 'publicmin/'
          // rename: function(dest, src) {
          //   var folder = src.substring(0, src.lastIndexOf('/'));
          //   var filename = src.substring(src.lastIndexOf('/'), src.length);
          //   filename = filename.substring(0, filename.lastIndexOf('.'));
          //   var fileresult = dest + folder + filename + '.css';
          //   grunt.log.writeln("现处理文件" + src + ",处理后文件" + fileresult);
          //   return fileresult;
          // }
        }]
      }
    },
    imagemin: {
      /* 压缩图片大小 */
      dist: {
        options: {
          optimizationLevel: 3 //定义 PNG 图片优化水平
        },
        files: [{
          expand: true,
          cwd: 'public',
          src: ['images/banner/*.{png,jpg,jpeg,JPG,PNG,JPEG}', 'images/bw-activity/*.{png,jpg,jpeg,JPG,PNG,JPEG}', 'images/bw-app/*.{png,jpg,jpeg,JPG,PNG,JPEG}'], // 优化 images 目录下所有 png/jpg/jpeg 图片
          dest: 'publicmin/' // 优化后的图片保存位置，并且不作提示
        }]
      }
    },
    concat: { //合并js
      domop: {
        src: ['js/bwapp.js', 'js/page.js'],
        dest: 'min/domop.js'
      }
    },
    replace: {
      dist: {
        options: {
          patterns: [{
            match: /\.js"/g,
            replacement: '.js?v=' + time + '"'
          }, {
            match: /(\.js\?v=)\d*"/g,
            replacement: '.js?v=' + time + '"'
          }, {
            match: /\.css"/g,
            replacement: '.css?v=' + time + '"'
          }, {
            match: /(\.css\?v=)\d*"/g,
            replacement: '.css?v=' + time + '"'
          }]
        },
        files: [{
          expand: true,
          // cwd: 'bigtry/dist/',
          src: ['views/**/*.ejs','views/*.ejs'],
          dest: './'
        }]
      }
    },
    postcss: {
            options: {
                map: false,
                expand: true,                
                processors: [
                    require('autoprefixer')({
                        browsers: ['> 1%', 'last 2 versions', 'Firefox >1','Android > 4','iOS >8','ie >7','Safari >1','ExplorerMobile>1','UCAndroid>1']
                    })
                ]
            },
            dist: {
                src: 'public/css/**/*.css'
            }
        }
  });
  // 加载插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-postcss');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-imagemin');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // 默认任务
  // grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', ['postcss','cssmin', 'uglify']);
  // grunt.registerTask('default', ['postcss']);
  // grunt.loadNpmTasks('grunt-contrib-imagemin');]);
  // grunt.registerTask('minb', ['uglify:my_target']);
  //grunt.registerTask('default', ['imagemin']);

}