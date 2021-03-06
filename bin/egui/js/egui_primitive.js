'use strict';

function EguiPrimitive(){
    this.description = "Applied to any element that contains native gui parts";
    this.primitive = this;

    this.primitives = {};
    this._consumed = {};

    // PRIMITIVE NATIVE
    this.pointer_events_active = true;
    this.rest_opacity = 1; // Normally set with this.opacity, but can be set independantly for animation state storage
    this.opacity = 1;
    this.tooltip = "";

    this.set_tooltip = function(tooltip){
        this.tooltip = tooltip;

        if (this.drawn) {
            var primitives = this.get_primitives();

            for (var i in primitives) {
                primitives[i].attr({"title": tooltip});
            };
        };
    };

    this.set_opacity = function(opacity, skip_set){
        // When skip_set is true, this.rest_opacity is not set
        if (!skip_set) {
            // console.log("Setting rest opac from " + this.rest_opacity + " to " + opacity);
            this.rest_opacity = opacity;
        };

        this.opacity = opacity;
        var primitives = this.get_primitives();

        for (var i in primitives) {
            primitives[i].css({"opacity": this.opacity});
        };

    };

    this.stop = function(){
        console.log("Stop animating");
    };

    this.destroy = function(){
        var primitives = this.get_primitives();

        for (var i in primitives) {
            primitives[i].remove();
        };

    };

    this.get_primitives = function(){
        var primitives = [];

        for (var primitive_name in this.primitives) {
            if (this.primitives[primitive_name]) {
                primitives.push(this.primitives[primitive_name]);
            };
        };

        // Include any consumed primitives
        for (var consumed_name in this._consumed) {
            primitives = primitives.concat(this._consumed[consumed_name].get_primitives());
        };

        return primitives;

    };

    this.consume_as = function(primitive_name, primitive_elem){
        // This is generally used when one primitive instantiates another primitive
        // and needs to control their child primitives

        this._consumed[primitive_name] = primitive_elem;

    };

    this.set_primitive_pointer_events_active = function(primitive_name, pointer_events_active){
        var found_primitives = [];

        if (this.primitives[primitive_name]) {
            found_primitives = [this.primitives[primitive_name]];
        };

        if (this._consumed[primitive_name]) {
            var consumed_primitives = this._consumed[primitive_name].get_primitives();
            for (var i in consumed_primitives) {
                found_primitives.push(consumed_primitives[i]);
            };
        };

        var pointer_events = "none";
        if (pointer_events_active) {
            pointer_events = "auto";
        };

        for (var i in found_primitives) {
            found_primitives[i].css({
                "pointer-events": pointer_events,
            });
        };

    };

};

