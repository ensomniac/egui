'use strict';

function EguiHTML(){
    this.description = "Very light abstraction for drawing non-egui-native elements";

    egui.Box.call(this);

    this.html = null;
    this.draw_callback = null;
    this.html_attached = false;

    this.set_background("green");

    this.set_html = function(html, draw_callback){
        this.html = html;
        this.draw_callback = draw_callback;
    };

    this.draw_html = function(){

        if (this.html && !this.html_attached) {
            this.attach_html();
        };

        this.html.css({
            "position": "absolute",
            "width": this.rect.width,
            "height": this.rect.height,
            "left": this.rect.left,
            "top": this.rect.top,
        });

        console.log("DD");
        console.log(this.rect);
    };

    this.attach_html = function(){
        $("body").append(this.html);
        this.html_attached = true;
        console.log("ATTACHED HTML");
    };

    (function(self){
        self.on_draw(function(){
            self.draw_html();
        });
    })(this);

};












