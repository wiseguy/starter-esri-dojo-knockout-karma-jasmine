/**
defines all app URL, messages, Layers, outFields
*/

define(function() {

    var o = {

        appStatePrevious: { //should be identical to appStateCurrent
            "v": "map",
            "b": "streets",
            "l": 5,
            "x": 23.5,
            "y": 54.5
        },
        appStateCurrent: { //should be identical to appStatePrevious
            "v": "map",
            "b": "streets",
            "l": 5,
            "x": 23.5,
            "y": 54.5
        },

        webmapId: "", //if webmap id used then that will be used to create the map

        mapDefault: { //stuff that is not maintained in appState

            "displayGraphicsOnPan": true

        },
        services: {
            layers: [{
                "id": "schools",
                "url": "http://",
                "outFields": ["*"]
            }]
        },
        messages: {
            "loading": "Loading...",
            "error": "Something is wrong!"
        }

    };

    return o;

});