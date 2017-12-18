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
    this.icon_name = "sliders";

    this.set_icon_name = function(icon_name){
        this.icon_name = icon_name;

        if (this.primitives["label_icon"]) {
            this.primitives["label_icon"].removeClass();
            this.primitives["label_icon"].addClass("fa");
            this.primitives["label_icon"].addClass('"fa-' + this.icon_name + '"');
            this.set_post_rect();
        };

    };

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

        this.primitives["label_icon"].css({
            "width": this.rect.width,
            "height": this.rect.width,
            "left": this.rect.left,
            "top": this.rect.top,
            "line-height": this.rect.width + "px",
            "font-size": this.rect.width*(this.scale) + "px",
        });
    };

    this.create_label = function(){
        // This should be the only place an instance of a native platform
        // visual element is created. DIV/DRID (HTML/UNITY)

        this.primitives["label_icon"] = $('<i class="fa fa-' + this.icon_name + '"></i>');
        this.primitives["label_icon"].css({
            "position": "absolute",
            "text-align": this.text_alignment,
            "color": this.text_color,
            "color": "rgba(255, 255, 255, 0.7)",
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

