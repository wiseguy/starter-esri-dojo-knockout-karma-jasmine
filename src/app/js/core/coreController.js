define(["core/config", "core/toolkitController", "core/hashController"], function(config, toolkit, hashController) {

    var o = {};

    o.startup = function() {

        hashController.startAppStateTracking();

        this.initProxy();
        this.initPreCallback();
        this.initCors();

        this.startModule("app");

        //set the default esri config
        //set the proxy
        //set the cors

    };

    o.initProxy = function() {

    };

    o.initPreCallback = function() {

    };

    o.initCors = function() {

    };

    o.startModule = function(moduleId) {

        require(["components/" + moduleId + "/" + moduleId + "Controller"], function(module) {

            module.startup();
        });

    };

    o.stopModule = function(moduleId) {

        require(["components/" + moduleId + "/" + moduleId + "Controller"], function(module) {
            module.stop();
        });

    };




    return o;

});