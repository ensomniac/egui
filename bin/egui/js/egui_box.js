'use strict';

function EguiBox(){
    this.description = "Describe this Egui constructor..."

    egui.Primitive.call(this);
    egui.Packable.call(this);

    this.primitives["box"] = null;
    this.background_color = egui.random_color();
    this.background_hover_color = null;

    this.corner_radius = egui.corner_radius;
    this.cursor = egui.cursor;
    this.background_image_src = null;
    this.shadow = null;
    this.border = null;
    this.on_click_callback = null;
    this.pointer_events_active = true;

    this.post_draw_callbacks = [];

    this.set_background_image = function(background_image_src){
        this.background_image_src = background_image_src;

        if (this.primitives["box"]) {
            this.primitives["box"].css({
                "background-image": "url(" + this.background_image_src + ")",
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover",
                "background-repeat": "no-repeat",
                "background-position": "center center",
            });
        };
    };

    this.set_pointer_events_active = function(pointer_events_active){
        this.pointer_events_active = pointer_events_active;

        if (this.primitives["box"]) {

            var pointer_events = "none";
            if (this.pointer_events_active) {
                pointer_events = "auto";
            };

            this.primitives["box"].css({
                "pointer-events": pointer_events,
            });
        };
    };

    this.on_draw = function(draw_callback){
        this.post_draw_callbacks.push(draw_callback);
    };

    // this.set_opacity = function(opacity){
    //     this.primitives["box"].animate({"opacity": opacity});
    // };

    this.set_shadow = function(left, top, blur){
        this.shadow = [left, top, blur];

        if (this.primitives["box"]) {
            this.primitives["box"].css({
                "box-shadow": left + "px " + top + "px " + blur + "px rgba(0, 0, 0, 1)",
            });
        };
    };

    this.set_background = function(background_color){
        this.set_background_color(background_color);
    };

    this.set_background_color = function(background_color){
        if (!background_color) {
            background_color = "rgba(0, 0, 0, 0)";
        }

        this.background_color = background_color;

        if (this.primitives["box"]) {
            this.primitives["box"].css({"background": this.background_color});
        };
    };

    this.set_background_hover_color = function(background_hover_color){
        this.background_hover_color = background_hover_color;
    };

    this.draw = function(){

        if (!this.primitives["box"]) {
            this.create_box_object();
        };

        this.set_rect();

        for (var i in this.post_draw_callbacks) {
            this.post_draw_callbacks[i]();
        };
    };

    this.set_rect = function(){
        this.primitives["box"].css({
            "width": this.rect.width,
            "height": this.rect.height,
            "left": this.rect.left,
            "top": this.rect.top,
        });
    };

    this.create_box_object = function(){
        // This should be the only place an instance of a native platform
        // visual element is created. DIV/DRID (HTML/UNITY)

        this.primitives["box"] = $("<div></div>");
        this.primitives["box"].css({
            "position": "absolute",
            "background": this.background_color,
            "border-radius": this.corner_radius,
            "cursor": this.cursor,
        });

        if (this.shadow) {
            this.set_shadow(this.shadow[0], this.shadow[1], this.shadow[2]);
        };

        if (this.background_image_src) {
            this.set_background_image(this.background_image_src);
        };

        $("body").append(this.primitives["box"]);

        this.setup_events();
    };

    this.set_cursor = function(cursor){
        this.cursor = cursor;

        if (this.primitives["box"]) {
            this.primitives["box"].css({
                "cursor": this.cursor,
            });
        };
    };

    this.on_mouse_in = function(){
        if (this.background_hover_color && this.primitives["box"]) {
            this.primitives["box"].css({"background": this.background_hover_color});
        };
    };

    this.on_mouse_out = function(){
        if (this.background_hover_color && this.primitives["box"]) {
            this.primitives["box"].css({"background": this.background_color});
        };
    };

    this.set_click_callback = function(on_click_callback){
        this.on_click_callback = on_click_callback;
        console.log("SET");
        console.log(this.on_click_callback);
    };

    this.on_click = function(){
        if (this.on_click_callback) {
            this.on_click_callback();
        }
        else {
            console.log("nope");
            console.log(this);
        }
    };

    this.setup_events = function(){

        if (!this.pointer_events_active) {
            return;
        };

        (function(self){
            self.primitives["box"].mouseenter(function(){self.on_mouse_in()});
            self.primitives["box"].mouseleave(function(){self.on_mouse_out()});
            self.primitives["box"].click(function(){self.on_click()});
        })(this);

    };

};

