define(["core/config", "core/toolkitController", "core/hashController"], function(config, toolkit, hashController) {

    var o = {};


    o.startup = function() {

        this.initMessageDialog();

        var isCompatible = this.browserCompatibilityCheck();

        if (isCompatible.length) {

            o.showMessageDialog(config.messages.browserIncompatible + "<br>" + isCompatible.join(""));
            return; //STOP APP FROM LOADING
        }

        hashController.startAppStateTracking();



        this.initProxy();
        this.initPreCallback();
        this.initCors();


        this.startModule("app");

        //set the default esri config
        //set the proxy
        //set the cors

    };

    o.initMessageDialog = function() {

        o._messageDialog = toolkit.createDom("div", {
            "class": "dijitHidden appAlertDialog"
        }, toolkit.getNodeList("body")[0]);


    };

    o.showMessageDialog = function(message) {

        // toolkit.setNodeAttr(o._messageDialog, "");
        toolkit.setNodeHtml(o._messageDialog, message);
        toolkit.removeClass(o._messageDialog, "dijitHidden");

    };

    o.hideMessageDialog = function() {

        toolkit.addClass(o._messageDialog, "dijitHidden");

    };

    o.browserCompatibilityCheck = function() {

        var safeBrowser = false;
        var browsersCompatible = config.browsersCompatible;
        var browserResults = [];
        var validBrowsers = []; //if this gets populated, then users browser isnt valid

        //Check if user browser compatible with any from the compatibility list
        safeBrowser = toolkit.arraySome(browsersCompatible, function(browser) {
            var version = toolkit.sniff(browser.id);
            return (version != undefined && version >= browser.min && (browser.max == 0 || version <= browser.max) && (browser.min == 0 || version >= browser.min));
        });

        // if (toolkit.sniff('ios') || sniff('android'))
        //     safeBrowser = false;

        if (!safeBrowser) {

            toolkit.arrayEach(browsersCompatible, function(browser, b) {
                if (browser.min === browser.max) {
                    browserResults.push(browser.name + " version " + browser.only);
                } else if ((browser.min !== 0) && (browser.max !== 0)) {
                    browserResults.push(browser.name + " version " + browser.min + " to " + browser.max)
                } else if ((browser.min !== 0) && (browser.max === 0)) {
                    browserResults.push(browser.name + " minimum version " + browser.min)
                }
            });


            toolkit.arrayEach(browsersCompatible, function(browser) {
                validBrowsers.push(browser.name + " versions - ");
                if (!browser.min && !browser.max) {
                    validBrowsers.push(" All ");
                }
                if (browser.min) {
                    validBrowsers.push(" minimum " + browser.min);
                }
                if (browser.max) {
                    validBrowsers.push(" maximum " + browser.max);
                }
                validBrowsers.push("<br>");
            });


        }

        return validBrowsers;


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