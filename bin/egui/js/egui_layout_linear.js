'use strict';

function EguiLayoutLinear(){
    this.description = "Describe this Egui constructor..."

    egui.Layout.call(this);

    this.description = "Horizontal or vertical layout container";
    this.orientation = "vertical";

    this.draw = function(){
        // Overrides the draw call for egui.Layout

        if (this.children.length == 0) {
            // Convinience draw function
            this.append(new egui.Box());
        };

        var child_width = this.rect.width/this.children.length;
        var child_height = this.rect.height;
        var left = this.rect.left;
        var top = this.rect.top;
        var add_left = child_width;
        var add_top = 0;

        if (this.orientation == "vertical") {
            child_width = this.rect.width;
            child_height = this.rect.height/this.children.length;
            add_left = 0;
            add_top = child_height;
        };

        for (var i in this.children) {
            var child = this.children[i];
            child.rect.set(child_width, child_height, left, top);

            left += add_left;
            top += add_top;
        };

    };

};

function EguiLayoutHorizontal(){
    this.description = "Describe this Egui constructor..."
    egui.layout.Linear.call(this);

    this.description = "Horizontal Layout"
    this.orientation = "horizontal";
};

function EguiLayoutVertical(){
    this.description = "Describe this Egui constructor..."
    egui.layout.Linear.call(this);

    this.description = "Vertical Layout"
    this.orientation = "vertical";
};