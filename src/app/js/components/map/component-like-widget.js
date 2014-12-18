define(["ko"], function(ko) {

    function LikeWidgetViewModel(params) {
        this.chosenValue = ko.observable(params.value);
    }

    LikeWidgetViewModel.prototype.like = function() {
        console.log("like");
        this.chosenValue('like');
    };

    LikeWidgetViewModel.prototype.dislike = function() {
        console.log("dislike");
        this.chosenValue('dislike');
    };

    return LikeWidgetViewModel;

});