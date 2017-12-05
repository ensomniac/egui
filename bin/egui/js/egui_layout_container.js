'use strict';

function EguiLayoutContainer(context, type){
    this.description = "Describe this Egui constructor..."
    this.context = context;

    this.id = Math.floor((Math.random() * 99999) + 10000);
    this.layout = new egui.Layout();
    this.alignment = "left";
    this.type = type;

    this.width = -1;
    this.height = -1;
    this.padding = 0;

    this.children = [];

    this.draw = function(width, height, x, y){
        this.layout.Set(width, height, x, y);
        this.redraw_columns();
    };

    this.SetAlignment = function(alignment){
        // Defines how child gets packed into parent. Default is left
        if (!alignment in {"left": true, "center": true, "right": true}) {
            console.log("WARNING: Unknown column alignment: " + alignment);
            return;
        };

        this.alignment = alignment;

    };

    this.get_type_size = function(){
        // return the desired size based on whether this is horizontal or vertical

        if (this.type == "vertical") {
            return {"size": this.layout.height, "child_dimension": "height", "start_pos": "top"};
        }
        else {
            return {"size": this.layout.width, "child_dimension": "width", "start_pos": "left"};
        };

    };

    this.redraw_columns = function(){
        var total_fixed_size = 0;
        var expand_part_size = 0;
        var num_expand_cols = 0;
        var type_size = this.get_type_size();
        var total_padding = 0;
        var post_pad_size = type_size["size"];

        if (this.children.length > 0) {
            total_padding = ((this.children.length-1)*this.padding)+(this.padding*2); // *2 for top and bottom/left right padding
            post_pad_size = type_size["size"]-total_padding;
        };

        // console.log("total_padding: " + total_padding/this.children.length);

        for (var i in this.children) {

            if (this.children[i][type_size["child_dimension"]] && this.children[i][type_size["child_dimension"]] != -1) {
                total_fixed_size += this.children[i][type_size["child_dimension"]];
            }
            else {
                num_expand_cols += 1;
            };

        };

        if (num_expand_cols > 0) {
            expand_part_size = (post_pad_size-total_fixed_size)/num_expand_cols;
        };

        var start = this.layout[type_size["start_pos"]] + this.padding;

        if (this.alignment == "right") {
            start = this.layout[type_size["start_pos"]] + this.padding + post_pad_size-(total_fixed_size+(expand_part_size*num_expand_cols));
        }
        else if (this.alignment == "center") {
            start = this.layout[type_size["start_pos"]] + this.padding + (post_pad_size*0.5)-((total_fixed_size+(expand_part_size*num_expand_cols))*0.5);
        };

        for (var i in this.children) {

            var non_standard_size = expand_part_size; // The default
            if (this.children[i][type_size["child_dimension"]] && this.children[i][type_size["child_dimension"]] != -1) {
                non_standard_size = this.children[i][type_size["child_dimension"]];
            };

            // start this.padding

            if (this.type == "vertical") {
                this.children[i].draw(this.layout.width, non_standard_size, this.layout.left, start);
            }
            else {
                this.children[i].draw(non_standard_size, this.layout.height, start, this.layout.top);
            }

            start += non_standard_size + this.padding;
        };

    };

    this.append = function(layout){
        // Can accept any layout object
        this.children.push(layout);

        if (layout.Constructor == EguiLayoutColumns && !layout.context && this.context) {
            layout.SetContext(this.context);
        };

        if (layout.box && this.context) {
            this.context.append(layout.box);
        }
        else {
            if (layout.box) {
                // console.log(this);
                // console.log("NO CONTEXT");
            }
        }
    };

    this.SetContext = function(context){
        this.context = context;

        for (var i in this.children) {
            if (this.children[i].box) {
                this.context.append(this.children[i].box);
            };
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

    this.SetPadding = function(padding){
        this.padding = padding;
        return this;
    };

};

function EguiLayoutColumns(context){
    this.description = "Inherits LayoutContainer and can accept other layouts or box elements to be aranged in a horizontal stack"
    return new egui.LayoutContainer(context, "horizontal");
};

function EguiLayoutRows(context){
    this.description = "Inherits LayoutContainer and can accept other layouts or box elements to be aranged in a vertical stack"
    return new egui.LayoutContainer(context, "vertical");
};






















