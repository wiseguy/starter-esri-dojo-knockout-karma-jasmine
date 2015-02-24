/**
@win
@doc
*/

(function() {
    'use strict';

    var baseUrl;
    /* if app files in different location, hardcode the path, USE SLASH AT END OF URL*/
    // baseUrl = "http://shj.blueraster.com/apps-wiseguy/template-esri/src/";

    var pathPrefix = baseUrl || document.location.pathname.replace(/\/[^/]+$/, "");
    if (pathPrefix.slice(-1) !== "/") {
        pathPrefix = pathPrefix + "/";
    }

    var esriVersion = "3.12",
        loadFiles = {
            "css": [
                "http://js.arcgis.com/" + esriVersion + "/esri/css/esri.css",
                "http://js.arcgis.com/" + esriVersion + "/dijit/themes/tundra/tundra.css",
                "app/css/bootstrap2.css",
                pathPrefix + "app/css/app.css",
                pathPrefix + "app/css/joyride/joyride-2.1.css",
                pathPrefix + "app/css/joyride/mobile.css"
            ],
            "js": [{
                src: "http://js.arcgis.com/" + esriVersion + "/" // if any script has AMD detection, include it in the deps for dojo, else here
            }]

        },
        version = "0.1",
        dojoConfig;




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
            location: pathPrefix + "app"
        }, {
            name: "core",
            location: pathPrefix + "app/js/core"
        }, {
            name: "components",
            location: pathPrefix + "app/js/components"
        }, {
            name: "libs",
            location: pathPrefix + "app/js/libs"
        }, {
            name: "js",
            location: pathPrefix + "app/js"
        }],
        aliases: [ //use for version specific files
            ["ko", "libs/knockout-3.2.0"],
            ["bootstrap", "libs/bootstrap.min"]
        ],
        deps: [

            "libs/modernizr.mq",
            "libs/jquery-1.10.1",

        ],
        callback: function() {

            require(["app/startup",
                "libs/jquery.cookie",
                "libs/jquery.joyride-2.1",
                "dojo/domReady!"
            ], function() {



            });
            //  coreController.startup();

        } // End callback
    };

    window.dojoConfig = dojoConfig;

    var loadScript = function(attrs) {
        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        //s.setAttribute('src', src);
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