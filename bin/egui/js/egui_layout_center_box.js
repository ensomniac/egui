'use strict';

function EguiLayoutCenterBox(){
    this.description = "Center Box Layout - Great for login boxes"

    egui.Layout.call(this);

    this.draw = function(){
        // Overrides the draw call for egui.Layout

        var width = this.rect.width*0.5;
        var height = this.rect.height*0.5;

        if (this.children.length) {
            this.children[0].rect.set(width, height, (this.rect.width-width)*0.5, (this.rect.height-height)*0.5);
        }

    };

};


