'use strict';

function EguiButton(){
    this.description = "Describe this Egui constructor..."

    egui.Label.call(this);

    this.height = egui.line_height;
    this.rect.set_expand_y(this.height);

    this.set_text("Egui Button");

    this.set_background_color(egui.button_color);
    this.set_background_hover_color(egui.button_color_hover);

    this.set_text_color(egui.button_text_color);
    this.set_cursor("pointer");
    this.set_pointer_events_active(false);

    this.set_icon = function(icon_name){
        console.log(icon_name);
    };

    // this.draw = function(){
    //     console.log("drawing button");
    // };

    this.on_draw(function(){
        console.log("DDD");
    });

};

