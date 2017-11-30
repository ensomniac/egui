'use strict';

function EguiLabel(opts){
    this.description = "Display Label";

    this.opts = opts || {};
    this.size = this.opts["size"] || [-1, egui.line_height]; // Label size
    this.label_text = this.opts["label"] || "EGUI Label"; // Add a description...
    this.font_size = this.opts["font_size"] || egui.font_size; // Add a description...

    // Inherits from Box
    egui.Box.call(this, {"size": this.size});

    this.html.text(this.label_text);

    this.html.css({
        "line-height": this.height + "px",
        "text-align": "center",
        "font-size": this.font_size + "px",
    });

    console.log(egui.font_size);

    // console.log(egui.line_height);

}

