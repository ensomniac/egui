'use strict';

function EguiBox(opts){
    this.description = "Describe this Egui constructor..."
    egui.Packable.call(this);

    this.description = "Base Constructor for all visual elements...";

    this.box = null;

    this.background = egui.random_color();
    this.corner_radius = 0;
    this.shadow = null;
    this.border = null;

    this.draw = function(){

        if (!this.box) {
            this.create_box_object();
        };

        this.set_rect();

        if (this.post_draw) {
            this.post_draw();
        };

    };

    this.set_rect = function(){
        this.box.css({
            "width": this.rect.width,
            "height": this.rect.height,
            "left": this.rect.left,
            "top": this.rect.top,
        });
    };

    this.create_box_object = function(){
        // This should be the only place an instance of a native platform
        // visual element is created. DIV/DRID (HTML/UNITY)

        this.box = $("<div></div>");
        this.box.css({
            "position": "absolute",
            "background": this.background,
        });

        $("body").append(this.box);

    };

};

