'use strict';

function EguiLayout(){
    this.description = "Describe this Egui constructor..."

    egui.Primitive.call(this);
    egui.Packable.call(this);

    this.children = [];
    this.found_primitives = [];
    this.background = null;

    // MOVE BACKING HERE FOR ALL LAYOUT
    this.backing = null;

    this.drawn = false;
    this.fade_in_on_show = null;

    this.set_width = function(width){
        this.width = width;
        this.rect.set_expand_x(this.width);
    };

    this.set_height = function(height){
        this.height = height;
        this.rect.set_expand_y(this.height);
    };

    this.set_background = function(background_color){
        // This is a helper function to draw a background behind a layout

        if (!this.background) {
            this.background = new egui.Box();
            this.primitive.consume_as("background", this.background);
        };

        this.background.set_background_color(background_color);

    };

    this.draw = function(){

        if (this.background) {
            this.background.rect.set(this.rect);
        };

        if (this.draw_layout) {
            this.draw_layout();
        };

        if (!this.drawn) {
            this.drawn = true;
            if (this.fade_in_on_show) {
                this.fade_in();
            };
        };

    };

    this.destroy = function(){

    };

    this.append = function(child){
        // Must be a packable
        if (child.root != "EguiPackable") {
            console.log("ERROR: Unable to append child. Expected root type EguiPackable");
            console.log(child);
            return;
        };

        this.children.push(child);

    };

    this.fade_in = function(fade_in_complete_callback){
        this.fade_in_complete_callback = fade_in_complete_callback;

        if (!this.drawn) {
            this.fade_in_on_show = true;
            return;
        };

        this.get_all_primitives();
        for (var i in this.found_primitives) {
            this.found_primitives[i].set_opacity(0);
        };

        this.anim = new egui.Anim();
        this.anim.set_duration(750);

        (function(self){

            self.anim.set_update_callback(function(t){

                for (var i in self.found_primitives) {

                    // console.log(self.found_primitives[i]);
                    // console.log(self.found_primitives[i].opacity);

                    console.log(self.found_primitives[i].opacity);

                    self.found_primitives[i].set_opacity(egui.lerp(0, 1, t));
                };

            });

            self.anim.set_complete_callback(function(){

                if (self.fade_in_complete_callback) {
                    self.fade_in_complete_callback();
                };
            });

        })(this);

        this.anim.start();
    };

    this.fade_out = function(fade_out_complete_callback){

        this.on_fade_out_complete_callback = fade_out_complete_callback;
        this.get_all_primitives();

        this.anim = new egui.Anim();
        this.anim.set_duration(250);

        (function(self){

            self.anim.set_update_callback(function(t){

                for (var i in self.found_primitives) {
                    self.found_primitives[i].set_opacity(1-t);
                };

            });

            self.anim.set_complete_callback(function(){

                for (var i in self.found_primitives) {
                    self.found_primitives[i].destroy();
                };

                if (self.on_fade_out_complete_callback) {
                    self.on_fade_out_complete_callback();
                };
            });

        })(this);

        this.anim.start();
    };

    this.get_all_primitives = function(){
        // Search through all children and return any primitives
        this.found_primitives = [];

        if (this.background && this.background["primitives"]) {
            this.found_primitives.push(this.background);
        };

        this.get_children_primitives(this.children);
    };

    this.get_children_primitives = function(children_list){
        // Search through all children and return any primitives

        for (var i in children_list) {
            var child = children_list[i];

            if (child["primitive"]) {
                this.found_primitives.push(child);
            };

            if (child.children) {
                this.get_children_primitives(child.children);
            };

        };
    };

};

