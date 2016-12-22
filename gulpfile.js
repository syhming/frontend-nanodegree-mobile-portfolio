var gulp = require('gulp'),
  critical = require('critical'),
  cachebust = require('gulp-cache-bust'),
  imagemin = require('gulp-imagemin');

//inlining critical css
gulp.task('critical', function(cb) {
  critical.generate({
    inline: true,
    base: './',
    src: 'index.html',
    dest: 'index.html',
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
  return gulp.src('/img/*')
    .pipe(imagemin({ optimization: 5, progressive: true, interlaced: true}))
    .pipe(gulp.dest('/img/'));
  return gulp.src('/views/images/*')
    .pipe(imagemin({ optimization: 5, progressive: true, interlaced: true}))
    .pipe(gulp.dest('/views/images/*'));
});

//putting a expiration and version on file
gulp.task('cachebust', function() {
  return gulp.src(['./*.html', './js/*.js', './css/*.css', '/img/.jpg'])
      .pipe(cachebust({
          type: 'timestamp'
      }))
      .pipe(gulp.dest('./'));
});

//add a clean plugin so i can run gulp every time i update

gulp.task('default', function() {
  gulp.start('critical', 'imagemin', 'cachebust');
});
