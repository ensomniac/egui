'use strict';

function EguiPackable(){
    this.description = "Base constructor for any element that can be appended into another";

    this.width = -1;
    this.height = -1;

    this.padding_outer = 0;
    this.padding_inner = 0;

    this.drawn = false;
    this.root = "EguiPackable"; // Only set on objects that are consumed by children
    this.rect = new egui.Rect(this);

    // this.on_draw = function(draw_callback){
    //     this.rect.post_draw_callbacks.push(draw_callback);
    // };

    this.set_width = function(width){
        this.width = width;
        this.rect.set_expand_x(this.width);
    };

    this.set_height = function(height){
        this.height = height;
        this.rect.set_expand_y(this.height);
    };

    this.set_padding_outer = function(padding_outer){
        this.padding_outer = padding_outer;
        this.rect.set_padding_outer(padding_outer);
    };

    this.set_padding_inner = function(padding_inner){
        this.padding_inner = padding_inner;
        this.rect.set_padding_inner(padding_inner);
    };

};

