
//slick-slider fix matchMedia
window.matchMedia = window.matchMedia || function() {
        return {
            matches : false,
            addListener : function() {},
            removeListener: function() {}
        };
    };
