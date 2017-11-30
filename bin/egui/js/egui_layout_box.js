'use strict';

function EguiLayoutBox(optional_html_construct){
    this.description = "Base container for visual elements"

    if (optional_html_construct) {
        this.construct = optional_html_construct;

        if (!this.construct.html) {
            this.construct.html = $("<div></div>");
        }

        this.box = this.construct.html;
    }
    else {
        this.construct = null;
        this.box = $("<div></div>");

        this.box.css({
            "background": egui.random_color(),
        });

    }

    this.layout = new egui.Layout();

    this.width = -1;
    this.height = -1;

    this.box.css({
        "position": "absolute",
    });

    this.draw = function(width, height, x, y){
        this.layout.Set(width, height, x, y, this.box);

        if (this.construct && this.construct.draw) {
            this.construct.draw(this.layout);
        };

    };

    this.SetWidth = function(width){
        this.width = width;
        return this;
    };

    this.SetHeight = function(height){
        this.height = height;
        return this;
    };

    this.SetBackground = function(background_color){
        this.background_color = background_color;
        this.box.css({"background": this.background_color});
        return this;
    };

    this.SetContext = function(context){
        this.context = context;

        for (var i in this.children) {
            if (this.children[i].box) {
                this.context.append(this.children[i].box);
            };
        };
    };

};
























