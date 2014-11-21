/**
defines all app URL, messages, Layers, outFields
*/

define(function() {

    var o = {
        maxMaps: 4,

        viewLinks: [{
            "id": "dashboard",
            "label": "Dashboard",
            "selected": false
        }, {
            "id": "map",
            "label": "Map",
            "selected": false
        }],

        browsersCompatible: [{
            id: "ie",
            name: "Internet Explorer",
            min: 9,
            max: 11
        }, {
            id: "ff",
            name: "Firefox",
            min: 17,
            max: 0 //0 means any
        }, {
            id: "chrome",
            name: "Chrome",
            min: 23,
            max: 0
        }, {
            id: "safari",
            name: "Safari",
            min: 5,
            max: 0
        }],

        appStatePrevious: { //should be identical to appStateCurrent
            "v": "map",
            "b": "streets",
            "l": 8,
            "x": 54.74,
            "y": 23.8,
            "m": 0
        },
        appStateCurrent: { //should be identical to appStatePrevious
            "v": "map",
            "b": "streets",
            "l": 8,
            "x": 54.74,
            "y": 23.8,
            "m": 0
        },

        webmapId: "", //if webmap id used then that will be used to create the map

        totalMaps: 4,

        mapDefault: { //stuff that is not maintained in appState

            "displayGraphicsOnPan": true

        },

        addthis_config: {

            pubid: "ra-546cfa2d5c9aaea9",
            templates: {
                twitter: 'check out http://www.blueraster.com',
            },
            url_transforms: {
                shorten: {
                    twitter: 'bitly',
                    facebook: 'bitly'
                }
            },
            shorteners: {
                bitly: {}
            }
        },

        addthis_url: "http://s7.addthis.com/js/300/addthis_widget.js#domready=1",

        services: {
            mapServerPrefix: "https://gisdev.sanacloud.com/arcgis/rest/services/",
            layers: [{
                "id": "attainment",
                "url": "ED_storymaps/Edu_attainment/MapServer", //if url has http then use exact, else append with mapServerPrefix
                "type": "dynamic", //feature, graphic            
                "visibleLayers": [0, 1]
            }, {
                "id": "stateBoundaries",
                "url": "ED_storymaps/Private_vs_Pub_schoolEnroll/MapServer/0", //if url has http then use exact, else append with mapServerPrefix
                "type": "feature", //feature, graphic
                "outFields": ["*"]
            }, {
                "id": "hoverGraphics",
                "type": "graphic"
            }]
        },

        messages: {
            "loading": "Loading...",
            "error": "Something is wrong!",
            "browserIncompatible": "This browser is not fully supported. The fully supported browsers list is : <br>"
        }

    };

    return o;

});