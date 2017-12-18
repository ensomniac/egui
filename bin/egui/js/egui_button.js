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

    // this.set_image = function(img_src){
    //     this.image = new egui.Image();
    //     this.consume_as("image", this.image);
    // };

    this.set_icon = function(icon_name){
        this.icon = new egui.Icon();
        this.icon.set_background_color(null);
        this.icon.set_icon_name(icon_name);
        this.consume_as("button_icon", this.icon);
    };

    this.draw_icon = function(){
        this.icon.rect.set(this.rect);
    };

    this.setup = function(){
        this.setup_complete = true;
        this.set_primitive_pointer_events_active("button_icon", false);
        this.set_primitive_pointer_events_active("label", false);
    };

    this._draw = function(){
        if (this.icon) {
            this.draw_icon();
        };

        if (!this.setup_complete) {
            this.setup();
        };

    };

    (function(self){
        self.on_draw(function(){
            self._draw();
        });
    })(this);

};

