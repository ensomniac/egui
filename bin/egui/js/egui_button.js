'use strict';

function EguiButton(){
    this.description = "Describe this Egui constructor..."

    egui.Label.call(this);

    this.height = egui.line_height;
    this.rect.set_expand_y(this.height);

    this.icon = null;
    this.setup_complete = false;

    this.set_text("Egui Button");

    this.set_background_color(egui.button_color);
    this.set_background_hover_color(egui.button_color_hover);

    this.set_text_color(egui.button_text_color);
    this.set_cursor("pointer");

    this.set_icon = function(icon_name){
        this.icon = new egui.Image();
        this.consume_as("icon_test", this.icon);
    };

    this.draw_icon = function(){
        console.log("Drawing icon");
        this.icon.rect.set(this.rect.width, this.rect.height, this.rect.left, this.rect.top-10);
    };

    this.setup = function(){
        this.setup_complete = true;
        this.set_primitive_pointer_events_active("icon_test", false);
        this.set_primitive_pointer_events_active("label", false);
    };

    this._draw = function(){
        if (!this.setup_complete) {
            this.setup();
        };

        if (this.icon) {
            this.draw_icon();
        };


    };

    (function(self){
        self.on_draw(function(){
            self._draw();
        });
    })(this);

};

