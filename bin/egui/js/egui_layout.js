'use strict';

function EguiLayout(width, height, left, top){
    this.description = "Store of width, height, top & left";

    // DEFAULTS
    this.width = 200;
    this.height = 200;
    this.left = 0;
    this.top = 0;

    this.from_html = function(html){
        this.width = parseFloat(html.css("width").replace("px", ""));
        this.height = parseFloat(html.css("height").replace("px", ""));
        this.left = parseFloat(html.css("left").replace("px", ""));
        this.top = parseFloat(html.css("top").replace("px", ""));

        return this;
    };

    this.lerp = function(layout_a, layout_b, t, html_optional){
        this.width = this.lerp_value(layout_a.width, layout_b.width, t);
        this.height = this.lerp_value(layout_a.height, layout_b.height, t);
        this.left = this.lerp_value(layout_a.left, layout_b.left, t);
        this.top = this.lerp_value(layout_a.top, layout_b.top, t);

        if (html_optional) {
            html_optional.css({
                "width": this.width,
                "height": this.height,
                "left": this.left,
                "top": this.top,
                "position": "absolute",
            });
        };

        return this;
    };

    this.lerp_value = function(valA, valB, t){
        if (t > 1) {t = 1;}
        if (t < 0) {t = 0;}

        var x = valA + t * (valB - valA);
        return x;
    };

    this.Set = function(width, height, left, top, html_optional){
        if (width == undefined) {
            return;
        };

        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;

        if (html_optional) {
            html_optional.css({
                "width": this.width,
                "height": this.height,
                "left": this.left,
                "top": this.top,
                "position": "absolute",
            });
        };

    };

    this.update_html = function(html){

        html.css({
            "width": this.width,
            "height": this.height,
            "left": this.left,
            "top": this.top,
            "position": "absolute",
        });

        return this;
    };

    this.Set(width, height, left, top);



}

