var gulp = require('gulp');

var server = require('gulp-webserver');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

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

gulp.task('devServer', ['sass'], function() {
    gulp.src('src')
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
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})

gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android>=4.0']
        }))
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['sass'])
})


gulp.task('dev', ['devServer', 'watch'])