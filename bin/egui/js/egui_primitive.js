'use strict';

function EguiPrimitive(){
    this.description = "Applied to any element that contains native gui parts";
    this.primitive = true;
    this.primitives = {};

    this.set_opacity = function(opacity){

        for (var primitive_name in this.primitives) {
            if (this.primitives[primitive_name]) {
                this.primitives[primitive_name].css({"opacity": opacity});
            };
        };

    };

    this.stop = function(){
        console.log("Stop animating");
    };

    this.destroy = function(){
        for (var primitive_name in this.primitives) {
            if (this.primitives[primitive_name]) {
                this.primitives[primitive_name].remove();
            };
        };
    };








};

