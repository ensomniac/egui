'use strict';

function EguiButtonBar(){
    this.description = "Describe this Egui constructor..."

    egui.layout.Horizontal.call(this);

    this.height = egui.line_height*2;
    this.set_height(this.height);

    this.button_width = 0;
    this.button_height = 0;

    this.padding = 0;
    this.buttons = [];

    this.set_background("gray");

    this.buttons = [];

    this.add_button = function(){
        var button = new egui.Button();
        button.set_text("-");
        this.append(button);
        this.buttons.push(button);
        return button;
    };

    this.set_padding = function(padding){
        this.padding = padding;
        this.set_padding_inner(this.padding);
        this.set_padding_outer(this.padding);
    };

};

