const gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    server = require('browser-sync').create(),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    tinypng = require('gulp-tinypng'),
    prefixer = require('gulp-autoprefixer');

gulp.task('pug', function() {
    return gulp.src('./src/pug/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./build'))
        .on('end', server.reload)
});

gulp.task('sass', function() {
    return gulp.src(['./src/static/scss/main.scss', './node_modules/bootstrap/scss/bootstrap.scss', ])
        .pipe(sass())
        .pipe(prefixer({
            overrideBrowserslist: ['last 10 versions']
        }))
        .pipe(concat('all.css'))
        .pipe(csso())
        .pipe(gulp.dest('./build/css'))
        .on('end', server.stream)
});

gulp.task('scripts:lib', function() {
    return gulp.src(['./node_modules/jquery/dist/jquery.min.js', './node_modules/popper.js/dist/umd/popper.min.js', './node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./build/js'))
        .on('end', server.stream)
});

gulp.task('scripts', function() {
    return gulp.src('./src/static/js/main.js')
        .pipe(gulp.dest('./build/js'))
        .on('end', server.stream)
});

gulp.task('img:build', function() {
    return gulp.src('./src/static/img/**/*.{png,jpeg,gif}')
        .pipe(tinypng('NhNQfC355SWT4XKkMmxC9yp5rTqcqWjg'))
        .pipe(gulp.dest('./build/img'));
});

gulp.task('img:dev', function() {
    return gulp.src('./src/static/img/**/*.{png,jpeg,gif}')
        .pipe(gulp.dest('./build/img/'));
});

gulp.task('fonts', function() {
    return gulp.src('./src/static/fonts/**/*')
        .pipe(gulp.dest('./build/fonts'))
});

gulp.task('watch', function() {
    gulp.watch('./src/pug/**/*.pug', gulp.series('pug'))
    gulp.watch('./src/static/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('./src/static/js/main.js', gulp.series('scripts'))
    gulp.watch('./src/static/img/**/*', gulp.series('img:dev'))
    gulp.watch('./src/static/fonts/**/*', gulp.series('fonts'))
});

gulp.task('serve', function() {
    server.init({
        server: {
            baseDir: './build'
        }
    });
    server.watch('./build', server.reload)
});

gulp.task('clean', function() {
    return gulp.src('./build', { read: false })
        .pipe(clean());
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('pug', 'sass', 'scripts:lib', 'scripts', 'img:dev', 'fonts'),
    gulp.parallel('watch', 'serve')
));

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('pug', 'sass', 'scripts:lib', 'scripts', 'img:build', 'fonts'),
    gulp.parallel('watch', 'serve')
));