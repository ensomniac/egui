'use strict';

function EguiStyle(){
    this.description = "Controls the look and feel of everything";

    // You can create a new Style() or just set the public properties of egui.style.SetLineHeight(10);

    // DEFAULTS
    this.style = {};
    this.style["line_height"] = 30;
    this.style["font_size"] = 12;
    this.style["padding"] = 10;
    this.style["corner_radius"] = 2;
    this.style["button_size"] = this.style["line_height"];
    this.style["button_color"] = "#506279";
    this.style["button_color_hover"] = "#677a91";
    this.style["button_text_color"] = "rgba(255, 255, 255, 0.8)";

    this.style["input_color"] = "rgba(220, 220, 220, 0.9)";
    this.style["input_text_color"] = "rgba(0, 0, 0, 0.9)";
    this.style["input_placeholder_color"] = "rgba(100, 100, 100, 0.9)";

    this.style["cursor"] = "pointer";

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

