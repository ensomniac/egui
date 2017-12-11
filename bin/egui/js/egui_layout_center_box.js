'use strict';

function EguiLayoutCenterBox(){
    this.description = "Center Box Layout - Great for login boxes"

    egui.Layout.call(this);

    this.background_color = "rgba(20, 20, 20, 0.9)";

    this.width_mult = 0.5;
    this.height_mult = 0.5;

    this.set_background(this.background_color);

    // this.set_opacity = function(opacity){
    //     this.backing.set_opacity(opacity);
    // };

    this.draw_layout = function(){
        // Overrides the draw call for egui.Layout
        var width = (this.rect.width*this.width_mult)-(this.padding_outer*2);
        var height = (this.rect.height*this.height_mult)-(this.padding_outer*2);
        var left = (this.rect.width-width)*0.5;
        var top = (this.rect.height-height)*0.5;

        this.background.rect.set(
            width+(this.padding_outer*2),
            height+(this.padding_outer*2),
            left-this.padding_outer,
            top-this.padding_outer
        );

        if (this.children.length) {
            this.children[0].rect.set(width, height, left, top);
        };

    };

    this.set_shadow = function(left, top, blur){
        // this.backing.set_shadow(left, top, blur);
    };

};


