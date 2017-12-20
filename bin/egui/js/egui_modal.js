'use strict';

function EguiModal(){
    this.description = "General Use Modal Container"

    // egui.layout.CenterBox.call(this);
    egui.Layout.call(this);

    // this.setup_complete = false;

    if (!egui.current_context) {
        console.log("WARNING: Unable to locate context for modal");
        return;
    };

    this.background_color = "rgba(20, 20, 20, 0.9)";
    this.set_background(this.background_color);

    // this.backing = new egui.Box();
    // this.backing.set_background("orange");

    this.draw_layout = function(){
        // var width = (this.rect.width*this.width_mult)-(this.padding_outer*2);
        // var height = (this.rect.height*this.height_mult)-(this.padding_outer*2);

        // if (this.aspect != -1) {
        //     height = width/this.aspect;
        // };

        // var left = (this.rect.width-width)*0.5;
        // var top = (this.rect.height-height)*0.5;

        // this.background.rect.set(
        //     width+(this.padding_outer*2),
        //     height+(this.padding_outer*2),
        //     left-this.padding_outer,
        //     top-this.padding_outer
        // );

        // if (!this.setup_complete) {
        //     this.setup();
        // };

        console.log(this.background);
        // this.background.set(this.rect);

    };

    // this.setup = function(){
    //     this.setup_complete = true;
    //     console.log('SETTING UP');
    //     console.log();
    // };



    // this.set_aspect(1.5);
    // this.set_padding_outer(egui.padding);
    // console.log("setting shad");

    // console.log(this.set_shadow);

    // this.box.set_shadow(0, egui.padding*0.5, egui.padding*10);

    // this.vertical_layout = new egui.layout.Vertical();
    // this.vertical_layout.set_padding_inner(egui.padding);

    // this.append(this.backing);


    this.show = function(){
        // console.log("Show modal");
        egui.current_context.set_modal(this);

    };

    this.hide = function(){
        console.log("HIDE");
    };

    (function(self){

        self.background.set_click_callback(function(){
            self.hide();
        });

        // self.on_draw(function(){
        //     console.log("DRAW");
        // });

    })(this);

};

