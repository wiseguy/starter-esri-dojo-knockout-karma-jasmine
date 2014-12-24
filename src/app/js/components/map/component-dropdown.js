define(["ko", "core/modelEventController"], function(ko, modelEventController) {

    function ZoomToPlaceWidgetVM(params) {
        //this.chosenValue = ko.observable(params.value);
        this.places = [{
            name: "Australia",
            x: 149.0,
            y: -32.0,
            l: 4
        }, {
            name: "Iran",
            x: 53.0,
            y: 32.0,
            l: 6
        }, {
            name: "Tanzania",
            x: 34.90,
            y: -6.30,
            l: 6
        }];
        this.chosenPlace = ko.observable();


    }

    ZoomToPlaceWidgetVM.prototype.placeSelectHandler = function() {
        modelEventController.zoomToPlace(this.chosenPlace());
    }
    /*LikeWidgetViewModel.prototype.like = function() {
        console.log("like");
        this.chosenValue('like');
    };*/

    /*LikeWidgetViewModel.prototype.dislike = function() {
        console.log("dislike");
        this.chosenValue('dislike');
    };*/

    return ZoomToPlaceWidgetVM;

});