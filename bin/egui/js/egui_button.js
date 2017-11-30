'use strict';

function EguiButton(opts){
    this.description = "Button";

    this.opts = opts || {};
    this.label_text = this.opts["label"] || "EGUI Label"; // Add a description...
    this.font_size = this.opts["font_size"] || egui.font_size; // Add a description...
    this.height = egui.line_height;

    console.log(this.height);

    // Inherits from Box
    egui.Box.call(this, {"size": this.size});

    this.html.css({
        "line-height": this.height + "px",
        "height": this.height,
        "text-align": "center",
        "font-size": this.font_size + "px",
        "background": "red",
    });

    // OPTION
    this.set_label = function(str_label_text){
        this.label_text = str_label_text;
        this.html.text(this.label_text);
    };




    this.set_label(this.label_text);

}

