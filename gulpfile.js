var gulp = require('gulp'),
  critical = require('critical'),
  imagemin = require('imagemin');

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
  return gulp.src('/img')
    .pipe(imagemin({ optimization: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest('/img'));
});

gulp.task('default', function() {
  gulp.start('critical', 'imagemin');
});
