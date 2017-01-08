var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var critical = require('critical');

gulp.task('default', ['critical', 'imagemin', 'copy-html', 'styles', 'scripts'], function() {
  gulp.watch('src/sass/**/*.scss', ['styles']);
  gulp.watch('src/views/sass/**/*.scss', ['styles']);
  gulp.watch('dist/css/**/*.css', ['critical']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/img/**/*', ['imagemin']);
  gulp.watch('src/views/img/**/*', ['imagemin']);
  gulp.watch('/index.html', ['copy-html']);
});

//inlining critical css
gulp.task('critical', function(cb) {
  critical.generate({
    inline: true,
    base: './',
    src: 'src/index.html',
    css: 'dist/css/styles.css',
    dest: 'dist/index.html',
    minify: true,
    dimensions:[{
      width: 480
    }, {
      width: 1300,
      height: 900
    }]
  })
});

//optimizing images
gulp.task('imagemin', function() {
  gulp.src('src/img/*')
    .pipe(imagemin({ optimization: 5, progressive: true, interlaced: true}))
    .pipe(gulp.dest('dist/img/'));
  gulp.src('src/views/images/*')
    .pipe(imagemin({ optimization: 5, progressive: true, interlaced: true}))
    .pipe(gulp.dest('dist/views/images/'));
});

//production-ready completion
gulp.task('dist', [
  'copy-html',
  'imagemin',
  'styles',
  'critical',
  'scripts'
]);

//port html from source to distribution folder
gulp.task('copy-html', function() {
  gulp.src('.index.html')
    .pipe(gulp.dest('./dist'));
  gulp.src('./src/views/pizza.html')
    .pipe(gulp.dest('./dist/views'));
})

//scripts and scripts-dist will translate es6 code, lint js, and minify multipe js files into one file from source to distribution
gulp.task('scripts', function() {
  gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});

//take sass files and convert to css with an autoprefixer and minifier
gulp.task('styles', function() {
  gulp.src('src/sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('dist/css'))
});

// Handle the error
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}
