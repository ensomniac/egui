'use strict';

function EguiLayout(){
    this.description = "Describe this Egui constructor..."

    egui.Primitive.call(this);
    egui.Packable.call(this);

    this.children = [];
    this.layers = [];

    this.found_primitives = [];
    this.background = null;

    // MOVE BACKING HERE FOR ALL LAYOUT
    this.backing = null;

    this.drawn = false;

    this.fade_in_complete_callback = null;
    this.on_fade_out_complete_callback = null;

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

        if (!this.drawn) {
            this.drawn = true;
        };

        if (this.background) {

            this.background.rect.set(
                this.rect.width,
                this.rect.height,
                this.rect.left,
                this.rect.top
            );

        };

        if (this.draw_layout) {
            this.draw_layout();
        };

        if (!this.drawn) {
            this.drawn = true;
        };

        if (this.layers.length) {
            for (var i in this.layers) {
                this.layers[i].rect.set(this.rect);
            };
        };

    };

    this.destroy = function(){
        // This is automatically called on fade_out(), but that will need to be fixed

        this.get_all_primitives();
        for (var i in this.found_primitives) {
            this.found_primitives[i].destroy();
        };

    };

    this.empty = function(){
        if (this.children.length == 0 && this.layers.length == 0) {
            return;
        };

        for (var i in this.children) {
            this.children[i].destroy();
        };

        for (var i in this.layers) {
            this.layers[i].destroy();
        };

        this.children = [];
        this.layers = [];

        this.draw();

    };

    this.append = function(child){
        // Must be a packable
        if (child.root != "EguiPackable") {
            console.log("ERROR: Unable to append child. Expected root type EguiPackable");
            console.log(child);
            return;
        };

        this.children.push(child);

        if (this.drawn) {
            // Since this has already been drawn, we need to force a redraw now
            this.draw();
        };
    };

    this.append_layer = function(child_layer){
        // Must be a packable
        if (child_layer.root != "EguiPackable") {
            console.log("ERROR: Unable to append child layer. Expected root type EguiPackable");
            console.log(child_layer);
            return;
        };

        // child_layer.is_layer = true;
        this.layers.push(child_layer);

        if (this.drawn) {
            // Since this has already been drawn, we need to force a redraw now
            this.draw();
        };
    };

    this.fade_in = function(fade_in_complete_callback, speed){
        this.fade_in_complete_callback = fade_in_complete_callback;

        this.get_all_primitives();
        for (var i in this.found_primitives) {
            this.found_primitives[i].set_opacity(0, true);
        };

        this.anim = new egui.Anim();
        this.anim.set_duration(speed || 400);

        (function(self, fade_in_complete_callback){

            self.anim.set_update_callback(function(t){

                for (var i in self.found_primitives) {
                    // console.log(self.found_primitives[i].rest_opacity);
                    self.found_primitives[i].set_opacity(egui.lerp(0, self.found_primitives[i].rest_opacity, t), true);
                };

            });

            self.anim.set_complete_callback(function(){

                if (self.fade_in_complete_callback) {
                    self.fade_in_complete_callback();
                };
            });

        })(this, fade_in_complete_callback);

        this.anim.start();
    };

    this.fade_out = function(fade_out_complete_callback, speed){

        this.on_fade_out_complete_callback = fade_out_complete_callback;
        this.get_all_primitives();

        this.anim = new egui.Anim();
        this.anim.set_duration(speed || 250);

        (function(self){

            self.anim.set_update_callback(function(t){

                for (var i in self.found_primitives) {
                    self.found_primitives[i].set_opacity(1-t, true);
                };

            });

            self.anim.set_complete_callback(function(){

                self.destroy();

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
        this.get_children_primitives(this.layers);
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

            if (child.layers) {
                this.get_children_primitives(child.layers);
            };
        };
    };
};

