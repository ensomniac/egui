'use strict';

function EguiPrimitive(){
    this.description = "Applied to any element that contains native gui parts";
    this.primitive = this;

    this.primitives = {};
    this.consumed = [];

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

    this.consume = function(primitive_elem){
        // This is generally used when one primitive instantiates another primitive
        // and needs to control their child primitives

        this.consumed.push(primitive_elem);

    };






};
