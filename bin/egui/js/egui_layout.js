'use strict';

function EguiLayout(){
    this.description = "Describe this Egui constructor..."
    egui.Packable.call(this);

    this.description = "Base constructor for all layout elements";

    this.children = [];

    this.draw = function(){
        // This draw call is often overwritten by inherited members
        console.log("Drawing Layout");
    };

    this.append = function(child){
        // Must be a packable
        if (child.root != "EguiPackable") {
            console.log("ERROR: Unable to append child. Expected root type EguiPackable");
            console.log(child);
            return;
        };

        this.children.push(child);

    };

};

