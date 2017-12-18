'use strict';

function EguiButtonBar(){
    this.description = "Describe this Egui constructor..."

    egui.layout.Horizontal.call(this);

    this.height = egui.line_height*2;

    this.set_height(this.height);
    this.set_padding_outer(5);

    this.padding = 0;
    this.buttons = [];

    this.set_background("gray");


    this.buttons = [];

    this.add_button = function(){
        var button = new egui.Button();

        button.set_text("-");
        // button.set_outter_padding(10);
        button.set_width(this.height);

        this.append(button);

        this.buttons.push(button);

        return button;
    };

    this.set_padding = function(padding){
        this.padding = padding;
        this.set_padding_inner(this.padding);


        for (var i in this.buttons) {
            this.buttons[i].set_height(10);
            // this.buttons[i].set_width(10);
        };


    };

    // this.set_background_color(egui.button_color);
    // this.set_background_hover_color(egui.button_color_hover);

    // this.draw_bar = function(){
    //     console.log("BUTTON BAR");

    //     console.log(this.layout);
    //     console.log(this.append);

    // };

    // (function(self){
    //     self.on_draw(function(){
    //         self.draw_bar();
    //     });
    // })(this);

};

