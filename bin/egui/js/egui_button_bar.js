'use strict';

function EguiButtonBar(){
    this.description = "Describe this Egui constructor..."

    egui.layout.Horizontal.call(this);

    this.height = egui.line_height*2;
    this.set_height(this.height);
    // this.set_padding_inner(10);

    this.set_background("gray");


    this.buttons = [];

    this.add_button = function(){
        var button = new egui.Button();

        button.set_text("-");
        // button.set_outter_padding(10);

        button.set_width(this.height);
        this.append(button);

        return button;
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

