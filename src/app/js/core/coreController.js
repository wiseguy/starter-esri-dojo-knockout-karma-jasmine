define(["exports", "core/config", "core/toolkitController", "core/hashController"], function(o, config, toolkit, hashController) {

    //var o = {};

    o._blockingNode;

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
        //this.addShare();

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

    o.addShare = function() {

        window.addthis_config = config.addthis_config;

        //add share script
        o.loadScript(config.addthis_url);

    };

    o.loadScript = function(src, attrs) {
        var s = document.createElement('script');
        s.setAttribute('src', src);
        for (var key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                s.setAttribute(key, attrs[key]);
            }
        }
        document.getElementsByTagName('head')[0].appendChild(s);
    };

    o.initProxy = function() {

    };

    o.initPreCallback = function() {

    };

    o.initCors = function() {

    };

    o.startModule = function(moduleId) {



        require(["components/" + moduleId + "/" + moduleId + "Controller"], function(module) {

            console.log("STARTED MODULE " + module);

            var isView = module.isView();

            module.startup();

            if (isView) {
                //switch to the module if its a view



                toolkit.arrayEach(config.viewLinks, function(viewLink) {
                    if (viewLink.id === moduleId) {
                        //debugger;
                        toolkit.getNodeList("." + viewLink.id + "-container").removeClass("dijitHidden");
                    } else {
                        //debugger;
                        toolkit.getNodeList("." + viewLink.id + "-container").addClass("dijitHidden");
                    }
                });



            }

        });

    };

    o.stopModule = function(moduleId) {

        require(["components/" + moduleId + "/" + moduleId + "Controller"], function(module) {
            module.stop();
        });

    };

    o.blockModule = function(targetNode) {
        //inject the blocking div in the node

        //create the blocker if necessary
        if (!o._blockingNode) {
            o._blockingNode = toolkit.createDom("div", {
                "class": "blocker dijitHidden"
            });
        }

        toolkit.placeDom(o._blockingNode, targetNode, "last");

        toolkit.removeClass(o._blockingNode, "dijitHidden");

    };

    o.resumeModule = function() {
        //hide blocker
        toolkit.addClass(o._blockingNode, "dijitHidden");
    };




    return o;

});