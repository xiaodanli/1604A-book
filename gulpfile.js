var gulp = require('gulp');

var server = require('gulp-webserver');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var clean = require('gulp-clean-css');

var uglify = require('gulp-uglify');

var url = require('url');

var fs = require('fs');

var path = require('path');

var mock = require('./mock');

var querystring = require('querystring');

var userList = [{
        username: 'lixd',
        pwd: 123
    },
    {
        username: 'xty',
        pwd: 456
    },
    {
        username: 'qwl',
        pwd: 789
    }
]

//开发环境 ---- 起服务
gulp.task('devServer', ['sass'], function() {
    serverFun('src');
})

function serverFun(serverPath) {
    return gulp.src(serverPath)
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;

                if (pathname === '/favicon.ico') {
                    return false
                }
                // /api/recommend?pagenum=1   
                //pathname /api/recommend 
                console.log(querystring.unescape(req.url))
                if (pathname === '/api/login') {
                    var arr = [];

                    req.on('data', function(chunk) {
                        arr.push(chunk);
                    })

                    req.on('end', function() {
                        var params = querystring.parse(Buffer.concat(arr).toString());
                        console.log(params);
                        var isHas = userList.some(function(item) {
                            return item.username == params.username && item.pwd == params.pwd
                        })

                        if (isHas) {
                            res.end(JSON.stringify({ code: 1, msg: '用户登录成功' }))
                        } else {
                            res.end(JSON.stringify({ code: 0, msg: '登录失败' }))
                        }
                    })
                } else if (/\/api/g.test(pathname)) {
                    // /api/index
                    res.end(JSON.stringify({ code: 1, data: mock(querystring.unescape(req.url)) }))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, serverPath, pathname)))
                }
            }
        }))
}
//开发环境 ---- css
gulp.task('sass', function() {
    css('./src/css');
})

function css(cssPath) {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android>=4.0']
        }))
        .pipe(clean())
        .pipe(gulp.dest(cssPath))
}

gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['sass'])
})

//开发环境
gulp.task('dev', ['devServer', 'watch'])

//打包上线--- css

gulp.task('buildCss', function() {
    css('./build/css');
})

gulp.task('copyCss', function() {
    gulp.src('./src/css/swiper-3.4.2.min.css')
        .pipe(gulp.dest('./build/css'))
})

gulp.task('copyImg', function() {
    gulp.src('./src/imgs/*.{png,jpg}')
        .pipe(gulp.dest('./build/imgs'))
})

gulp.task('buildJs', function() {
    gulp.src('./src/js/{app,common}/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
})

gulp.task('copyJs', function() {
    gulp.src(['./src/js/**/*.js', '!./src/js/{app,common}/*.js'])
        .pipe(gulp.dest('./build/js'))
})

gulp.task('buildHtml', function() {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./build'))
})

//上线

gulp.task('build', ['buildCss', 'copyCss', 'copyImg', 'buildJs', 'copyJs', 'buildHtml'])

gulp.task('buildServer', function() {
    serverFun('build');
})