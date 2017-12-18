'use strict';

function EguiButton(){
    this.description = "Describe this Egui constructor..."

    egui.Label.call(this);

    this.height = egui.line_height;
    this.rect.set_expand_y(this.height);

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

    this.setup = function(){
        this.setup_complete = true;
        // this.set_primitive_pointer_events_active("button_icon", false);
        this.set_primitive_pointer_events_active("label", false);
    };

    this._draw = function(){
    };

    this.set_loading = function(is_loading){
        if ((this.is_loading && is_loading) || (!this.is_loading && !is_loading) ) {
            return;
        };

        if (this.icon) {

            this.loading_anim = new egui.Anim();
            this.loading_anim.set_duration(500);

            (function(self, is_loading){

                self.loading_anim.set_update_callback(function(t){
                    self.icon.set_opacity(egui.lerp(self.icon.rest_opacity, 0, t), true);
                });

                self.loading_anim.set_complete_callback(function(){
                    self._set_loading(is_loading);
                });

            })(this, is_loading);

            this.loading_anim.start();

        }
        else {
            this._set_loading(is_loading);
        };

    };


    (function(self){
        self.on_draw(function(){
            self._draw();
        });
    })(this);

};

