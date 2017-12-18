'use strict';

function EguiPrimitive(){
    this.description = "Applied to any element that contains native gui parts";
    this.primitive = this;

    this.primitives = {};
    this._consumed = {};
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
        var found_primitive = false;

        if (this.primitives[primitive_name]) {
            found_primitive = this.primitives[primitive_name];
        };

        if (!found_primitive) {

            if (this._consumed[primitive_name]) {
                var found = this._consumed[primitive_name].get_primitives();
                console.log(found);
            }
        }

        // console.log("FOUND (" + primitive_name + ")");
        // console.log(found_primitive);

        // console.log(this.primitives);
        // console.log(this._consumed);

        return


        // if (!this.primitives[primitive_name]) {
        //     return;
        // };

        var pointer_events = "none";
        if (pointer_events_active) {
            pointer_events = "auto";
        };

        this.primitives[primitive_name].css({
            "pointer-events": pointer_events,
        });


    };





};

