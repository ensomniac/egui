'use strict';

function EguiSpriteSheet(){
    this.description = "Sprite Sheet Interface"

    egui.Image.call(this);

    // this.on_image_size(function(){
    //     console.log("size back");
    // });

    // this.primitives["sprite_sheet"] = null;

    // this.scale = 1.0;
    // this.width = egui.line_height;
    // this.height = egui.line_height;

    // this.draw_sprite_sheet = function(){
    //     // Post draw is fired by the inherited box
    //     if (!this.primitives["sprite_sheet"]) {
    //         this.create_sprite_sheet();
    //     };

    //     this.set_post_rect();
    // };

    // this.set_post_rect = function(){

    //     this.primitives["sprite_sheet"].css({
    //         "width": this.rect.width,
    //         "height": this.rect.width,
    //         "left": this.rect.left,
    //         "top": this.rect.top,
    //     });
    // };

    // this.create_sprite_sheet = function(){
    //     // This should be the only place an instance of a native platform
    //     // visual element is created. DIV/DRID (HTML/UNITY)

    //     this.primitives["sprite_sheet"] = $('<div></div>');
    //     this.primitives["sprite_sheet"].css({
    //         "position": "absolute",
    //         "background": "purple",
    //     });

    //     // this.set_pointer_events_active(this.pointer_events_active);
    //     $("body").append(this.primitives["sprite_sheet"]);
    // };

    // (function(self){
    //     self.on_draw(function(){
    //         self.draw_sprite_sheet();
    //     });
    // })(this);

};

