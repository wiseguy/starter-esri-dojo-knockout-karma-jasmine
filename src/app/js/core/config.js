/**
defines all app URL, messages, Layers, outFields
*/

define(function() {

    var o = {

        maxMaps: 6,

        basemapForEachMap: false,

        webMapId: "", //if empty then dont use webmap, example a438a0f666f5413a8b3db9d8f8807245

        appStateCurrent: {
            "v": "map",
            "b": "streets",
            "x": "-101.70!-77.03!-0.12!-122.4!-122.4!-122.4", //! separated x values
            "y": "38.83!38.7!51.50!37.78!37.78!37.78", //! separated y values
            "l": "4!9!10!7!6!5",
            "m": 1, //total maps
            "a": 0 // active map
        },

        appStatePrevious: {}, // to keep track of previous

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

        webmapId: "", //if webmap id used then that will be used to create the map



        mapDefault: { //stuff that is not maintained in appState

            "displayGraphicsOnPan": true

        },

        plugins: {
            analytics: true,
            share: true
        },

        analytics_id: "UA-57085825-1", //google analytics ID

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

        //analytics_url: "",

        services: {
            mapServerPrefix: "http://gisdev.sanacloud.com/arcgis/rest/services/",
            layers: [{
                "id": "attainment",
                "url": "ED_storymaps/Edu_attainment/MapServer", //if url has http then use exact, else append with mapServerPrefix
                "type": "dynamic", //feature, graphic   , tile          
                "visibleLayers": [0, 1]
            }, {
                "id": "soil-survey",
                "url": "http://server.arcgisonline.com/ArcGIS/rest/services/Specialty/Soil_Survey_Map/MapServer", //if url has http then use exact, else append with mapServerPrefix
                "type": "tile", //feature, graphic , tile
            }, {
                "id": "stateBoundaries",
                "url": "ED_storymaps/Private_vs_Pub_schoolEnroll/MapServer/0", //if url has http then use exact, else append with mapServerPrefix
                "type": "feature", //feature, graphic , tile
                "outFields": ["*"],
                "opacity": 0.7
            }, {
                "id": "hoverGraphics",
                "type": "graphic"
            }]
        },

        themes: [{
            id: "swap",
            name: "State Wildlife Action Plan",
            url: "http://maps.natureserve.org/landscope3/rest/services/US/PRI_US_SWAP/MapServer",
            thumbnail: "",
            type: "tile"
        }, {
            id: "nced",
            name: "National Conservation Easment Database",
            url: "http://maps.natureserve.org/landscope1/rest/services/US/PRO_US_NCED/MapServer/",
            thumbnail: "",
            type: "tile"
        }, {
            id: "padus",
            name: "Protected Areas Database of the US ",
            url: "http://maps.natureserve.org/landscope1/rest/services/US/PRO_US_PADUS/MapServer/",
            thumbnail: "",
            type: "tile"
        }],

        messages: {
            "loading": "Loading...",
            "error": "Something is wrong!",
            "browserIncompatible": "This browser is not fully supported. The fully supported browsers list is : <br>"
        }

    };

    return o;

});