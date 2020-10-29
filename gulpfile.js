const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const preprocess = require('gulp-preprocess');

const env = process.env.NODE_ENV;

const {DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');

sass.compiler = require('node-sass');

task("clean", () => {	
	return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task("copy:uploads",  () => {
	return src(`${SRC_PATH}/uploads/**/*`)
		.pipe(dest(`${DIST_PATH}/uploads/`))
		.pipe(reload({ stream: true }));
});

task("copy:html",  () => {
	return src(`${SRC_PATH}/*.html`)
		.pipe(preprocess({context: {NODE_ENV: env, DEBUG: true}}))
		.pipe(dest(DIST_PATH))
		.pipe(reload({ stream: true }));
});

task("copy:login",  () => {
	return src(`${SRC_PATH}/login/*.html`)
		.pipe(preprocess({context: {NODE_ENV: env, DEBUG: true}}))
		.pipe(dest(`${DIST_PATH}/login`))
		.pipe(reload({ stream: true }));
});

task("styles",  () => {
	return src([...STYLES_LIBS, `${SRC_PATH}/js/mapstyles.scss`])
		.pipe(gulpif(env === 'dev', sourcemaps.init()))
			.pipe(concat('mapstyles.scss'))
			.pipe(sassGlob())
			.pipe(sass().on('error', sass.logError))
			// .pipe(px2rem())
			.pipe(gulpif(env === 'dev', autoprefixer({
				browsers: ["last 2 versions"],
				cascade: false
			})))
			.pipe(gulpif(env === 'prod', gcmq()))
			.pipe(gulpif(env === 'prod', cleanCSS()))
		.pipe(gulpif(env === 'dev', sourcemaps.write()))
		.pipe(dest(`${DIST_PATH}/js`))
		.pipe(reload({ stream: true }));
});

task("scripts", () => {
	return src([...JS_LIBS, 
							`${SRC_PATH}/js/*.js`, 
							`${SRC_PATH}/js/scripts/*.js`,
							`${SRC_PATH}/js/scripts/layers/*.js`,						
						])
		.pipe(preprocess({context: {NODE_ENV: env, DEBUG: true}}))
		.pipe(gulpif(env === 'dev', sourcemaps.init()))
			.pipe(concat('mapscripts.js', {newLine: ";"}))
/* 			.pipe(gulpif(env === 'prod', babel({
				presets: ['@babel/env']
			}))) */
			// .pipe(gulpif(env === 'prod', uglify()))
		.pipe(gulpif(env === 'dev', sourcemaps.write()))
		.pipe(dest(`${DIST_PATH}/js`))
		.pipe(reload({ stream: true }));
})

task('server', () => {
	browserSync.init({
			server: {
					baseDir: "./dist"
			},
			open: false
	});
});

task('watch', () => {
	watch(`./${SRC_PATH}/js/**/*.scss`, series("styles"));
	watch(`./${SRC_PATH}/js/*.js`, series("scripts"));
	watch(`./${SRC_PATH}/js/scripts/*.js`, series("scripts"));
	watch(`./${SRC_PATH}/js/scripts/layers/*.js`, series("scripts"));
	watch(`./${SRC_PATH}/*.html`, series("copy:html"));
	watch(`./${SRC_PATH}/login/*.html`, series("copy:login"));
})


task("default", series("clean", parallel("copy:html", "copy:login", "copy:uploads", "styles", "scripts"), parallel("watch","server")));

task("build", series("clean", parallel("copy:html", "copy:login", "copy:uploads", "styles", "scripts"), parallel("watch","server")));