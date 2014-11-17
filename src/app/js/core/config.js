/**
defines all app URL, messages, Layers, outFields
*/

define(function() {

    var o = {

        appStatePrevious: { //should be identical to appStateCurrent
            "v": "map",
            "b": "streets",
            "l": 8,
            "x": 23.5,
            "y": 54.5
        },
        appStateCurrent: { //should be identical to appStatePrevious
            "v": "map",
            "b": "streets",
            "l": 8,
            "x": 23.5,
            "y": 54.5
        },

        webmapId: "", //if webmap id used then that will be used to create the map

        mapDefault: { //stuff that is not maintained in appState

            "displayGraphicsOnPan": true

        },
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
            "error": "Something is wrong!"
        }

    };

    return o;

});