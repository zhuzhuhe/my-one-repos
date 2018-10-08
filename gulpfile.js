var gulp = require('gulp');
var gulpLess = require('gulp-less');
var mincss = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var connect = require('gulp-connect');

var paths = {
    scripts: './src/js/*.js',
    less: './src/css/*.less',
    htmls: './src/index.html',
    htmls1: './src/htmls/*.html',
    css: './dist/css',
    js: './dist/js',
    pages: './dist/pages',
    page1: './dist',
};

// 定义一个编译less文件的任务
gulp.task('less', function(){
    // 获取less文件
    gulp.src(paths.less)
        .pipe(gulpLess())
        .pipe(mincss())
        .pipe(gulp.dest(paths.css))
        .pipe(connect.reload());
});

// 定义一个处理JS文件的任务
gulp.task('script', function(){
    gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(gulp.dest(paths.js))
        .pipe(connect.reload());
})

//定义一个处理HTML文件的任务
gulp.task('html1', function () {
    gulp.src(paths.htmls)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.page1))
        .pipe(connect.reload());
});
//定义一个处理HTML文件的任务
gulp.task('html', function () {
    gulp.src(paths.htmls1)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.pages))
        .pipe(connect.reload());
});

// 定义监视资源文件改变的任务
gulp.task('watch',['less','script','html',"html1"], function(){

    gulp.watch(paths.htmls1, ['html']);
    gulp.watch(paths.htmls, ['html1']);
    gulp.watch(paths.less, ['less']);
    gulp.watch(paths.scripts, ['script']);
});

// 定义开启服务的任务
gulp.task('serve', function(){
    connect.server({
        root: 'dist',
        port: 8080,
        livereload: true,
        index: 'index.html'
    });
});

// 定义默认的任务
gulp.task('default', ['serve', 'watch']);






