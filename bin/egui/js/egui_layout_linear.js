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
        this.calculate_children_sizes();

        if (this.fixed_space_y > this.rect.height && this.orientation == "vertical") {
            console.log("WARNING: Sizes need to be clamped or scrolling needs to be introduced to vertical layout");
        };

        if (this.fixed_space_x > this.rect.width && this.orientation == "horizontal") {
            console.log("WARNING: Sizes need to be clamped or scrolling needs to be introduced to vertical layout");
        };

        var fixed_padding = (this.padding_inner*(this.children.length-1));
        var child_width_expand = (this.rect.width-this.fixed_space_x-fixed_padding)/(this.children.length-this.num_fixed_children_x);
        var child_height_expand = (this.rect.height-this.fixed_space_y-fixed_padding)/(this.children.length-this.num_fixed_children_y);

        var left = this.rect.left;
        var top = this.rect.top;


        // if (this.constructor == egui.ButtonBar) {
        //     console.log(this);
        //     console.log(this.padding_inner);
        //     // console.log(this.padding_outter);
        // }


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

                top_addl = height + this.padding_inner;

            }
            else {
                // HORIZONTAL
                height = this.rect.height;
                width = child_width_expand;

                if (child.rect.expand_x != -1) {
                    // fixed width
                    width = child.rect.expand_x;
                };

                left_addl = width + this.padding_inner;

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