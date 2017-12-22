'use strict';

function EguiHTML(){
    this.description = "Very light abstraction for drawing non-egui-native elements";

    egui.Box.call(this);

    this.html = null;
    this.draw_callback = null;

    this.set_background("green");

    this.set_html = function(html, draw_callback){
        this.html = html;
        this.draw_callback = draw_callback;
    };

    this.draw_html = function(){
        console.log("DD");
    };

    (function(self){
        self.on_draw(function(){
            self.draw_html();
        });
    })(this);

};












