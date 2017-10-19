/**
 * Jake config file.
 */

var webpack = require("webpack");
var path = require("path");

// Hosts webpack configurations
var wpconfigs = {
    lib: require(path.join(__dirname, "webpack.config.js")),
    tests: {
        e2e: {
            arrangement: {
                test2boxes: require(path.join(__dirname, "test", "brws-e2e", "arrangement", "2boxes.webpack.config.js")),
                test4boxes_1: require(path.join(__dirname, "test", "brws-e2e", "arrangement", "4boxes-1.webpack.config.js")),
                test4boxes_2: require(path.join(__dirname, "test", "brws-e2e", "arrangement", "4boxes-2.webpack.config.js")),
                test4boxes_vert: require(path.join(__dirname, "test", "brws-e2e", "arrangement", "4boxes-vert.webpack.config.js"))
            },
            connecting: {
                test2boxes1rel_2: require(path.join(__dirname, "test", "brws-e2e", "connecting", "2boxes1rel-2.webpack.config.js")),
                test2boxes1rel_horiz: require(path.join(__dirname, "test", "brws-e2e", "connecting", "2boxes1rel-horiz.webpack.config.js")),
                test2boxes1rel: require(path.join(__dirname, "test", "brws-e2e", "connecting", "2boxes1rel.webpack.config.js")),
                test4boxes3rel: require(path.join(__dirname, "test", "brws-e2e", "connecting", "4boxes3rel.webpack.config.js"))
            }
        }
    }
};

desc('Builds the projects and generates the library.');
task('default', function() {
    console.log("Building library...");
    webpack(wpconfigs.lib, function() { 
        console.log("Bundle successfully created!"); 
    });
});

desc('Builds all tests.');
task('build-tests', function() {
    var callback = function() { 
        console.log("Bundle successfully created!"); 
    };

    console.log("Building tests...");

    webpack(wpconfigs.tests.e2e.arrangement.test2boxes, callback);
    webpack(wpconfigs.tests.e2e.arrangement.test4boxes_1, callback);
    webpack(wpconfigs.tests.e2e.arrangement.test4boxes_2, callback);
    webpack(wpconfigs.tests.e2e.arrangement.test4boxes_vert, callback);

    webpack(wpconfigs.tests.e2e.connecting.test2boxes1rel_2, callback);
    webpack(wpconfigs.tests.e2e.connecting.test2boxes1rel_horiz, callback);
    webpack(wpconfigs.tests.e2e.connecting.test2boxes1rel, callback);
    webpack(wpconfigs.tests.e2e.connecting.test4boxes3rel, callback);
});
