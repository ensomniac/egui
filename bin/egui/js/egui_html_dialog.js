'use strict';

function EguiHTMLDialog(label){
    this.description = "HTML Dialog";

    this.label = label;

    this.width = 400;
    this.height = egui.line_height + (egui.padding*2);
    this.button_width = 0;
    this.button_top = 0;
    this.callback = null;

    this.html = $("<div></div>");
    this.backing = $("<div></div>");
    this.dialog = $("<div></div>");

    this.button_okay = new egui.html.Button("Okay");
    this.button_cancel = new egui.html.Button("Cancel");

    this.html.append(this.backing);
    this.html.append(this.dialog);

    this.dialog.append(this.button_okay.html);
    this.dialog.append(this.button_cancel.html);

    this.buttons = [];
    this.fields = [];

    this.set_callback = function(callback){
        this.callback = callback;
    };

    this.add_field = function(key, value, object){
        var field_store = {};
        field_store["key"] = key;
        field_store["value"] = value;
        field_store["object"] = object;
        this.fields.push(field_store);
    };

    this.add_string = function(key, value, label_text){
        var font_size = (egui.line_height*0.5);
        var label_width = (font_size*0.58)*label_text.length;
        var string = $("<div></div>");
        var label = $("<div>" + label_text + "</div>");
        var input_anchor = $("<div></div>");
        var input = $("<input type='text' placeholder='" + label_text + "'>");

        input.val(value);
        string.append(label);
        string.append(input_anchor);
        input_anchor.append(input);

        string.css({
            "height": egui.line_height,
            "margin-top": egui.padding,
            "color": "rgba(255, 255, 255, 0.8)",
            "background": "rgba(255, 255, 255, 0.05)",
        });

        label.css({
            "height": egui.line_height,
            "font-size": font_size + "px",
            "line-height": egui.line_height + "px",
            "text-align": "left",
            "color": "rgba(255, 255, 255, 0.5)",
            "width": label_width,
            "vertical-align": "top",
            "padding-left": egui.padding,
            "white-space": "nowrap",
            "overflow": "hidden",
            "text-overflow": "ellipsis",
        });

        input_anchor.css({
            "position": "absolute",
            "left": label_width + egui.padding,
            "top": 0,
            "width": this.width-label_width-(egui.padding*1),
            "height": egui.line_height,
            "padding": 0,
            "margin": 0,
        });

        input.css({
            "position": "absolute",
            "left": 0,
            "top": 0,
            "margin": 0,
            "padding": 0,
            "font-size": font_size + "px",
            "line-height": egui.line_height + "px",
            "height": egui.line_height,
            "width": "100%",
            "background": "rgba(0, 0, 0, 0)",
            "color": "rgba(255, 255, 255, 0.9)",
        });

        (function(self, input){

            input.keypress(function (e) {
                if (e.which == 13) {
                    self.on_okay();
                    self.close();
                    return false;
                }
            });

            input.click(function(){
                var was_highlighted = input.attr("highlighted");

                if (!was_highlighted) {
                    input.get(0).setSelectionRange(0,1000);
                    input.attr("highlighted", "true");
                };

            });


        })(this, input);

        this.dialog.append(string);
        this.height += (egui.line_height + egui.padding);
        this.add_field(key, value, input);
    };

    this.add_label = function(label_text){
        var label = $("<div>" + label_text + "</div>");

        this.dialog.append(label);

        label.css({
            "height": egui.line_height,
            "font-size": (egui.line_height*0.55) + "px",
            "line-height": egui.line_height + "px",
            "text-align": "center",
            "margin-top": egui.padding,
            "color": "rgba(255, 255, 255, 0.8)",
            "background": "rgba(255, 255, 255, 0.05)"
        });

        this.height += (egui.line_height + egui.padding);
    };

    this.add_button = function(label_text, callback){

        var button = new egui.html.Button(label_text);

        (function(self, button, callback){
            button.click(function(){
                self.close();
                callback();
            });
        })(this, button, callback);

        this.dialog.append(button.html);
        this.buttons.push({"label_text": label_text, "callback": callback, "button": button});
    };

    this.set_styles = function(){
        this.html.css({
            "position": "absolute",
            "left": 0,
            "top": 0,
        });

        this.backing.css({
            "position": "fixed",
            "left": 0,
            "top": 0,
            "right": 0,
            "bottom": 0,
            "background": "rgba(0, 0, 0, 0.5)",
            "opacity": 0,
        });

        this.dialog.css({
            "position": "absolute",
            "background": "rgba(60, 60, 60, 0.9)",
            "border-radius": egui.padding*0.5,
            "opacity": 0,
            "padding-left": egui.padding,
            "padding-right": egui.padding,
        });
    };

    this.show = function(){
        var left = ($(window).width()*0.5)-(this.width*0.5);
        var top = ($(window).height()*0.33)-(this.height*0.5);

        this.dialog.css({
            "left": left,
            "top": top,
            "width": this.width,
            "height": this.height,
        });

        this.button_top = this.height-egui.line_height-egui.padding;
        var num_buttons = 2 + this.buttons.length; // Default
        var button_left = egui.padding;

        this.button_width = (this.width/num_buttons)-(egui.padding*(num_buttons-1));
        this.button_width = ((this.width-(egui.padding*2))/num_buttons);

        this.button_cancel.draw(this.button_width, egui.line_height, button_left, this.button_top);
        button_left += this.button_width + egui.padding;

        for (var i in this.buttons) {
            this.buttons[i]["button"].draw(this.button_width, egui.line_height, button_left, this.button_top);
            button_left += this.button_width + egui.padding;
        };

        this.button_okay.draw(this.button_width, egui.line_height, button_left, this.button_top);


        this.backing.stop().animate({"opacity": 1}, 150);
        this.dialog.stop().animate({"opacity": 1}, 100);
    };

    this.close = function(){
        (function(self){

            self.backing.stop().animate({"opacity": 0}, 300, function(){
                self.html.remove();
            });

        })(this);


        this.dialog.stop().animate({"opacity": 0}, 100);
    };

    this.on_okay = function(){
        if (!this.callback) {
            return;
        };

        var return_data = {};

        for (var i in this.fields) {
            return_data[this.fields[i]["key"]] = this.fields[i]["object"].val();
        };

        this.callback(return_data);

    };

    this.make_connections = function(){
        (function(self){

            self.backing.click(function(){
                self.close();
            });

            self.button_cancel.click(function(){
                self.close();
            });

            self.button_okay.click(function(){
                self.on_okay();
                self.close();
            });

        })(this);
    };

    if (this.label) {
        this.add_label(this.label);
    }

    this.set_styles();
    this.make_connections();

    $("body").append(this.html);


}

