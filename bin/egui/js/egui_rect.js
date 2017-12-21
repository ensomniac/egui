'use strict';

function EguiRect(drawable){
    this.description = "Store of width, height, top & left. Was: egui.Layout";

    this.drawable = drawable;
    // this.post_draw_callbacks = [];

    // DEFAULTS
    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;

    this.expand_x = -1;
    this.expand_y = -1;

    this.padding_inner = 0;
    this.padding_outer = 0;

    this.lerp = function(layout_a, layout_b, t){
        this.width = egui.lerp(layout_a.width, layout_b.width, t);
        this.height = egui.lerp(layout_a.height, layout_b.height, t);
        this.left = egui.lerp(layout_a.left, layout_b.left, t);
        this.top = egui.lerp(layout_a.top, layout_b.top, t);
        return this;
    };

    this.set = function(width_rect, height, left, top){
        if (width_rect == undefined) {
            return;
        };

        // if (this.padding_inner) {
        //     console.log("Padding inner: " + this.padding_inner);
        // }

        if (width_rect.constructor == egui.Rect) {
            this.width = width_rect.width - (this.padding_outer*2);
            this.height = width_rect.height - (this.padding_outer*2);
            this.left = width_rect.left;
            this.top = width_rect.top;
        }
        else {
            this.width = width_rect - (this.padding_outer*2);
            this.height = height - (this.padding_outer*2);
            this.left = left;
            this.top = top;
        };

        if (this.drawable) {
            this.drawable.drawn = 11;
            this.drawable.draw();
        };

    };

    this.set_expand_x = function(expand_x){
        this.expand_x = expand_x;
    };

    this.set_expand_y = function(expand_y){
        this.expand_y = expand_y;
    };

    this.set_padding_inner = function(padding_inner){
        this.padding_inner = padding_inner;
    };

    this.set_padding_outer = function(padding_outer){
        this.padding_outer = padding_outer;
    };

};

