'use strict';

function EguiModal(){
    this.description = "General Use Modal Container"

    egui.layout.CenterBox.call(this);

    this.show = function(){
        console.log("Show modal");
    };

};

