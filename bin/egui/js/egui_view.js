'use strict';

function EguiViewNew(opts){
    this.description = "Fills all available space and accepts layout packboxes only";

    // TODO
    // Enable views to not consume the entire size of the screen so that they can be used within normal HTML docs

    this.html = $("<div class='egui_view'></div>");
    this.id = Math.floor((Math.random() * 99999) + 10000);

    this.width = 0;
    this.height = 0;
    this.size_set = false;
    this.is_visible = false;

    this.packbox = null;

    this.html.css({
        "background": egui.Color.default,
    });

    this.set_packbox = function(packbox){
        this.packbox = packbox;
        this.packbox.view = this;
        this.html.append(this.packbox.html);
        this.draw_all();
    };

    this.request_resize = function(){
        this.size_set = false;
    };


    this.draw_all = function(width, height){
        // Called whenever the actual size of this box changes - first step
        if (width && width != 0) {
            this.width = width;
        }

        if (height && height != 0) {
            this.height = height;
        }

        this.is_visible = this.html.is(":visible");

        if (!this.is_visible) {
            // This box isn't visible
        }

        if (this.width != 0 && this.height != 0) {
            this.size_set = true;
        }

        if (this.packbox && this.size_set && this.is_visible) {
            // only draw on the 'second' draw, once the size is set
            console.log("---<>---");
            this.packbox.width = this.width;
            this.packbox.height = this.height;
            this.packbox.draw();
        }



    };

    this.check_size = function(){
        var width = $(window).width();
        var height = $(window).height();

        if (width != this.width || height != this.height || !this.size_set) {
            this.draw_all(width, height);
        };

        (function(self){
            requestAnimationFrame(function(){self.check_size()});
        })(this);
    };

    this.check_size();

}

