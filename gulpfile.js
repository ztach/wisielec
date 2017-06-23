'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	sourceMaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	imagein = require('gulp-imagemin'),
	changed = require('gulp-changed'),
	htmlReplace = require('gulp-html-replace'),
	htmlMin = require('gulp-htmlmin'),
	del = require('del'),
	runSequence = require('run-sequence'),
	gulp = require('gulp'),
	Server = require('karma').Server,
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	karma = require('karma');




var config = {
	dist:'dist/',
	src:'src/',
	cssin:'src/css/**/*.css',
	jsin:'src/js/**/*.js',
	imgin:'src/img/**/*.{jpg,png,jpeg,gif}',
	htmlin:'src/**/*.html',
	scssin:'src/scss/**/*.scss',
	cssout:'dist/css/',
	jsout:'dist/js/',
	imgout:'dist/img/',
	htmlout:'dist/',
	scssout:'src/css/',
	cssoutname:'style.css',
	jsoutname:'script.js',
	cssreplaceout:'css/style.css',
	jsreplaceout:'js/script.js'
};

gulp.task('reload',function(){
	browserSync.reload();
});


gulp.task('serve',['css'],function(){
	browserSync({
		server: config.src
	});

	gulp.watch([config.htmlin,config.jsin,config.cssin],['reload']);
});

gulp.task('sass',function(){
	return gulp.src(config.scssin)
	.pipe(sourceMaps.init())
	.pipe(sass().on('error',sass.logError))
	.pipe(autoprefixer({
		browsers:['last 3 versions']
	}))
	.pipe(sourceMaps.write())
	.pipe(gulp.dest(config.scssout))
	.pipe(browserSync.stream());
});

gulp.task('css',function(){
	return gulp.src(config.cssin)
	.pipe(concat(config.cssoutname))
	.pipe(cleanCSS())
	.pipe(gulp.dest(config.cssout));
});

gulp.task('js',function(){
	return gulp.src(config.jsin)
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))	
	.pipe(concat(config.jsoutname))
	.pipe(uglify())
	.pipe(gulp.dest(config.jsout));
});

gulp.task('img',function(){
	return gulp.src(config.imgin)
	.pipe(changed(config.imgout))
	.pipe(imagein())
	.pipe(gulp.dest(config.imgout));
});

gulp.task('html',function(){
	return gulp.src(config.htmlin)
	.pipe(htmlReplace({
		'css':config.cssreplaceout,
		'js': config.jsreplaceout
	}))
	.pipe(htmlMin({
		sortAttributes:true,
		sortClassName:true,
		collapseWhitespace:true
	}))
	.pipe(gulp.dest(config.dist));
});

gulp.task('clear',function(){
	return del([config.dist]);
});


/**
 * Start the tests using karma.
 * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
 * @param  {Function} done - Callback to fire when karma is done
 * @return {undefined}
 */
function startTests(singleRun, done) {
    var child;
    var excludeFiles = [];
    var fork = require('child_process').fork;
    var KarmaServer = require('karma').Server;
    var serverSpecs = config.serverIntegrationSpecs;

    if (args.startServers) {
        log('Starting servers');
        var savedEnv = process.env;
        savedEnv.NODE_ENV = 'dev';
        savedEnv.PORT = 8888;
        child = fork(config.nodeServer);
    } else {
        if (serverSpecs && serverSpecs.length) {
            excludeFiles = serverSpecs;
        }
    }

    var server = new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        exclude: excludeFiles,
        singleRun: singleRun
    }, karmaCompleted);
    server.start();

    ////////////////

    function karmaCompleted(karmaResult) {
        log('Karma completed');
        if (child) {
            log('shutting down the child process');
            child.kill();
        }
        if (karmaResult === 1) {
            done('karma: tests failed with code ' + karmaResult);
        } else {
            done();
        }
    }
}



gulp.task('test', function(done) {
    Server.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function(result) {
        if (result > 0) {
            return done(new Error(`Karma exited with status code ${result}`));
        }

        done();
    });
});



/*
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function(err){
        if(err === 0){
            done();
        } else {
            done(new gutil.PluginError('karma', {
                message: 'Karma Tests failed!! dirname: ' +  __dirname
            }));
        }
    }).start();
});



gulp.task('test', function(done) {
    Server.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function() {
        done();
    });
});
*/

gulp.task('build',function(){
	runSequence('clear',['html','js','css','img']);
});



gulp.task('default',['serve']);
