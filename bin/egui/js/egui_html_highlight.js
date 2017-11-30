'use strict';

function EguiHTMLHighlight(){
    this.description = "HTML Highlight";
    this.layout = new egui.Layout();

    this.html = $("<div></div>");

    this.parent_connection = null;

    this.set_background = function(background_color){
        this.html.css({
            "background": background_color
        });
    };

    this.set_styles = function(){
        this.html.css({
            "position": "absolute",
            "left": 0,
            "top": 0,
            "right": 0,
            "bottom": 0,
            "background": "rgba(255, 255, 255, 0.1)",
            "opacity": 0,
        });
    };

    this.draw = function(width, height, left, top){
        this.layout.Set(width, height, left, top, this.html);
    };

    this.on_mouse_in = function(){
        this.html.stop().animate({"opacity": 1}, 50);
    };

    this.on_mouse_out = function(){
        this.html.stop().animate({"opacity": 0}, 300);
    };

    this.set_parent_connection = function(parent_element){
        // Sometimes event bubling can be confused since items aren't parented into this container
        // In that case, use this function to make connections rather than relying on the native html element
        this.parent_connection = parent_element;

        (function(self, parent_element){

            parent_element.mouseenter(function(){
                self.on_mouse_in();
            });

            parent_element.mouseleave(function(){
                self.on_mouse_out();
            });

        })(this, parent_element);

    };

    this.make_connections = function(){
        (function(self){

            self.html.mouseenter(function(){

                if (!self.parent_connection) {
                    self.on_mouse_in();
                };

            });

            self.html.mouseleave(function(){

                if (!self.parent_connection) {
                    self.on_mouse_out();
                };

            });

        })(this);
    };

    this.set_styles();
    this.make_connections();

}

