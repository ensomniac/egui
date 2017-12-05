'use strict';

function EguiRect(drawable){
    this.description = "Store of width, height, top & left. Was: egui.Layout";

    this.drawable = drawable;

    // DEFAULTS
    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;

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

        if (width_rect.constructor == egui.Rect) {
            this.width = width_rect.width;
            this.height = width_rect.height;
            this.left = width_rect.left;
            this.top = width_rect.top;
        }
        else {
            this.width = width_rect;
            this.height = height;
            this.left = left;
            this.top = top;
        };

        this.drawable.draw();

    };

};

