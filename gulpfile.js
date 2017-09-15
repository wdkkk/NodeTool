var gulp = require('gulp');
var fs = require('fs');
require('colors');
var plugins = require('gulp-load-plugins')();
plugins.args = require('yargs').argv;
// console.log(plugins)
var config = require('./config');




require('./Tasks/jstask')(gulp,plugins,config)//注册js任务