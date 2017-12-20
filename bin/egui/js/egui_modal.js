'use strict';

function EguiModal(){
    this.description = "General Use Modal Container"

    egui.layout.CenterBox.call(this);

    console.log(egui.current_context);

    this.set_aspect(1.5);
    this.set_padding_outer(egui.padding);
    this.set_shadow(0, egui.padding*0.5, egui.padding*10);

    this.vertical_layout = new egui.layout.Vertical();
    this.vertical_layout.set_padding_inner(egui.padding);

    this.append(new egui.Box());

    console.log(egui);

    this.show = function(){
        console.log("Show modal");
    };

};

