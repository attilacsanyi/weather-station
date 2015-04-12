var gulp = require('gulp'),

// Gulp build
connect     = require('gulp-connect'),
jshint      = require('gulp-jshint'),
uglify      = require('gulp-uglify'),
minifyCSS   = require('gulp-minify-css'),
clean       = require('gulp-clean'),

// Define Sass and the autoprefixer
sass        = require('gulp-sass'),
prefix      = require('gulp-autoprefixer'),

// Testing
karma       = require('gulp-karma');

// This is an object which defines paths for the build system
var paths = {

  styles: {
    bootstrapDir: 'client/bower_components/bootstrap-sass',
    src: 'client/assets/scss',
    files: 'client/assets/scss/**/*.scss',
    dest: 'client/assets/css'
  },

  tests: {
    src: [

      // Angular
      'client/bower_components/angular/angular.js',

      // Angular mock
      'client/bower_components/angular-mocks/angular-mocks.js',

      // Angular router
      'node_modules/angular-new-router/dist/router.es5.js',

      // Angular bootstrap  
      'client/bower_components/angular-bootstrap/ui-bootstrap.js',

      // Angular app                
      'client/weatherStation.js',
      'client/AppController.js',
      'client/services/**/*.js',
      'client/components/**/*.js',
      'client/models/**/*.js',

      // Angular app spec
      'client/**/*Spec.js',
      'test/client/**/*.js'
    ]
  }

};

// Default task
gulp.task('default',
  ['lint', 'server']
);

//////////////////////
// Dev build pipeline
//////////////////////

// Dev build
gulp.task('dev',
  ['lint', 'tdd', 'scss', 'server-dev']
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
  ['lint', 'test', 'sass', 'minify-css', 'minify-js', 'copy-html-files', 'copy-assets', 'copy-bower-components', 'server-dist']
);

// Delete release build
gulp.task('clean', function() {
    gulp.src('dist')
      .pipe(clean({force: true}));
});

// Lint JS codebase
gulp.task('lint', function() {
  gulp.src(['client/**/*.js', 'test/client/**/*.js', '!client/bower_components/**/*.js', '!client/assets/lib/**/*.js'])
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
  gulp.src(['client/**/*.js', '!client/**/*Spec.js', '!client/bower_components/**/*.js'])
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

//////////////////////
// SASS build pipeline
//////////////////////

// This is the default task - which is run when `gulp` is run
// The tasks passed in as an array are run before the tasks within the function
gulp.task('scss', ['sass'], function() { 
    // Watch the files in the paths object, and when there is a change, fun the functions in the array
    gulp.watch(paths.styles.files, ['sass'])
    // Also when there is a change, display what file was changed, only showing the path after the 'sass folder'
    .on('change', function(evt) {
        console.log(
            '[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...'
        );
    });
});

// Setting up the sass task
gulp.task('sass', function (){
    // Taking the path from the above object
    gulp.src(paths.styles.files)
    // Sass options - make the output compressed and add the source map
    // Also pull the include path from the paths object
    .pipe(sass({
        outputStyle: 'compressed',
        sourceComments: 'map',
        includePaths : [paths.styles.src, paths.styles.bootstrapDir + '/assets/stylesheets']
    }))
    // If there is an error, don't stop compiling but use the custom displayError function
    .on('error', function(err){
        displayError(err);
    })
    // Pass the compiled sass through the prefixer with defined 
    .pipe(prefix(
        'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
    ))
    // Funally put the compiled sass into a css file
    .pipe(gulp.dest(paths.styles.dest))
});

// A display error function, to format and make custom errors more uniform
// Could be combined with gulp-util or npm colors for nicer output
var displayError = function(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;

    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
}

//////////////////////
// TEST build pipeline
//////////////////////

gulp.task('tdd', function() {
  gulp.src(paths.tests.src)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

gulp.task('test', function() {
  // Be sure to return the stream 
  return gulp.src(paths.tests.src)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero 
      throw err;
    });
});
