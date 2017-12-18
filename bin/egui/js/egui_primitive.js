'use strict';

function EguiPrimitive(){
    this.description = "Applied to any element that contains native gui parts";
    this.primitive = this;

    this.primitives = {};
    this.consumed = [];
    this.pointer_events_active = true;

    this.set_opacity = function(opacity){

        var primitives = this.get_primitives();

        for (var i in primitives) {
            primitives[i].css({"opacity": opacity});
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
        for (var i in this.consumed) {
            primitives = primitives.concat(this.consumed[i].get_primitives());
        };

        return primitives;

    };

    this.consume_as = function(primitive_name, primitive_elem){
        // This is generally used when one primitive instantiates another primitive
        // and needs to control their child primitives
        primitive_elem.consumed_as = primitive_name;

        this.consumed.push(primitive_elem);
        this.primitives = this.get_primitives();

    };

    this.set_primitive_pointer_events_active = function(primitive_name, pointer_events_active){
        if (!this.primitives[primitive_name]) {
            return;
        };

        var pointer_events = "none";
        if (pointer_events_active) {
            pointer_events = "auto";
        };

        this.primitives[primitive_name].css({
            "pointer-events": pointer_events,
        });


    };





};

