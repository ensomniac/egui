'use strict';

function EguiButton(){
    this.description = "Describe this Egui constructor..."

    egui.Packable.call(this);

    this.label = new egui.Label();
    this.label.set_text("Some Button");
    // this.layout = new egui.layout.Horizontal();

    this.draw = function(){
        console.log("Drawing button");

        this.label.rect.set(this.rect);

    };

}

