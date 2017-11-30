'use strict';

function EguiStyle(){
    this.description = "Controls the look and feel of everything";

    // You can create a new Style() or just set the public properties of egui.style.SetLineHeight(10);

    // DEFAULTS
    this.style = {};
    this.style["line_height"] = 25;
    this.style["font_size"] = 12;
    this.style["padding"] = 5;
    this.style["button_size"] = this.style["line_height"];

    this.Set = function(){
        for (var key in this.style) {
            egui[key] = this.style[key];
        }

        egui.style = this;
    };

    if (!egui.style) {
        this.Set();
    };

    this.SetLineHeight = function(line_height){
        this.style["line_height"] = line_height;
        this.Set();
    };

    this.SetFontSize = function(font_size){
        this.style["font_size"] = font_size;
        this.Set();
    };

    this.SetPadding = function(padding){
        this.style["padding"] = padding;
        this.Set();
    };


}

