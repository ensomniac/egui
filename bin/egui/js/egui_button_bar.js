'use strict';

function EguiButtonBar(){
    this.description = "Describe this Egui constructor..."

    egui.layout.Horizontal.call(this);

    this.height = egui.line_height;
    this.set_height(this.height);

    this.click_callback = null;

    this.button_width = 0;
    this.button_height = 0;

    this.set_padding_inner(egui.padding);

    this.padding = 0;
    this.buttons = [];

    this.add_button = function(){
        var button = new egui.Button();

        button.set_text("");
        button.set_icon_alignment("center");
        // button.set_opacity(0.5);

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

    this.set_padding = function(padding){
        this.padding = padding;
        this.set_padding_inner(this.padding);
        this.set_padding_outer(this.padding);
    };

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

