'use strict';

function EguiLabel(){
    this.description = "Describe this Egui constructor..."

    egui.Box.call(this);

    this.label = null;
    this.label_text = "EGUI Label";
    this.font_size_mult = 0.5;

    this.set_text = function(label_text){
        this.label_text = label_text;

        if (this.label) {
            this.label.text(this.label_text);
        };

    };

    this.post_draw = function(){
        // Post draw is fired by the inherited box

        if (!this.label) {
            this.create_label_object();
        };

        this.set_post_rect();

    };

    this.set_post_rect = function(){
        this.label.css({
            "width": this.rect.width,
            "height": this.rect.height,
            "left": this.rect.left,
            "top": this.rect.top,
            "line-height": this.rect.height + "px",
            "font-size": (this.rect.height*this.font_size_mult) + "px",
        });

    };

    this.create_label_object = function(){
        // This should be the only place an instance of a native platform
        // visual element is created. DIV/DRID (HTML/UNITY)

        this.label = $("<div>" + this.label_text + "</div>");
        this.label.css({
            "position": "absolute",
            "text-align": "center",
        });
        $("body").append(this.label);

    };



};

