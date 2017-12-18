'use strict';

function EguiIcon(){
    this.description = "Scalable named vector icons"

    egui.Box.call(this);

    this.primitives["label_icon"] = null;
    this.text_color = "rgba(0, 0, 0, 0.8)";
    this.text_alignment = "center";
    this.scale = 1.0;
    this.width = -1;
    this.height = egui.line_height;

    this.draw_label = function(){
        // Post draw is fired by the inherited box
        if (!this.primitives["label_icon"]) {
            this.create_label();
        };

        this.set_post_rect();
    };

    this.set_color = function(text_color){
        this.text_color = text_color;

        if (this.primitives["label_icon"]) {
            this.primitives["label_icon"].css({
                "color": this.text_color,
            });
        };
    };

    this.set_post_rect = function(){

        var aspect = this.rect.width/this.rect.height;
        var font_size_mult = 0.5;
        var font_size = this.rect.height*font_size_mult;

        this.primitives["label_icon"].css({
            "width": this.rect.width-(egui.padding*2),
            "height": this.rect.height,
            "left": this.rect.left,
            "top": this.rect.top,
            "line-height": this.rect.height + "px",
            "font-size": font_size*(this.scale) + "px",
            "padding-left": egui.padding,
            "padding-right": egui.padding,
            "padding-right": egui.padding,
        });
    };

    this.create_label = function(){
        // This should be the only place an instance of a native platform
        // visual element is created. DIV/DRID (HTML/UNITY)

        this.primitives["label_icon"] = $('<i class="fa fa-camera-retro"></i>');
        this.primitives["label_icon"].css({
            "position": "absolute",
            "text-align": this.text_alignment,
            "color": this.text_color,
            "overflow": "hidden",
            "white-space": "nowrap",
            "text-overflow": "ellipsis",
        });

        // this.set_pointer_events_active(this.pointer_events_active);
        $("body").append(this.primitives["label_icon"]);
    };

    (function(self){
        self.on_draw(function(){
            self.draw_label();
        });
    })(this);

};

