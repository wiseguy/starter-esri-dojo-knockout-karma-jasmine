define(["exports", "core/config", "core/toolkitController", "core/hashController", "libs/bowser.min"], function(o, config, toolkit, hashController, bowser) {

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


        //Initialize stuff that doesnt depend on DOM

        this.setupProxy();
        this.setupPreCallback();
        this.setupCors();
        this.setupConfig();

        if (config.plugins.analytics) {
            this.initAnalytics();
        }


        this.startModule("app");

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
            var isValidBrowser = bowser[browser.id];
            var version = bowser.version;
            return ((isValidBrowser != undefined) && (version >= browser.min) && (browser.max == 0 || version <= browser.max) && (browser.min == 0 || version >= browser.min));
        });

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

    o.setupProxy = function() {

        var esriConfig = toolkit.getEsriConfig();

        esriConfig.defaults.io.proxyUrl = "/proxy/proxy.ashx";


    };

    o.setupPreCallback = function() {

    };

    o.setupCors = function() {

    };

    o.setupConfig = function() {
        var esriConfig = toolkit.getEsriConfig();

        esriConfig.defaults.map.panDuration = 1; // time in milliseconds, default panDuration: 250
        esriConfig.defaults.map.panRate = 1; // default panRate: 25 
        esriConfig.defaults.map.zoomDuration = 100; // default zoomDuration: 500 
        esriConfig.defaults.map.zoomRate = 1; // default zoomRate: 25
    }

    o.initAnalytics = function() {

        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', config.analytics_id, 'auto');
        // ga('send', 'pageview');

    };

    o.startModule = function(moduleId, dependencyList) {



        require(["components/" + moduleId + "/" + moduleId + "Controller"], function(module) {

            if (dependencyList && dependencyList.length > 0) {


                (function(theModule) {

                    require(["components/" + dependencyList[0] + "/" + dependencyList[0] + "Controller"], function(depMod) {
                        var checkDependency = setInterval(function() {
                            if (depMod.isInitialized()) {
                                theModule.startup();
                                window.clearInterval(checkDependency);
                            }
                        }, 50);
                    });

                }(module))



            } else {

                module.startup().then(function(mid, theModule) {
                    return function() {
                        console.log(">>>>>>>>>>>>>>>>>> >>>>>>>>>>>>>>>>>> STARTED MODULE " + mid, theModule);
                    }
                }(moduleId, module));

            }

        });

    };

    o.stopModule = function(moduleId) {

        require(["components/" + moduleId + "/" + moduleId + "Controller"], function(module) {
            module.stop();
        });

    };

    o.blockComponent = function(targetNode) {
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

    o.resumeComponent = function() {
        //hide blocker
        toolkit.addClass(o._blockingNode, "dijitHidden");
    };




    return o;

});