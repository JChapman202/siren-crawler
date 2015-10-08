var gulp = require('gulp');
var babel = require('babel');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var util = require('gulp-util');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var browserify = require('browserify');
var rename = require('gulp-rename');
var size = require('gulp-size');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');
var webserver = require('gulp-webserver');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var concatCss = require('gulp-concat-css');
var sass = require('gulp-sass');

require('babel/register');

gulp.task('clean', function() {
	return gulp.src(['site'], {read: false})
		.pipe(clean());
});

gulp.task('sass', ['fonts'], function() {
	gulp.src(['src/styles/app.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass({
			includePaths: [
				__dirname + '/node_modules/font-awesome/scss',
				__dirname + '/node_modules/bootstrap-sass/assets/stylesheets'
			]
		}))
		.on('error', function(e) { util.log(util.colors.blue('[SASS] ') + util.colors.red(e.toString())); })
		.pipe(sourcemaps.write())
		.pipe(size({
			gzip: true
		}))
		.pipe(concatCss('app.css'))
		.pipe(gulp.dest('site/styles/'));
});

gulp.task('html', function() {
	//TODO: clean up json-markup style.css location to be it's own task and rename it to be jsonMarkup.css
	return gulp.src(['src/**/*.html', 'node_modules/json-markup/style.css'])
		.pipe(gulp.dest('site'));
});

gulp.task('build', ['html', 'sass'], function() {
	var options = {
		debug: true,
		extensions: ['.jsx']
	};

	return browserify('src/app.jsx', options)
		.transform(babelify.configure({experimental: false}))
		.bundle()
		.on('error', function(e) { util.log(util.colors.blue('[BROWSERIFY] ') + util.colors.red(e.toString())) })
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(rename('app.js'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('site/'))
});

gulp.task('serve', function() {
	return gulp.src('site')
		.pipe(webserver({
			fallback: '/index.html',
			host: '0.0.0.0',
			livereload: true,
			port: 8080,
			proxies: [
				{
					source: '/api',
					target: 'http://localhost:8081/api'
				}
			]
		}));
});

gulp.task('lint', function() {
	return gulp.src(['src/**/*.js', 'test/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task('test', function() {
	return gulp.src(['test/**/*.js'], {read: false})
		.pipe(mocha({
			compilers: {
				js: babel
			},
			reporter: 'spec'
		}));
});

gulp.task('fonts', function() {
	return gulp.src(__dirname + '/node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest('site/fonts'));
});

gulp.task('watch', function() {
	gulp.watch(['src/**/*.jsx', 'src/**/*.js'], ['lint', 'test', 'build']);
	gulp.watch(['test/**/*.js'], ['lint', 'test']);
	gulp.watch(['src/**/*.scss'], ['sass']);
});

gulp.task('default', ['watch', 'lint', 'test', 'build', 'serve']);
