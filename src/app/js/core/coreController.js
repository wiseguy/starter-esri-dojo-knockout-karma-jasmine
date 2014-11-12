define(["core/config"], function(config) {

    var o = {};

    o.startup = function() {

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

        require(["components/app/" + moduleId + "Controller"], function(module) {
            module.startup();
        });

    }

    o.stopModule = function(moduleId) {

        require(["components/app/" + moduleId + "Controller"], function(module) {
            module.stop();
        });

    }



    return o;

});