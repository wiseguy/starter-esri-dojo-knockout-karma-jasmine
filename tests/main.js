var allTestFiles = [];
// var TEST_REGEXP = /test.*\.js$/;
var TEST_REGEXP = /.*Spec\.js$/;

Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        console.log(file);
        allTestFiles.push(file);
    }
});

var baseUrl = "http://shj/apps-wiseguy/template-esri/src";

var pathPrefix = baseUrl || document.location.pathname.replace(/\/[^/]+$/, "");

var dojoConfig = {
    packages: [
        // hosted packages
        {
            name: 'esri',
            location: 'http://js.arcgis.com/3.11/esri'
        }, {
            name: 'dojo',
            location: 'http://js.arcgis.com/3.11/dojo'
        }, {
            name: 'dojox',
            location: 'http://js.arcgis.com/3.11/dojox'
        }, {
            name: 'dijit',
            location: 'http://js.arcgis.com/3.11/dijit'
        },
        //local stuff
        {
            name: "core",
            location: pathPrefix + "/app/js/core"
        }, {
            name: "components",
            location: pathPrefix + "/app/js/components"
        }, {
            name: "libs",
            location: pathPrefix + "/app/js/libs"
        }, {
            name: "js",
            location: pathPrefix + "/app/js"
        }, {
            name: "specs",
            location: pathPrefix + "/tests/specs"
        }

    ],

    aliases: [ //use for version specific files, to make update easy
        ["ko", "libs/knockout-3.2.0"],
        ["bootstrap", "libs/bootstrap.min"]
    ],

    async: true
};


/**
 * This function must be defined and is called back by the dojo adapter
 * @returns {string} a list of dojo spec/test modules to register with your testing framework
 */
window.__karma__.dojoStart = function() {
    return allTestFiles;
}