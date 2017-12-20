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
    this.placeholder_visible = -1;

    this.on_enter_callback = null

    this.text = "";
    this.placeholder_text = "Input Placeholder";

    this.text_color = egui.input_text_color;
    this.text_color_placeholder = egui.input_placeholder_color;
    this.background_color = egui.input_color;

    this.placeholder_label = new egui.Label();
    this.placeholder_label.set_text(this.placeholder_text);
    this.placeholder_label.set_background_color(null);
    this.placeholder_label.set_text_color(this.text_color_placeholder);
    this.placeholder_label.set_text_alignment("left");

    this.primitive.consume_as("placeholder_label", this.placeholder_label);

    this.draw_placeholder_label = function(){
        // this.backing.rect.set(this.rect);
        this.placeholder_label.rect.set(this.rect);

        if (!this.primitives["input"]) {
            this.create_input_object();
        };

        this.set_input_rect();
        this.set_placeholder_visible();

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
            "width": this.rect.width,
            "height": this.rect.height,
            "left": this.rect.left,
            "top": this.rect.top,
            "line-height": this.rect.height + "px",
            "padding-left": egui.padding,
            "padding-right": egui.padding,
            "font-size": (this.rect.height*this.font_size_mult) + "px",
        });
    };

    this.set_placeholder_visible = function(){

        if (this.get_text().length > 0) {
            this.placeholder_visible = false;
        }
        else {
            this.placeholder_visible = true;
        };

        if (this.placeholder_visible) {
            this.placeholder_label.set_text_color(this.text_color_placeholder);
        }
        else {
            this.placeholder_label.set_text_color("rgba(0, 0, 0, 0)");
        }
    };

    this.on_keyup = function(key_code){
        this.text = this.primitives["input"].val();

        this.set_placeholder_visible();

        if (key_code == 13 && this.on_enter_callback) {
            this.on_enter_callback();
        };

    };

    this.get_text = function(){
        return this.text;
    };

    this.set_text = function(text){
        this.text = text;

        if (this.primitives["input"]) {
            this.primitives["input"].val(text);
        };

        this.set_placeholder_visible();

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
            "-webkit-box-shadow": "0 0 0px 1000px white inset",
        });

        $("body").append(this.primitives["input"]);
        this.setup_input_events();
        this.set_text(this.text);
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

