'use strict';

function EguiBox(opts){
    this.description = "Base Constructor for all visual elements...";

    this.opts = opts || {};
    this.opts["size"] = this.opts["size"] || [-1, -1]; // Container size
    this.opts["background"] = this.opts["background"] || "rgba(255, 255, 255, 0.1)"; // Background color

    this.html = $("<div></div>");
    this.id = Math.floor((Math.random() * 99999) + 10000);

    this.width = 0;
    this.height = 0;
    this.size_set = false;
    this.is_visible = false;

    if (this.opts["size"][0] == -1) {
        this.css_width = "100%";
    }
    else {
        this.css_width = this.opts["size"][0]; // Add a description...
    }

    if (this.opts["size"][1] == -1) {
        this.css_height = "100%";
    }
    else {
        this.css_height = this.opts["size"][1]; // Add a description...
    }

    this.html.css({
        "background": this.opts["background"],
        "width": this.css_width,
        "height": this.css_height,
    });

    this.draw_all = function(width, height){
        // Called whenever the actual size of this box changes - first step
        this.width = width;
        this.height = height;
        this.is_visible = this.html.is(":visible");

        if (!this.is_visible) {
            // This box isn't visible
        }

        if (this.draw && this.size_set && this.is_visible) {
            // only draw on the 'second' draw, once the size is set
            this.draw();
        }

        this.size_set = true;
    };

    this.check_size = function(){
        // var parent = this.html.parent();
        var width = this.html.width();
        var height = this.html.height();


        if (width != this.width || height != this.height) {
            this.draw_all(width, height);
        };

        (function(self){
            setTimeout(function(){self.check_size()}, 50);
        })(this);
    };

    this.check_size();

}


function EguiBoxNew(){
    this.description = "Base Constructor for all visual elements...";

    // this.opts = opts || {};
    // this.opts["size"] = this.opts["size"] || [-1, -1]; // Container size
    // this.opts["background"] = this.opts["background"] || "rgba(255, 255, 255, 0.1)"; // Background color

    this.html = $("<div class='egui_box'></div>");
    this.id = Math.floor((Math.random() * 99999) + 10000);

    this.width_requested = null;
    this.height_requested = null;

    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;

    // this.size_set = false;
    // this.is_visible = false;

    // if (this.opts["size"][0] == -1) {
    //     this.css_width = "100%";
    // }
    // else {
    //     this.css_width = this.opts["size"][0]; // Add a description...
    // }

    // if (this.opts["size"][1] == -1) {
    //     this.css_height = "100%";
    // }
    // else {
    //     this.css_height = this.opts["size"][1]; // Add a description...
    // }

    this.html.css({
        "background": "#333",
        "position": "absolute",
        "top": 0,
        "left": 0,
        "opacity": 0.9,
    });






    this.draw = function(){
        // Width and height are set

        this.html.css({
            "width": this.width,
            "height": this.height,
            "top": this.top,
            "left": this.left,
        });

    };



    // this.draw_all = function(width, height){
    //     // Called whenever the actual size of this box changes - first step
    //     this.width = width;
    //     this.height = height;
    //     this.is_visible = this.html.is(":visible");

    //     if (!this.is_visible) {
    //         // This box isn't visible
    //     }

    //     if (this.draw && this.size_set && this.is_visible) {
    //         // only draw on the 'second' draw, once the size is set
    //         this.draw();
    //     }

    //     this.size_set = true;
    // };

    // this.check_size = function(){
    //     // var parent = this.html.parent();
    //     var width = this.html.width();
    //     var height = this.html.height();

    //     if (width != this.width || height != this.height) {
    //         this.draw_all(width, height);
    //     };

    //     (function(self){
    //         setTimeout(function(){self.check_size()}, 50);
    //     })(this);
    // };

    this.set_background = function(background_color){
        // this.opts["background"] = background_color; // Add a description...
        this.html.css({"background": background_color});
    };

    this.set_size = function(width, height){
        this.width_requested = width;
        this.height_requested = height;
    };

    // this.check_size();
}

