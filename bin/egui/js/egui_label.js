'use strict';

function EguiLabel(){
    this.description = "Describe this Egui constructor..."

    egui.Box.call(this);

    this.primitives["label"] = null;
    this.label_text = "EGUI Label";
    this.font_size_mult = 1.0;
    this.text_color = egui.text_color;

    this.text_alignment = "center";
    this.icon_alignment = "right";

    this.width = -1;
    this.height = egui.line_height;

    this.is_loading = false;
    this.load_dots = null;
    this.icon = null;
    this.label_setup_complete = false;

    this.progress_bar = null;
    this.progress_bar_height = egui.padding;
    this.progress_bar_progress_norm = 0;

    this.set_icon = function(icon_name){
        this.icon = new egui.Icon();
        this.icon.set_background_color(null);
        this.icon.set_icon_name(icon_name);
        this.consume_as("button_icon", this.icon);

        // if (click_callback) {
        //     this.icon.set_click_callback(function(){
        //         console.log("click");
        //     });
        // };

    };

    this.set_loading = function(is_loading){
        if (is_loading) {
            this.loading_dots_start();
        }
        else {
            this.loading_dots_stop();
        };
    };

    this.loading_dots_stop = function(){
        if (!this.is_loading) {
            return;
        };

        this.is_loading = false;

        if (!this.load_dots) {
            //console.log("They didn't start yet");
        }
        else {
            this.load_dots.stop();
            this.load_dots = null;
        };

        if (this.loading_anim && this.icon) {
            this.loading_anim.stop();

            this.loading_anim = new egui.Anim();
            this.loading_anim.set_duration(200);

            var start_opac = this.icon.opacity;

            (function(self, start_opac){

                self.loading_anim.set_update_callback(function(t){
                    self.icon.set_opacity(egui.lerp(start_opac, self.icon.rest_opacity, t), true);
                });

                self.loading_anim.set_complete_callback(function(){
                    self.loading_anim = null;

                });

            })(this, start_opac);

            this.loading_anim.start();

        };

    };

    this.set_progress_bar = function(progress_norm){
        this.progress_bar_progress_norm = progress_norm;

        if (!this.progress_bar) {
            this.progress_bar = new egui.Box();
            this.progress_bar.set_background_color("rgba(255, 255, 255, 0.75)");
        };

        if (this.drawn) {
            this.draw_label();
        };

    };

    this.loading_dots_start = function(){
        if (this.is_loading) {
            return;
        };

        this.is_loading = true;

        if (this.icon) {
            // There's an icon that needs to be hidden first

            this.loading_anim = new egui.Anim();
            this.loading_anim.set_duration(200);

            (function(self){

                self.loading_anim.set_update_callback(function(t){
                    self.icon.set_opacity(egui.lerp(self.icon.rest_opacity, 0, t), true);
                });

                self.loading_anim.set_complete_callback(function(){
                    self._loading_dots_start();
                });

            })(this);

            this.loading_anim.start();

        }
        else {
            this._loading_dots_start();
        };
    };

    this._loading_dots_start = function(){

        if (!this.is_loading) {
            // The dots were cancelled before an icon faded out
            return;
        };

        this.load_dots = new egui.LoadDots();
        this.load_dots.start();

        this.consume_as("label_load_dots", this.load_dots);
        this.draw_label();
    };

    this.draw_load_dots = function(){
        var icon_size = (Math.min(this.rect.width, this.rect.height))-(egui.padding*2);

        this.load_dots.rect.set(
            icon_size,
            icon_size,
            this.rect.left + this.rect.width-icon_size-egui.padding,
            this.rect.top+egui.padding
        );
    };

    this.set_font_size_mult = function(font_size_mult){
        this.font_size_mult = font_size_mult;
    };

    this.set_text = function(label_text){
        this.label_text = label_text;

        if (this.primitives["label"]) {
            this.primitives["label"].text(this.label_text);
        };
    };

    this.set_text_alignment = function(text_alignment){
        this.text_alignment = text_alignment;

        if (this.primitives["label"]) {
            this.primitives["label"].css({
                "text-align": this.text_alignment,
            });
        };
    };

    this.set_icon_alignment = function(icon_alignment){
        this.icon_alignment = icon_alignment;

        if (this.icon) {
            this.draw_icon();
        };
    };

    this.draw_icon = function(){
        var icon_size = (Math.min(this.rect.width, this.rect.height))-(egui.padding*2);

        var left = 0;
        if (this.icon_alignment == "left") {
            left = 0;
        }
        else if (this.icon_alignment == "center") {
            left = this.rect.left + (this.rect.width*0.5) - (icon_size*0.5);
        }
        else {
            left = this.rect.left + this.rect.width-icon_size-egui.padding;
        };

        this.icon.rect.set(
            icon_size,
            icon_size,
            left,
            this.rect.top+egui.padding
        );
    };

    this.draw_label = function(){
        // Post draw is fired by the inherited box
        if (!this.primitives["label"]) {
            this.create_label();
        };

        if (this.icon) {
            this.draw_icon();
        };

        if (this.load_dots) {
            this.draw_load_dots();
        };

        if (!this.label_setup_complete) {
            this.setup_label();
        };

        if (this.progress_bar) {

            this.progress_bar.rect.set(
                egui.lerp(0, this.rect.width, this.progress_bar_progress_norm),
                this.progress_bar_height,
                this.rect.left,
                this.rect.top + this.rect.height - this.progress_bar_height,
            );

        };

        this.set_post_rect();
    };

    this.setup_label = function(){
        this.label_setup_complete = true;
        this.set_primitive_pointer_events_active("button_icon", false);
    };

    this.set_text_color = function(text_color){
        this.text_color = text_color;

        if (this.primitives["label"]) {
            this.primitives["label"].css({
                "color": this.text_color,
            });
        };
    };

    this.set_post_rect = function(){

        var aspect = this.rect.width/this.rect.height;
        var font_size_mult = 1.0;
        var font_size = this.rect.height;

        if (aspect > 1) {
            // Wide label
            font_size_mult = 0.4;
            font_size = (this.rect.height*font_size_mult);
        }
        else {
            var aspect_scale_norm = egui.inverse_lerp(0.01, 1, aspect);
            font_size_mult = egui.lerp(0.1, 0.5, aspect_scale_norm);
            font_size = (this.rect.width*font_size_mult);
        }

        this.primitives["label"].css({
            "width": this.rect.width-(egui.padding*2),
            "height": this.rect.height,
            "left": this.rect.left,
            "top": this.rect.top,
            "line-height": this.rect.height + "px",
            "font-size": font_size*(this.font_size_mult) + "px",
            "font-size": egui.font_size + "px",
            "padding-left": egui.padding,
            "padding-right": egui.padding,
        });

    };

    this.create_label = function(){
        // This should be the only place an instance of a native platform
        // visual element is created. DIV/DRID (HTML/UNITY)

        this.primitives["label"] = $("<div>" + this.label_text + "</div>");
        this.primitives["label"].css({
            "position": "absolute",
            "text-align": this.text_alignment,
            "color": this.text_color,
            "overflow": "hidden",
            "white-space": "nowrap",
            "text-overflow": "ellipsis",
        });

        // this.set_pointer_events_active(this.pointer_events_active);
        $("body").append(this.primitives["label"]);
    };

    (function(self){
        self.on_draw(function(){
            self.draw_label();
        });
    })(this);

};

