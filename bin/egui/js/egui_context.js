'use strict';

function EguiContext(){
    this.description = "Base container for an entire Egui document. Similar to Window (HTML) or Screen (Unity).";

    // EGUI - GENERAL DESIGN FLOW
    //
    // CONTEXT
    // --> LAYOUT (PACKBOX)
    // ------> BOX
    // --> LAYOUT (PACKBOX)
    // ------> BOX
    // ------> BOX
    // ------> BOX

    // public
    this.width = 0;
    this.height = 0;
    this.size_set = false;
    this.timer = null;

    this.layout = null;
    this.rect = new egui.Rect(this);
    this.modal = null;

    egui.current_context = this;

    this.draw = function(){
        // Called whenever the window/screen size changes
        // console.log("Context sized " + this.width + " x " + this.height);

        if (this.layout) {
            this.layout.rect.set(this.rect.width, this.rect.height, this.rect.left, this.rect.top);
        };

        if (this.modal) {
            this.modal.rect.set(this.rect.width, this.rect.height, this.rect.left, this.rect.top);
        };

    };

    this.set_modal = function(modal){

        if (this.modal && modal) {
            console.log("ERROR: There is already a modal loaded");
            return;
        };

        // modal might be null
        this.modal = modal;

        if (this.size_set && this.modal) {
            this.draw();
        };

    };

    this.set_layout = function(layout){
        if (layout.root != "EguiPackable") {
            console.log("ERROR: Unable to set layout. Expected root type EguiPackable");
            return;
        };

        if (this.layout) {

            (function(self, new_layout){
                self.layout.fade_out(function(){
                    self.layout = null;
                    self.set_layout(new_layout);
                });
            })(this, layout);

            return;
        };

        this.layout = layout;

        if (this.size_set) {
            this.draw();
        };

    };

    this.set_background_image = function(image_path){
        // This needs to be made generic for other platforms
        $("body").css({
            "background": "#000000",
            "background-image": "url(" + image_path + ")",
            "-webkit-background-size": "cover",
            "-moz-background-size": "cover",
            "-o-background-size": "cover",
            "background-size": "cover",
            "background-repeat": "no-repeat",
            "background-position": "center center",
        });
    };

    this.check_size = function(){
        // HTML = Check window
        // UNITY = Check Screen

        var width = $(window).width();
        var height = $(window).height();

        if (width != this.width || height != this.height || !this.size_set) {
            this.width = width;
            this.height = height;
            this.size_set = true;
            this.rect.set(this.width, this.height, 0, 0);
        };

        (function(self){

            self.time = requestAnimationFrame(function(){
                self.check_size();
            });

        })(this);
    };

    (function(self){

        self.timer = requestAnimationFrame(function(){
            self.check_size();
        });
    })(this);

};

