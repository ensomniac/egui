'use strict';

function EguiInput(){
    this.description = "Describe this Egui constructor..."

    egui.Box.call(this);

    this.primitives["input"] = null;
    this.primitives["placeholder_label"] = null;

    this.height = egui.line_height;
    this.rect.set_expand_y(this.height);

    this.font_size_mult = 0.5;
    this.is_password_input = false;
    this.placeholder_visible = true;

    this.on_enter_callback = null

    this.text_color = egui.input_text_color;
    this.text_color_placeholder = egui.input_placeholder_color;
    this.background_color = egui.input_color;

    this.placeholder_text = "Input Placeholder";

    this.placeholder_label = new egui.Label();
    this.placeholder_label.set_text(this.placeholder_text);
    this.placeholder_label.set_background_color(null);
    this.placeholder_label.set_text_color(this.text_color_placeholder);
    this.placeholder_label.set_text_alignment("left");

    this.primitive.consume(this.placeholder_label);

    this.draw_placeholder_label = function(){
        // this.backing.rect.set(this.rect);
        this.placeholder_label.rect.set(this.rect);

        if (!this.primitives["input"]) {
            this.create_input_object();
        };

        this.set_input_rect();
    };

    this.set_is_password = function(is_password_input){
        this.is_password_input = is_password_input;

        if (this.primitives["input"]) {

            if (this.is_password_input) {
                this.primitives["input"].attr("type", "password");
            }
            else {
                this.primitives["input"].attr("type", "text");
            };

        };
    };

    this.set_placeholder_text = function(placeholder_text){
        this.placeholder_text = placeholder_text;

        if (this.placeholder_label) {
            this.placeholder_label.set_text(this.placeholder_text);
        };
    };

    this.set_input_rect = function(){
        this.primitives["input"].css({
            "width": this.rect.width-(egui.padding*2),
            "height": this.rect.height,
            "left": this.rect.left+egui.padding,
            "top": this.rect.top,
            "line-height": this.rect.height + "px",
            "font-size": (this.rect.height*this.font_size_mult) + "px",
        });
    };

    this.set_placeholder_visible = function(placeholder_visible){
        if (this.placeholder_visible == placeholder_visible) {return};

        this.placeholder_visible = placeholder_visible;

        if (this.placeholder_visible) {
            this.placeholder_label.set_text_opacity(1);
        }
        else {
            this.placeholder_label.set_text_opacity(0);
        }
    };

    this.on_keyup = function(key_code){
        var text = this.get_text();

        if (text.length > 0) {
            this.set_placeholder_visible(false);
        }
        else {
            this.set_placeholder_visible(true);
        };

        if (key_code == 13 && this.on_enter_callback) {
            this.on_enter_callback();
        };

    };

    this.get_text = function(){
        return this.primitives["input"].val();
    };

    this.create_input_object = function(){
        // This should be the only place an instance of a native platform
        // visual element is created. DIV/DRID (HTML/UNITY)

        var type_addl = 'type="text"';
        if (this.is_password_input) {
            type_addl = 'type="password"';
        };

        this.primitives["input"] = $('<input ' + type_addl + '>');
        this.primitives["input"].css({
            "position": "absolute",
            "text-align": "left",
            "padding": 0,
            "margin": 0,
            "color": this.text_color,
            "background": "rgba(0, 0, 0, 0)",
        });

        $("body").append(this.primitives["input"]);
        this.setup_input_events();
    };

    this.set_enter_callback = function(on_enter_callback){
        this.on_enter_callback = on_enter_callback;
    };

    this.setup_input_events = function(){

        (function(self){
            self.primitives["input"].keyup(function(event){self.on_keyup(event.originalEvent.keyCode)});
        })(this);

    };

    (function(self){
        self.on_draw(function(){
            self.draw_placeholder_label();
        });
    })(this);

};
