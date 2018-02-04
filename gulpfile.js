var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');


const jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe(jscs());
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var options = {
        bowerJson: './bower.json',
        directory: './public/lib'
    };

    var injectSrc = gulp.src(['./public/js/*.js', './public/css/*.css'], { read: false });
    var injectOptions = { ignorePath: 'public' };

    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function () {
    return nodemon({
        script: 'app.js',
        delayTime: 1,
        env: {
            PORT: 3000
        },
        watch: jsFiles
    })
    .on('restart', function () {
        console.log('Restarting..');
    });
});