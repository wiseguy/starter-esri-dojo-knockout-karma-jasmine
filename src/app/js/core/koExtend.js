define(["exports", "ko", "core/toolkitController"], function(o, ko, toolkit) {

    o.extend = function() {

        ko.observableArray.fn.filterByProperty = function(propName, matchValue) {
            return ko.pureComputed(function() {
                var allItems = this(),
                    matchingItems = [];
                for (var i = 0; i < allItems.length; i++) {
                    var current = allItems[i];
                    if (ko.unwrap(current[propName]) === matchValue)
                        matchingItems.push(current);
                }
                return matchingItems;
            }, this);
        }



    }


    return o;
});