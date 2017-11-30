'use strict';

function EguiHTMLLabel(label_text){
    this.description = "HTML Label";
    this.layout = new egui.Layout();

    this.html = $("<div></div>");
    this.highlight = $("<div></div>");
    this.highlight_onclick = $("<div></div>");

    this.label_text = label_text;
    this.label = $("<div>" + this.label_text + "</div>");

    this.highlight_active = false;
    this.background_color = "none";

    this.html.append(this.highlight);
    this.html.append(this.highlight_onclick);
    this.html.append(this.label);

    this.set_callback = function(callback){
        this.callback = callback;
    };

    this.click = function(callback){
        this.set_callback(callback);
    };

    this.set_color = function(color){
        // Set the text color
        this.label.css({"color": color});
    };

    this.set_background = function(background_color){
        this.background_color = background_color;

        this.html.css({
            "background": this.background_color
        });

    };

    this.set_alignment = function(lrc){

        this.label.css({
            "text-align": lrc
        });

    };

    this.set_text = function(text, no_anim){
        if (text == this.label_text || no_anim) {
            this.label.text(text);
            this.label_text = text;
        }
        else {
            this.label_text = text;

            (function(self){
                self.label.stop().animate({"opacity": 0}, function(){
                    self.label.text(self.label_text);
                    self.label.stop().animate({"opacity": 1});
                });

            })(this);
        };

    };




    this.set_highlight_active = function(highlight_active){
        this.highlight_active = highlight_active;
    };

    this.set_styles = function(){
        this.html.css({
            "overflow": "hidden",
            "background": this.background_color,
            "pointer-events": "none",
        });

        this.highlight.css({
            "position": "absolute",
            "left": 0,
            "top": 0,
            "right": 0,
            "bottom": 0,
            "background": "rgba(255, 255, 255, 0.05)",
            "opacity": 0,
        });

        this.label.css({
            "text-align": "center",
        });
    };

    this.draw = function(width, height, left, top){
        this.layout.Set(width, height, left, top, this.html);
        this.layout.Set(width, height, 0, 0, this.label);

        this.label.css({
            "line-height": (this.layout.height) + "px",
        });
    };

    this.on_click = function(){

        if (this.callback) {
            if (this.confirmation_text) {

                if (window.confirm(this.confirmation_text)) {
                    this.callback();
                }

            }
            else {
                this.callback();
            };
        };

    };

    this.make_connections = function(){
        (function(self){

            self.html.mouseenter(function(){
                if (self.highlight_active) {
                    self.highlight.stop().animate({"opacity": 1}, 50);
                };
            });

            self.html.mouseleave(function(){
                if (self.highlight_active) {
                    self.highlight.stop().animate({"opacity": 0}, 300);
                };
            });

            self.html.click(function(){
                self.highlight_onclick.stop().css({"opacity": 1});
                self.highlight_onclick.stop().animate({"opacity": 0}, 300);
                self.on_click();
            });

        })(this);
    };

    this.set_styles();
    this.make_connections();

}

