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

    this.width = 0;
    this.height = 0;
    this.size_set = false;
    this.timer = null;

    this.layout = null;
    this.rect = new egui.Rect(this);

    this.draw = function(){
        // Called whenever the window/screen size changes
        console.log("Context sized " + this.width + " x " + this.height);

        if (this.layout) {
            this.layout.rect.set(this.rect.width, this.rect.height, this.rect.left, this.rect.top);
        };

    };

    this.set_layout = function(layout){
        if (layout.root != "EguiPackable") {
            console.log("ERROR: Unable to set layout. Expected root type EguiPackable");
            return;
        };

        this.layout = layout;

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

