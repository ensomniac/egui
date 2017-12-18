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
        var icon_size = (Math.min(this.rect.width, this.rect.height))-(egui.padding*2);


        this.icon.rect.set(
            icon_size,
            icon_size,
            this.rect.left + this.rect.width-icon_size-egui.padding,
            this.rect.top+egui.padding,
        );
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

    this.set_loading = function(is_loading){
        if ((this.is_loading && is_loading) || (!this.is_loading && !is_loading) ) {
            return;
        };

        if (this.icon) {
            console.log("Hide icon");

            console.log(this.icon);

            this.loading_anim = new egui.Anim();
            this.loading_anim.set_duration(750);

            (function(self){

                self.loading_anim.set_update_callback(function(t){
                    self.icon.set_opacity(t);
                    console.log(self.icon);
                });

                self.loading_anim.set_complete_callback(function(){
                    console.log("done");
                    // if (self.fade_in_complete_callback) {
                    //     self.fade_in_complete_callback();
                    // };
                });

            })(this);

            this.loading_anim.start();














        };

        // console.log(this.is_loading);
        // console.log("BUTTON LOADING");
        // this._set_loading(is_loading);


    };


    (function(self){
        self.on_draw(function(){
            self._draw();
        });
    })(this);

};

