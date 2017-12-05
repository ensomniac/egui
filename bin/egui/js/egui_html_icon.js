'use strict';

function EguiHTMLIcon(icon_name){
    this.description = "HTML Icon - Use any version from http://fontawesome.io/icons/";

    this.layout = new egui.Layout();
    this.html = $("<div class='fa fa-" + icon_name + "'></i>");
    this.on_click_callback = null;

    this.html.css({
        "position": "absolute",
        "left": 0,
        "top": 0,
        "text-align": "center",
        "color": "rgba(255, 255, 255, 0.8)"
    });

    this.click = function(callback){
        this.on_click_callback = callback;
    };

    this.draw = function(width, height, left, top){
        this.layout.Set(width, height, left, top, this.html);

        this.html.css({
            "font-size": this.layout.width + "px",
            "line-height": this.layout.width + "px",
        });

    };

    (function(self){
        self.html.click(function(){
            if (self.on_click_callback) {
                self.on_click_callback();
            }
        });
    })(this);

}

