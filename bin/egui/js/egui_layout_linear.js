'use strict';

function EguiLayoutLinear(){
    this.description = "Describe this Egui constructor..."

    egui.Layout.call(this);

    this.orientation = "vertical";

    this.fixed_space_x = 0;
    this.fixed_space_y = 0;

    this.num_fixed_children_x = 0;
    this.num_fixed_children_y = 0;

    this.calculate_children_sizes = function(){

        this.fixed_space_x = 0;
        this.fixed_space_y = 0;

        this.num_fixed_children_x = 0;
        this.num_fixed_children_y = 0;

        for (var i in this.children) {

            if (this.children[i].rect.expand_x != -1) {
                this.fixed_space_x += this.children[i].rect.expand_x;
                this.num_fixed_children_x += 1;
            };

            if (this.children[i].rect.expand_y != -1) {
                this.fixed_space_y += this.children[i].rect.expand_y;
                this.num_fixed_children_y += 1;
            };
        };

    };

    this.draw_layout = function(){
        // Overrides the draw call for egui.Layout

        if (this.children.length == 0) {
            // Convinience draw function
            this.append(new egui.Box());
        };

        this.calculate_children_sizes();

        // console.log("Fixed X: " + this.fixed_space_x);
        if (this.fixed_space_y > this.rect.height || this.fixed_space_x > this.rect.width) {
            console.log("WARNING: Sizes need to be clamped or scrolling needs to be introduced");
        }

        var fixed_padding = (this.child_padding*(this.children.length-1));

        var child_width_expand = (this.rect.width-this.fixed_space_x-fixed_padding)/(this.children.length-this.num_fixed_children_x);
        var child_height_expand = (this.rect.height-this.fixed_space_y-fixed_padding)/(this.children.length-this.num_fixed_children_y);

        var left = this.rect.left;
        var top = this.rect.top;

        for (var i in this.children) {

            var child = this.children[i];
            var width = 0;
            var height = 0;

            var left_addl = 0;
            var top_addl = 0;

            if (this.orientation == "vertical") {
                // VERTICAL
                width = this.rect.width;
                height = child_height_expand;

                if (child.rect.expand_y != -1) {
                    // Fixed height
                    height = child.rect.expand_y;
                };

                top_addl = height + this.child_padding;

            }
            else {
                // HORIZONTAL
                height = this.rect.height;
                width = child_width_expand;

                if (child.rect.expand_x != -1) {
                    // fixed width
                    width = child.rect.expand_x;
                };

                left_addl = width + this.child_padding;

            };

            child.rect.set(width, height, left, top);

            left += left_addl;
            top += top_addl;
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