/** 
* Make sure you have installed NPM, COMPASS and JADE system
* Then, copy it to your terminal:
* npm install gulp gulp-rename gulp-clean gulp-cache gulp-livereload gulp-compass gulp-minify-css gulp-jshint gulp-uglify gulp-concat gulp-imagemin gulp-jade --save-dev
* For mac user, if permission not allowed, please add "sudo" at the front.
*/ 


/*** Gulp Initial ***/ 

var gulp = require('gulp');
var rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');      // Utilities
var compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css');       // Compass
var jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');              // JavaScript
var imageMin = require('gulp-imagemin');          // Image Minify
var jade = require('gulp-jade');                  // Jade



/*** Paths & Variables ***/ 

var _cssPath = {
  src: 'sass/**/*.scss',
  dist: 'css',
  config: 'config.rb',
  css: 'css',                                 // Must same as config.rb
  sass: 'sass'                                // Must same as config.rb
};

var _jsPath = {
  src: 'js/**/*.js',
  dist: 'js',
  output: 'main.js'
};

var _imgPath = {
  src: 'images/**/*',
  dist: 'images/min'
};

var _jadePath = {
  src: 'jade/**/*.jade',
  dist: './templates',
  locals: {}
}



/*** Compass ***/ 

gulp.task('compass', function() {
  return gulp.src(_cssPath.src)
    .pipe(compass({
      config_file: _cssPath.config,
      css: _cssPath.css,
      sass: _cssPath.sass
    }))
    .pipe(gulp.dest(_cssPath.dist))
    // Minify
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(_cssPath.dist));
});



/*** JavaScript ***/ 

gulp.task('js', function() {  
  return gulp.src(_jsPath.src)
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(concat(_jsPath.output))
    .pipe(gulp.dest(_jsPath.dist))
    // Minify
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(_jsPath.dist));
});



/*** Image ***/ 

gulp.task('imgMin', function() {  
  return gulp.src(_imgPath.src)
    .pipe(cache(imageMin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(_imgPath.dist));
});



/*** Jade ***/ 

gulp.task('jade', function() {
  return gulp.src(_jadePath.src)
    .pipe(jade({
      locals: _jadePath.locals
    }))
    .pipe(gulp.dest(_jadePath.dist));
});




/*** Clean All ***/ 

gulp.task('clean', function() {  
  return gulp.src([_cssPath.dist, _jsPath.dist, _imgPath.dist, _jadePath.dist], {read: false})
    .pipe(clean());
});



/*** Default ***/ 

gulp.task('default', function() {  
  gulp.start('compass', 'jade');
});



/*** Watch ***/ 

gulp.task('watch', function() {

  gulp.watch(_cssPath.src, ['compass']);
  //gulp.watch(_jsPath.src, ['js']);
  //gulp.watch(_imgPath.src, ['imgMin']);
  gulp.watch(_jadePath.src, ['jade']);

  // liveReload
  var server = livereload();
  gulp.watch([_cssPath.dist, _jsPath.dist, _imgPath.dist]).on('change', function(file) {
    server.changed(file.path);
  });

});