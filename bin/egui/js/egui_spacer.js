'use strict';

function EguiSpacer(size_array){
    this.description = "Use this object to create space between other objects in a layout";

    this.size_array = size_array;

    egui.Packable.call(this);

    this.draw = function(){
    };

    if (this.size_array) {

        if (this.size_array[0]) {
            this.set_width(this.size_array[0]);
        };

        if (this.size_array[1]) {
            this.set_height(this.size_array[1]);
        };

    };

};

