'use strict';

function EguiPackboxNew(){
    this.description = "Generic packbox";

    this.view = null;
    this.children = [];
    this.html = $("<div></div>");

    this.draw = function(){

        var child_top = 0;
        var child_left = 0;

        var fixed_size = 0;
        var num_flexible = 0;

        for (var i in this.children) {

            var size_requested = this.children[i].height_requested;
            if (this.orientation == "horizontal") {
                size_requested = this.children[i].width_requested;
            }

            if (size_requested) {
                fixed_size += size_requested;
            }
            else {
                num_flexible += 1;
            }
        }


        var expanded_size = this.width;
        var flexible_child_size = (this.height-fixed_size)/num_flexible;

        if (this.orientation == "horizontal") {
            expanded_size = this.height;
            flexible_child_size = (this.width-fixed_size)/num_flexible;
        }




        for (var i in this.children) {
            var child = this.children[i];

            var max_width = flexible_child_size;
            var max_height = flexible_child_size;

            if (child.width_requested) {
                max_width = child.width_requested;
            };

            if (child.height_requested) {
                max_height = child.height_requested;
            };


            if (this.orientation == "horizontal") {
                child.width = max_width;
                child.height = expanded_size;
                child.left = child_left;
                child.top = child_top;

                child_left += child.width;
            }
            else {
                child.height = max_height;
                child.width = expanded_size;
                child.left = child_left;
                child.top = child_top;

                child_top += child.height;
            }

            child.draw();


        }



    };

    this.append = function(child){
        // Accepts box elements

        this.children.push(child);
        console.log(child.html);
        this.html.append(child.html);

        if (this.view) {
            this.view.request_resize();
        }

    };



}

function EguiHbox(){
    this.description = "Describe this Egui constructor..."
    this.orientation = "horizontal";

    egui.Packbox.call(this);

    this.description = "Horizontal packbox";
}

function EguiVbox(){
    this.description = "Describe this Egui constructor..."
    this.orientation = "vertical";

    egui.Packbox.call(this);

    this.description = "Vertical Packbox";
}