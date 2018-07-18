var gulp = require('gulp');

var server = require('gulp-webserver');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var url = require('url');

var fs = require('fs');

var path = require('path');

var mock = require('./mock');

var querystring = require('querystring');

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
                if (/\/api/g.test(pathname)) {
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