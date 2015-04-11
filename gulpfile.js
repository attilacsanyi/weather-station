var gulp = require('gulp'),

// Gulp plugins
connect     = require('gulp-connect'),
jshint      = require('gulp-jshint'),
uglify      = require('gulp-uglify'),
minifyCSS   = require('gulp-minify-css'),
clean       = require('gulp-clean');

// Default task
gulp.task('default',
  ['lint', 'server']
);

//////////////////////
// Dev build pipeline
//////////////////////

// Dev build
gulp.task('dev',
  ['lint', 'server-dev']
);

// Start development server
gulp.task('server-dev', function() {
  connect.server({
    root: 'client',
    port: 8888
  });
});

//////////////////////
// Prod build pipeline
//////////////////////

// Prod build
gulp.task('prod',
  ['lint', 'minify-css', 'minify-js', 'copy-html-files', 'copy-assets', 'copy-bower-components', 'server-dist']
);

// Delete release build
gulp.task('clean', function() {
    gulp.src('dist')
      .pipe(clean({force: true}));
});

// Lint JS codebase
gulp.task('lint', function() {
  gulp.src(['client/**/*.js', '!client/bower_components/**/*.js', '!client/assets/lib/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

// Minify css styles
gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['client/assets/css/**/*.css'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('dist/client/assets/css'))
});

// Minify JS codes
gulp.task('minify-js', function() {
  gulp.src(['client/**/*.js', '!client/bower_components/**/*.js'])
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
    }))
    .pipe(gulp.dest('dist/client'))
});

// Copy bower_components dir
gulp.task('copy-bower-components', function () {
  gulp.src('client/bower_components/**/*')
    .pipe(gulp.dest('dist/client/bower_components'));
});

// Copy html files
gulp.task('copy-html-files', function () {
  gulp.src('client/**/*.html')
    .pipe(gulp.dest('dist/client'));
});

// Copy static resources
gulp.task('copy-assets', function () {
  gulp.src('client/assets/**/*')
    .pipe(gulp.dest('dist/client/assets'));
});

// Start dev server on top of the dist
gulp.task('server-dist', function () {
  connect.server({
    root: 'dist/client',
    port: 9999
  });
});
