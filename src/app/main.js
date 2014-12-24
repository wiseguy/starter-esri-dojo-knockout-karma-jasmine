/**
@win
@doc
*/

(function() {
    'use strict';

    var baseUrl,
        esriVersion = "3.12",
        loadFiles = {
            "css": [
                "http://js.arcgis.com/" + esriVersion + "/esri/css/esri.css",
                "http://js.arcgis.com/" + esriVersion + "/dijit/themes/tundra/tundra.css",
                "../app/css/app.css",
                "../app/css/bootstrap2.css"
            ],
            "js": [
                "http://js.arcgis.com/" + esriVersion + "/",
                "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"
            ]

        },
        version = "0.1",
        dojoConfig;

    baseUrl = "http://shj.blueraster.com/apps-wiseguy/template-esri/src";
    //baseUrl = "http://staging.geoent.com/esri";

    var pathPrefix = baseUrl || document.location.pathname.replace(/\/[^/]+$/, "");

    // Precaution
    if (!window.console) {
        window.console = {
            log: function() {},
            debug: function() {}
        };
    }

    // dojoConfig definition
    dojoConfig = {
        hashPollFrequency: 50,
        parseOnLoad: false,
        isDebug: false,
        async: true,
        //cacheBust: "v=" + version,
        packages: [{
            name: "app",
            location: pathPrefix + "/app"
        }, {
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
        }],
        aliases: [ //use for version specific files
            ["ko", "libs/knockout-3.2.0"],
            ["bootstrap", "libs/bootstrap.min"]
        ],
        deps: [
            "app/startup",
            // "app/loader-optimized"
            "dojo/domReady!"
        ],
        callback: function() {

            //  coreController.startup();

        } // End callback
    };

    window.dojoConfig = dojoConfig;

    var loadScript = function(src, attrs) {
        var s = document.createElement('script');
        s.setAttribute('src', src);
        for (var key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                s.setAttribute(key, attrs[key]);
            }
        }
        document.getElementsByTagName('head')[0].appendChild(s);
    };

    var loadStyle = function(src) {
        var l = document.createElement('link');
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('type', 'text/css');
        l.setAttribute('href', src);
        document.getElementsByTagName('head')[0].appendChild(l);
    };

    var loadConfiguration = function() {
        console.log("loadConfiguration");
        //load css
        for (var k = 0; k < loadFiles.css.length; k += 1) {
            loadStyle(loadFiles.css[k]);
        }
        //load js
        for (var i = 0; i < loadFiles.js.length; i += 1) {
            loadScript(loadFiles.js[i]);
        }

    };

    if (document.readyState === "loaded") {
        loadConfiguration();
    } else {
        window.onload = loadConfiguration;
    }

})();