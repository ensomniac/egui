'use strict';

function EguiModal(){
    this.description = "General Use Modal Container"

    // egui.layout.CenterBox.call(this);
    egui.Layout.call(this);

    if (!egui.current_context) {
        console.log("WARNING: Unable to locate context for modal");
        return;
    };

    egui.current_context.set_modal(this);

    this.backing = new egui.Box();
    this.backing.set_background("orange");

    // this.draw_layout = function(){
    //     console.log("drawiong");
    // };

    // this.set_aspect(1.5);
    // this.set_padding_outer(egui.padding);
    // console.log("setting shad");

    // console.log(this.set_shadow);

    // this.box.set_shadow(0, egui.padding*0.5, egui.padding*10);

    // this.vertical_layout = new egui.layout.Vertical();
    // this.vertical_layout.set_padding_inner(egui.padding);

    this.append(this.backing);


    this.show = function(){
        // console.log("Show modal");
    };

    this.hide = function(){
        console.log("HIDE");
    };

    (function(self){
        self.backing.set_click_callback(function(){
            self.hide();
        });

        // self.on_draw(function(){
        //     console.log("DRAW");
        // });

    })(this);

};

