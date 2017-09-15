var fs = require('fs');
var path = require('path');
// var colors = require('colors');



function syncWalkFiles(source) {
    console.log('walking source files'.blue)
    var result = [];
    var walk = function (source) {
        var files = fs.readdirSync(source);
        files.forEach(function (item) {
            var stat = fs.statSync(source + '/' + item);
            if (stat.isDirectory()) {
                walk(source + '/' + item);
            } else {
                if (path.extname(item) === '.js') {
                    result.push(source + '/' + item);
                } else {
                    console.log(('[warning] ' + item + ' is not js file').yellow)
                }

            }
        });

    };
    walk(source);
    return result;
}

module.exports = function (gulp, plugins, config) {
    if(config.rules.clean){
        gulp.task('clean',function(){
            gulp.src(config.dist,{read:false})
            .pipe(plugins.clean())
        })
    }
    if (plugins.args.concat) {
        gulp.task('Mijs',['clean'], function () {
            var sourceFiles = syncWalkFiles(config.jsSource);
            console.log('js task working'.blue)
            gulp.src(sourceFiles)
                .pipe(plugins.uglify({
                    compress: false,
                    mangle: false
                }))
                .pipe(plugins.concat('bundle.js'))
                .pipe(plugins.str2hex({
                    hexall: true
                }))
                .pipe(plugins.rename({
                    suffix: '.min'
                }))
                .pipe(gulp.dest(plugins.args.dist || config.dist))
        })
        return;
    }
    gulp.task('Mijs', function () {
        console.log('js task working'.blue)
        var sourceFiles = syncWalkFiles(config.jsSource);
        gulp.src(sourceFiles)
            .pipe(plugins.uglify({
                compress: false,
                mangle: false
            }))
            .pipe(plugins.str2hex({
                hexall: true
            }))
            .pipe(plugins.rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(plugins.args.dist || config.dist))
    })
}