'use strict';

function EguiButton(){
    this.description = "Describe this Egui constructor..."

    egui.Packable.call(this);

    this.backing = new egui.Box();
    this.layout = new egui.layout.Horizontal();

    this.draw = function(){
        console.log("Drawing button");

        this.backing.rect.set(this.rect);

    };

}

