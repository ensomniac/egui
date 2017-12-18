'use strict';

function EguiLabel(){
    this.description = "Describe this Egui constructor..."

    egui.Box.call(this);

    this.primitives["label"] = null;
    this.label_text = "EGUI Label";
    this.font_size_mult = 1.0;
    this.text_color = "rgba(0, 0, 0, 0.8)";
    this.text_alignment = "center";

    this.width = -1;
    this.height = egui.line_height;

    this.set_font_size_mult = function(font_size_mult){
        this.font_size_mult = font_size_mult;
    };

    this.set_text = function(label_text){
        this.label_text = label_text;

        if (this.primitives["label"]) {
            this.primitives["label"].text(this.label_text);
        };
    };

    this.set_text_opacity = function(opacity){
        this.primitives["label"].css({"opacity": opacity});
    };

    this.set_text_alignment = function(text_alignment){
        this.text_alignment = text_alignment;

        if (this.primitives["label"]) {
            this.primitives["label"].css({
                "text-align": this.text_alignment,
            });
        };
    };

    this.draw_label = function(){
        // Post draw is fired by the inherited box
        if (!this.primitives["label"]) {
            this.create_label();
        };

        this.set_post_rect();
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

