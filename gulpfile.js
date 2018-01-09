 var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var concatcss = require('gulp-concat-css');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var wait = require('gulp-wait');
var imagemin = require('gulp-imagemin');
var imagePngquant = require('imagemin-pngquant');
var imageRecompress = require('imagemin-jpeg-recompress');




// Resource Path
var STYLE_PATH = "./public/css";
var SCRIPT_PATH = "./public/js"	;
var IMAGES_PATH = "./public/images";
var FONT_PATH = "./public/fonts";



// Styles

gulp.task('styles', function(){
   console.log('Starting style task');
   return gulp.src('resources/scss/style.scss')
   .pipe(wait(500))
   .pipe(plumber(function(err){
   		console.log('Styles Task Error');
   		console.log(err);
   		this.emit('end');
   }))
   .pipe(sourcemaps.init())
   .pipe(autoprefixer())
   .pipe(sass({
   		outputStyle: 'compressed'
   }))
   //.pipe(minifycss())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest(STYLE_PATH))
   .pipe(livereload());
});


// Script

gulp.task('scripts', function(){
	console.log('Starting Script task');
	return gulp.src('resources/js/**/*.js')
	.pipe(plumber(function(err){
   		console.log('Styles Task Error');
   		console.log(err);
   		this.emit('end');
     }))
	.pipe(concat('main.js'))
	//.pipe(uglify())
	.pipe(gulp.dest(SCRIPT_PATH))
	.pipe(livereload());
});


// Bootstrap Styles

gulp.task('BootstrapStyle', function(){
	console.log('Starting Bootstrap Style task');
	return gulp.src('framework/scss/bootstrap/bootstrap.scss')
	.pipe(plumber(function(err){
   		console.log('Styles Task Error');
   		console.log(err);
   		this.emit('end');
     }))
	.pipe(sass({
	 	outputStyle: 'compressed'
	 }))
	.pipe(gulp.dest(STYLE_PATH))
	.pipe(livereload());
});

// Bootstrap Scripts

gulp.task('BootstrapScripts', function(){
   console.log('Starting Booststrap Script task');
   return gulp.src(['framework/js/bootstrap.js','framework/js/bootstrap.bundle.js'])
   .pipe(plumber(function(err){
   		console.log('Styles Task Error');
   		console.log(err);
   		this.emit('end');
    }))
   .pipe(concat('framework.js'))
   //.pipe(uglify())
   .pipe(gulp.dest(SCRIPT_PATH))
   .pipe(livereload());
});

// Hover animateions

gulp.task('HoveSCSS', function(){
  console.log('Starting Hover SCSS task');
  return gulp.src('bower_components/hover/scss/hover.scss')
  .pipe(plumber(function(err){
      console.log('Styles Task Error');
      console.log(err);
      this.emit('end');
     }))
  .pipe(sass({
    outputStyle: 'compressed'
   }))
  .pipe(gulp.dest(STYLE_PATH))
  .pipe(livereload());
});


// Images Compression

gulp.task('images',function(){
    console.log('Starting Image compression task');
    return gulp.src('resources/images/**/*.{png,jpg,jpeg,svg,gif}')
    	.pipe(imagemin(
    			[
    				imagemin.gifsicle(),
    				imagemin.jpegtran(),
    				imagemin.optipng(),
    				imagemin.svgo(),
    				imagePngquant(),
    				imageRecompress()
    			]
   		))
   	.pipe(gulp.dest(IMAGES_PATH))
});

gulp.task('FontAweosme', function(){
  console.log('Starting Bootstrap Style task');
  return gulp.src('framework/scss/fontawesome/scss/font-awesome.scss')
  .pipe(plumber(function(err){
      console.log('Styles Task Error');
      console.log(err);
      this.emit('end');
     }))
  .pipe(sass({
    outputStyle: 'compressed'
   }))
  .pipe(gulp.dest(STYLE_PATH))
  .pipe(livereload());
});

gulp.task('icons', function() {
    return gulp.src('framework/scss/fontawesome/fonts/**/*')
        .pipe(gulp.dest(FONT_PATH));
}); 

gulp.task('default',['styles','scripts','BootstrapStyle','BootstrapScripts','HoveSCSS','images','FontAweosme','icons'], function(){
	console.log('Default task running');
});


gulp.task('watch', ['default'], function(){
	console.log('Watch task running');
	require('./server.js');
	livereload.listen();
	gulp.watch('resources/scss/**/*.scss', ['styles']).on('change', livereload.changed);
	gulp.watch('resources/js/**/*.js', ['scripts']).on('change', livereload.changed);
  gulp.watch('framework/scss/**/*.scss', ['BootstrapStyle']).on('change', livereload.changed);
  gulp.watch('framework/js/**/*.js', ['BootstrapScripts']).on('change', livereload.changed);
	gulp.watch(IMAGES_PATH, ['images']).on('change', livereload.changed);
	gulp.watch(FONT_PATH, ['fonts']).on('change', livereload.changed);
	gulp.watch('public/*.html').on('change', livereload.changed);
});