'use strict';

function EguiModal(){
    this.description = "General Use Modal Container"

    egui.Layout.call(this);

    this.aspect = 1.0;
    this.width_mult = 0.5;
    this.height_mult = 0.5;

    if (!egui.current_context) {
        console.log("WARNING: Unable to locate context for modal");
        return;
    };

    this.content_backing_color = "#666";
    this.backing_color = "rgba(20, 20, 20, 0.9)";
    this.set_background(this.backing_color);

    this.layout = new egui.layout.Vertical();
    this.layout.set_background(this.content_backing_color);

    this.draw_layout = function(){
        var width = (this.rect.width*this.width_mult);
        var height = (this.rect.height*this.height_mult);

        if (this.aspect != -1) {
            height = width/this.aspect;
        };

        var left = (this.rect.width-width)*0.5;
        var top = (this.rect.height-height)*0.5;

        if (this.layout) {
            this.layout.rect.set(width, height, left, top);
        };
    };

    this.show = function(){
        egui.current_context.set_modal(this);
        this.fade_in(null, 100);
        this.layout.fade_in();

    };

    this.hide = function(){
        this.fade_out();

        (function(self){

            self.layout.fade_out(function(){
                self.on_hidden();
            });

        })(this);

    };

    this.on_hidden = function(){
        // Called when it's faded out
        egui.current_context.set_modal(null);
    };

    this.append = function(){
        console.log("Overriddden append");
    };

    (function(self){

        self.background.set_click_callback(function(){
            self.hide();
        });

    })(this);

};

