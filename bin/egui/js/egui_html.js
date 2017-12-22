'use strict';

function EguiHTML(){
    this.description = "Very light abstraction for drawing non-egui-native elements";

    egui.Box.call(this);

    this.html = null;
    this.draw_callback = null;

    this.set_background("green");

    this.set_html = function(html){
        this.html = html;
    };

    this.set_draw_callback = function(callback){
        console.log(callback);
        this.draw_callback = callback;
    };




};












