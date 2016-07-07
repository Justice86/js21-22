const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const server = require('gulp-server-livereload');
const babel = require('gulp-babel');

// gulp.task('scripts', () => {
//     return gulp.src(['src/js/*.js'])
//         .pipe(concat('app.js', {newLine: ';'}))
//         .pipe(gulp.dest('dist/js'));
// });

gulp.task('scripts', () => {
    return gulp.src(['src/js/*.js'])
        .pipe(sourceMaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('webserver', () => {
    gulp.src('app')
        .pipe(server({
            livereload: true,
            directoryListing: true,
            open: true,
            defaultFile: 'index.html'
        }));
});

gulp.task('pages', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('sass', () => {
    return gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('default', () => {
    gulp.start('scripts', 'sass', 'pages', 'webserver');
    gulp.watch('src/index.html', ['pages']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/**/*.scss', ['sass']);
});