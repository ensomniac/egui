'use strict';

function EguiButton(){
    this.description = "Describe this Egui constructor..."

    egui.Label.call(this);

    this.height = egui.line_height;
    this.rect.set_expand_y(this.height);

    this.button_setup_complete = false;

    this.set_text("Egui Button");

    this.set_background_color(egui.button_color);
    this.set_background_hover_color(egui.button_color_hover);

    this.set_text_color(egui.button_text_color);
    this.set_cursor("pointer");

    this.draw_button = function(){
        if (!this.button_setup_complete) {
            this.setup_button();
        };
    };

    this.setup_button = function(){
        this.button_setup_complete = true;
        this.set_primitive_pointer_events_active("label", false);
    };

    (function(self){
        self.on_draw(function(){
            self.draw_button();
        });
    })(this);

};

