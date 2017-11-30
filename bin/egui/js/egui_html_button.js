'use strict';

function EguiHTMLButton(label){
    this.description = "HTML Button";

    this.layout = new egui.Layout();
    this.layout_label = new egui.Layout();

    this.label_h_padding = egui.padding;
    this.label_v_padding = egui.padding;

    this.icon = null;
    this.right_icon = null;
    this.right_icon_callback = null;

    this.html = $("<div></div>");
    this.highlight = $("<div></div>");
    this.highlight_onclick = $("<div></div>");
    this.highlight_active = $("<div></div>");
    this.label = $("<div>" + label + "</div>");

    this.label_vertical_alignment = "middle";

    this.html.append(this.highlight);
    this.html.append(this.highlight_onclick);
    this.html.append(this.highlight_active);
    this.html.append(this.label);

    this.bg_highlight = "rgba(255, 255, 255, 0.2)";
    this.bg_on_click = "rgba(255, 255, 255, 0.8)";
    this.bg_highlight_active = "rgba(255, 255, 255, 0.3)";

    this.set_callback = function(callback){
        this.callback = callback;
    };

    this.set_confirmation = function(confirmation_text){
        this.confirmation_text = confirmation_text;
    };

    this.click = function(callback){
        this.set_callback(callback);
    };

    this.set_background = function(background_color){
        this.html.css({
            "background": background_color
        });

        if (background_color.indexOf("0)") != -1) {
            // The background is transparent. Let's make the highlight the same
            this.bg_highlight = background_color;
            this.bg_highlight_active = background_color;
            this.highlight.css({"background": this.bg_highlight});
            this.highlight_active.css({"background": this.bg_highlight_active});
        };

    };

    this.set_label_vertical_alignment = function(tmb){
        this.label_vertical_alignment = tmb;
    };

    this.set_alignment = function(lrc){

        this.label.css({
            "text-align": lrc
        });

    };

    this.set_icon = function(icon_str){
        this.label.html("");

        if (this.icon) {
            this.icon.html.remove();
        }

        this.icon = new egui.html.Icon(icon_str);
        this.html.append(this.icon.html);
        this.draw_icon();
    };

    this.set_right_icon = function(icon_str){
        this.right_icon = new egui.html.Icon(icon_str);

        (function(self){
            self.right_icon.click(function(){
                if (self.right_icon_callback) {
                    self.right_icon_callback();
                };
            });
        })(this);

        this.html.append(this.right_icon.html);
        this.draw_right_icon();
    };

    this.set_right_icon_callback = function(callback){
        this.right_icon_callback = callback;
    };

    this.set_highlight = function(is_active){

        if (is_active) {
            this.highlight_active.stop().animate({"opacity": 1}, 150);
            this.label.stop().animate({"opacity": 1}, 150);
        }
        else {
            this.highlight_active.stop().animate({"opacity": 0});
            this.label.stop().animate({"opacity": 0.8}, 150);
        }

    };

    this.set_styles = function(){
        this.html.css({
            "cursor": "pointer",
            "overflow": "hidden",
            "background": "#205689"
        });

        this.highlight.css({
            "position": "absolute",
            "left": 0,
            "top": 0,
            "right": 0,
            "bottom": 0,
            "background": this.bg_highlight,
            "opacity": 0,
        });

        this.highlight_onclick.css({
            "position": "absolute",
            "left": 0,
            "top": 0,
            "right": 0,
            "bottom": 0,
            "background": this.bg_on_click,
            "opacity": 0,
        });

        this.highlight_active.css({
            "position": "absolute",
            "left": 0,
            "top": 0,
            "bottom": 0,
            "right": 0,
            "background": this.bg_highlight_active,
            "opacity": 0,
        });

        this.label.css({
            "text-align": "center",
            "opacity": 0.8,
        });

    };

    this.draw = function(width, height, left, top){
        this.layout.Set(width, height, left, top, this.html);
        this.layout_label.Set(width-(this.label_h_padding*2), height-(this.label_v_padding*2), this.label_h_padding, this.label_v_padding, this.label);


        this.html.css({
            "border-radius": egui.padding*0.25,
        });

        if (this.icon) {
            this.draw_icon();
        }
        else {
            var line_height = this.layout_label.height;
            var label_height = height-(this.label_v_padding*2);
            var label_top = this.label_v_padding;

            if (this.label_vertical_alignment == "top") {
                line_height = egui.line_height;
                label_height = egui.line_height;
                label_top = 0;
            }
            else if (this.label_vertical_alignment == "bottom") {
                line_height = egui.line_height;
                label_height = egui.line_height;
                label_top = this.layout.height-label_height;
            }
            else {
                line_height = this.layout_label.height;
                label_height = height-(this.label_v_padding*2);
                label_top = this.label_v_padding;
            }

            this.label.css({
                "line-height": line_height + "px",
                "height": label_height,
                "top": label_top,
            });




        };

        if (this.right_icon) {
            this.draw_right_icon();
        }

    };

    this.draw_icon = function(){
        var icon_size = this.layout.height;

        if (this.layout.width < this.layout.height) {
            icon_size = this.layout.width;
        };

        icon_size = icon_size*0.5;
        this.icon.draw(icon_size, icon_size, (this.layout.width*0.5)-(icon_size*0.5), (this.layout.height*0.5)-(icon_size*0.5));

    };

    this.draw_right_icon = function(){
        var icon_size = this.layout.height;
        icon_size = icon_size-(egui.padding*2);

        this.right_icon.draw(
            icon_size,
            icon_size,
            this.layout.width-icon_size-egui.padding,
            (this.layout.height*0.5)-(icon_size*0.5),
        );

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
                self.highlight.stop().animate({"opacity": 1}, 50);
            });

            self.html.mouseleave(function(){
                self.highlight.stop().animate({"opacity": 0}, 300);
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

