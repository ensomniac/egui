'use strict';

function EguiButtonBar(){
    this.description = "Describe this Egui constructor..."

    egui.layout.Horizontal.call(this);

    this.height = egui.line_height;
    this.set_height(this.height);

    this.button_color = null;
    this.click_callback = null;
    this.icon_alignment = "center";

    this.button_width = 0;
    this.button_height = 0;

    this.padding = 0;
    this.buttons = [];

    this.set_padding_inner(egui.padding);

    this.set_button_color = function(button_color){
        this.button_color = button_color;
    };

    this.set_icon_alignment = function(icon_alignment){
        this.icon_alignment = icon_alignment;
    };

    this.add_button = function(){
        var button = new egui.Button();

        button.set_text("");
        button.set_icon_alignment(this.icon_alignment);
        button.set_background(this.button_color);

        this.append(button);
        this.buttons.push(button);

        (function(self, button){
            button.set_click_callback(function(){
                if (self.click_callback) {
                    self.click_callback(button);
                };
            });

        })(this, button);

        return button;
    };

    // this.set_padding = function(padding){
    //     // this.padding = padding;
    //     // this.set_padding_inner(this.padding);
    //     // this.set_padding_outer(this.padding);
    // };

    this.set_click_callback = function(click_callback){
        this.click_callback = click_callback;
    };

    this.set_active = function(active_button){
        // console.log("SET ACTIVE BUTTON");
        // console.log(active_button);

        for (var i in this.buttons) {
            if (active_button == this.buttons[i]) {
                this.buttons[i].set_opacity(1);
            }
            else {
                this.buttons[i].set_opacity(0.5);
            }
        };

    };


};

