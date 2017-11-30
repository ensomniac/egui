'use strict';

function FieldEditLayer_string(FieldEditLayer){
    // Create an edit layer for a string
    this.edit_layer = FieldEditLayer;
    this.field = this.edit_layer.field;

    this.raw_values = this.field.raw_values;

    this.display_value = "";

    if (this.field.is_password) {
        this.html = $("<input class='field_input' type='password'>");
    }
    else {
        this.html = $("<input class='field_input' type='text'>");
    };

    this.html.css({
        // "position": "absolute",
        "top": 0,
        "opacity": 0,
        "left": 0,
        "border": 'none',
        "margin": 0,
        "color": "rgba(255, 255, 255, 1)",
        "margin": 0,
        "padding": 0,
        "border": 0,
        "background": "rgba(0, 0, 0, 0)",
        // "z-index": "1",
    });

    this.input_shown = function(){
        this.html.focus();
    }

    this.show = function(){
        this.html.val(this.display_value);

        (function(self){

            self.html.animate({"opacity": 1}, function(){
                self.input_shown();
            });

        })(this);

    };

    this.hide = function(){
        this.html.animate({"opacity": 0});
    };

    this.set_values = function(){
        if (this.raw_values.length > 0) {
            this.display_value = this.raw_values;
        }
        else {
            this.display_value = "";
        }

        this.edit_layer.update_values(this.raw_values, this.display_value);

    };

    this.raw_values_set = function(){
        // Raw values were updated programmatically. Update the display to reflect that change
        this.raw_values = this.field.raw_values;
        console.log("Update string values");
    };

    this.input_changed = function(){
        this.raw_values = this.html.val();
        this.set_values();

        if (this.field.on_keyup) {
            this.field.on_keyup(this.raw_values);
        };

    };

    (function(self){

        self.html.bind('input propertychange', function() {
            self.input_changed();
        });

        self.html.keypress(function (e) {
            if (e.which == 13) {
                // console.log("Focus out");
                self.edit_layer.focus_out();
                return false;
            }
        });

    })(this);

    // Set the initial values
    this.set_values();

    this.draw = function(){
        // Called whenever the size changes
        this.html.css({
            "width": this.field.width,
            "height": this.field.height,
            "line-height": this.field.line_height,
            "font-size": this.field.font_size,
        });
    };
};

function FieldEditLayer_combo(FieldEditLayer){
    // Create an edit layer for a string
    this.edit_layer = FieldEditLayer;
    this.field = this.edit_layer.field;
    this.combo_options = this.field.params.combo_options;
    this.drawer_height = 0;
    this.max_items = 15; // Scroll will be added for more than this many items
    this.item_height = this.field.height*0.75;

    this.item_bg_selected = "#436291";
    this.item_bg_norm = "#3d5984";

    this.raw_values = this.field.raw_values;
    this.display_value = "";
    this.all_combo_items = [];

    this.html = $("<div></div>");
    this.html.css({
        "position": "absolute",
        "top": 0,
        "left": 0,
    });

    this.drawer_container = $("<div class='shadow'></div>");
    this.drawer_container.css({
        "position": "absolute",
        "top": 0,
        "overflow-y": "auto",
        "overflow-x": "hidden"
    });

    this.html.append(this.drawer_container);

    for (var i in this.combo_options) {
        var option = this.combo_options[i];

        var option_content = $("<div>" + option.label + "</div>");
        option_content.css({
            "position": "relative",
            "background": this.item_bg_norm,
            "padding-left": 5,
            "cursor": "pointer"
        });

        (function(self, index){

            option_content.mouseenter(function() {
                $(this).css({"background": self.item_bg_selected});
            });

            option_content.mouseleave(function() {
                $(this).css({"background": self.item_bg_norm});
            });

            option_content.click(function() {
                self.set_values(self.get_id_from_index(index));
                self.edit_layer.focus_out();
            });

        })(this, i);

        this.all_combo_items.push(option_content);

        this.drawer_container.append(option_content);
        this.drawer_height += this.item_height;
    };

    if (this.drawer_height > (this.item_height*this.max_items)) {
        this.drawer_height = (this.item_height*this.max_items);
    };

    this.show = function(){

        var screen_used_y = this.html.offset()["top"] + this.drawer_height;
        var y_offset = 0;
        var padding = this.field.height*0.5;

        if (screen_used_y > $(window).height()) {
            y_offset = $(window).height()-screen_used_y;

            // Add some padding to the offset
            y_offset = y_offset - padding;
        }
        else if (this.html.offset()["top"] - this.field.height - padding < 0) {
            y_offset = this.html.offset()["top"] + padding;
        }

        this.html.val(this.display_value);
        this.drawer_container.css({"height": 0});
        this.drawer_container.animate({"opacity": 1, "height": this.drawer_height, "top": y_offset}, 250);

        return y_offset;

    };

    this.hide = function(){
        this.drawer_container.animate({"opacity": 0, "height": 0}, 250);
    };

    this.get_id_from_index = function(index){
        // Given a list index, return the id that is actually stored in the DB
        return this.combo_options[index]["id"];
    };

    this.get_index_from_id = function(id){
        // Given a DB id, return the index of the options list

        var found_index = null;

        for (var index in this.combo_options) {
            var options_content = this.combo_options[index];
            if (options_content["id"].toString() == id.toString()) {
                found_index = index;
                break;
            };
        };
        return found_index;
    };

    this.raw_values_set = function(){
        // Raw values were updated programmatically. Update the display to reflect that change
        this.raw_values = this.field.raw_values;
        this.set_values(this.raw_values);
    };

    this.set_values = function(id){
        this.raw_values = id;

        var index = this.get_index_from_id(id);

        var default_label = "";
        var top_label = "";

        if (index) {
            default_label = this.combo_options[this.get_index_from_id(id)]["label"];
            top_label = this.combo_options[this.get_index_from_id(id)]["top_label"];
        }

        if (top_label) {
            this.display_value = top_label;
        }
        else {
            this.display_value = default_label;
        };

        this.edit_layer.update_values(this.raw_values, this.display_value);
    };

    (function(self){

        self.html.bind('input propertychange', function() {
            self.input_changed();
        });

    })(this);

    // Set the initial values
    this.set_values(this.raw_values);

    this.draw = function(){
        // Called whenever the size changes

        this.html.css({
            "width": this.field.width,
            "line-height": this.field.line_height,
            "font-size": this.field.font_size,
        });

        this.drawer_container.css({
            "width": this.field.width,
        });

        for (var i in this.all_combo_items) {
            this.all_combo_items[i].css({
                "width": this.field.width,
                "height": this.item_height,
                "line-height": this.item_height + "px",
                "font-size": this.item_height*0.6,
            });
        };
    };
};

function ParsePhoneArray(number_set, isUK){

    var layout_us = ["(", 3, ")", " ", 3, "-", 4];
    var layout_uk_phone = ["(", 3 , ")", " ", 4, " ", 4];

    var layout = layout_us;

    if (isUK) {
        layout = layout_uk_phone;
    };

    // Using the raw values, make the display string

    var display_value = "";

    if (!number_set) {
        return "";
    };

    if (number_set.length > 0) {

        var raw_id = 0;
        for (var i in layout) {
            var layout_type = layout[i];

            if (layout_type == " " || isNaN(parseInt(layout_type*2))){
                // This is a special character
                display_value += layout_type;
            }
            else {
                // This is a input number
                if (number_set[raw_id] && number_set[raw_id].length != 0) {
                    display_value += number_set[raw_id];
                }

                raw_id += 1;
            }
        };
    };

    return display_value;

};

function FieldEditLayer_phone(FieldEditLayer){
    // Create an edit layer for a phone
    this.edit_layer = FieldEditLayer;
    this.field = this.edit_layer.field;

    this.raw_values = this.field.raw_values;
    this.display_value = "";

    this.layout_us = ["(", 3, ")", " ", 3, "-", 4];

    // In UK, entering cell phone
    this.layout_uk_cell = ["+", " " , 2, " ", 2, " ", 4, " ", 4];

    // In UK, entering landline
    this.layout_uk_phone = ["(", 3 , ")", " ", 4, " ", 4];

    this.layout = this.layout_us;

    if (this.field.uk) {
        this.layout = this.layout_uk_phone;
    };

    this.inputs = [];

    this.html = $("<div class='field_phone'></div>");
    this.html.css({
        "position": "absolute",
        "width": this.field.width,
        "height": this.field.height,
        "line-height": this.field.line_height,
        "font-size": this.field.font_size,
        "top": 0,
        "opacity": 1,
        "color": "rgba(255, 255, 255, 1)",
        "display": "none",
    });

    this.char_width = this.field.height*0.35;

    this.input_changed = function(){
        // Build up the display string - the number has changed

        this.raw_values = [];

        for (var i in this.inputs) {
            this.raw_values.push(this.inputs[i].val());
        };

        this.set_values();

    };

    this.set_values = function(){
        this.display_value = ParsePhoneArray(this.raw_values, this.field.uk);
        this.edit_layer.update_values(this.raw_values, this.display_value);
    };

    this.raw_values_set = function(){
        // Raw values were updated programmatically. Update the display to reflect that change
        this.raw_values = this.field.raw_values;
        console.log("Update phone values");
    };

    var left_align = 0;
    var field_id = 0;
    for (var i in this.layout) {
        var layout_type = this.layout[i];

        // One block of digits
        var block_width = this.field.height;
        var block = null;

        if (layout_type == " " || isNaN(parseInt(layout_type*2))){
            // This is a special character
            block_width = this.char_width*0.5;

            block = $("<div class='field_phone_block'>" + layout_type + "</div>");
            block.css({
                "position": "absolute",
                "width": block_width,
                "height": this.field.height,
                "line-height": this.field.line_height,
                "font-size": this.field.font_size,
                "top": 0,
                "left": left_align,
                "text-align": "center",
            });
        }
        else {
            // This is a input number
            block_width = this.char_width*layout_type;

            block = $("<input class='field_input' maxlength='" + layout_type + "'>");
            block.css({
                "position": "absolute",
                "padding": 0,
                "margin": 0,
                "border": 0,
                "width": block_width,
                "height": this.field.height*0.75,
                "line-height": this.field.line_height,
                "font-size": this.field.font_size,
                "text-align": "center",
                "top": (this.field.height-(this.field.height*0.75))*0.5,
                "left": left_align,
                "opacity": 1,
                "color": "rgba(255, 255, 255, 1)",
                "background": "rgba(255, 255, 255, 0)",
                "border-bottom": "1px solid rgba(255, 255, 255, 0.5)"
            });

            (function(self){

                block.bind('input propertychange', function() {
                    self.input_changed();
                });

            })(this);

            this.inputs.push(block);

            if (this.raw_values[field_id]) {
                block.val(this.raw_values[field_id]);
            }
            field_id += 1;
        };

        this.html.append(block);
        left_align += block_width;
        this.set_values();
    };

    this.show = function(){
        this.html.css({"opacity": 0});
        this.html.show();
        this.html.animate({"opacity": 1});
    };

    this.hide = function(){
        (function(self){
            self.html.animate({"opacity": 0}, function(){
                self.html.hide();
            });
        })(this);
    };

    this.draw = function(){
        // Called whenever the size changes
        console.log("Update size of phone field");
    };

};

function FieldEditLayer_date(FieldEditLayer){
    // Create an edit layer for a string
    this.edit_layer = FieldEditLayer;
    this.field = this.edit_layer.field;

    this.raw_values = this.field.raw_values;
    this.display_value = "";

    this.datepicker = null;
    this.picker_container = null;
    this.picker_height = 100;
    this.date_str = "";
    this.auto_hide_active = false;
    this.buffer = 200;
    this.is_active = false;
    this.is_animating = false;

    this.html = $("<div></div>");
    this.html.css({
        "position": "absolute",
        "width": this.field.width,
        "height": this.field.height,
        "line-height": this.field.line_height,
        "font-size": this.field.font_size,
        "opacity": 1,
        "display": "none"
    });

    this.date_selected = function(formattedDate, date, inst){
        this.raw_values = [date.getMonth()+1, date.getDate(), date.getFullYear()];
        this.set_values();
        this.auto_hide_active = true;
        this.date_str = formattedDate;
        this.edit_layer.focus_out();
        this.hide_picker_gui();
    };

    this.hide_picker_gui = function(){
        if (this.is_animating) {
            return;
        };

        (function(self){
            self.is_active = false;
            self.is_animating = true;

            self.picker_container.animate({
                "height": 0
            }, function(){
                self.html.find(".picker_container").remove();
                self.html.hide();
                self.is_animating = false;
            });

        })(this);
    };

    this.show = function(){
        if (this.is_animating) {
            return;
        };

        this.html.show();
        this.is_active = true;
        this.auto_hide_active = false;

        (function(self){

            self.picker_container = $("<div class='picker_container'></div>");
            self.html.append(self.picker_container);

            var options = {
                language: 'en',
                autoClose: true,
                onSelect: function(formattedDate, date, inst){
                    self.date_selected(formattedDate, date, inst);
                },
            };

            if (self.raw_values.length > 2) {
                options["startDate"] = new Date(self.raw_values[2], self.raw_values[0]-1, self.raw_values[1]);
            };

            self.datepicker = self.picker_container.datepicker(options).data('datepicker');
            self.datepicker.show();


            self.picker_height = self.picker_container.height();
            self.picker_container.css({
                "overflow": "hidden",
                "height": 0,
            });

            self.is_animating = true;
            self.picker_container.animate({
                "height": self.picker_height
            }, function(){
                self.is_animating = false;
            });

        })(this);

    };

    this.hide = function(){
        if (this.is_animating) {
            return;
        };

        if (this.auto_hide_active) {
            // Auto hiding, ignore
        }
        else {
            this.hide_picker_gui();
        }
    };

    this.raw_values_set = function(){
        // Raw values were updated programmatically. Update the display to reflect that change
        this.raw_values = this.field.raw_values;
        console.log("Update date values");
    };

    this.set_values = function(){

        if (this.raw_values.length > 0) {

            this.display_value = moment(
                this.raw_values[0] + '/' + this.raw_values[1] + '/' + this.raw_values[2], 'MM/DD/YYYY'
            ).format('MMMM Do YYYY');
        }
        else {
            this.display_value = "";
        }

        this.edit_layer.update_values(this.raw_values, this.display_value);

    };

    // Set the initial values
    this.set_values();

    this.draw = function(){
        // Called whenever the size changes
        console.log("Update size of date field");
    };

};

function FieldEditLayer(Field){
    this.field = Field;
    this.edit_layer = null;
    this.display_value = "";
    this.raw_values = this.field.raw_values;

    this.update_values = function(raw_values, display_value){
        this.raw_values = raw_values;
        this.display_value = display_value;

        if (display_value && this.field.is_password) {
            this.display_value = Array(display_value.length+1).join("*");
        };

    };

    if (this.field.type == "string") {
        this.edit_layer = new FieldEditLayer_string(this);
    }
    else if (this.field.type == "phone") {
        this.edit_layer = new FieldEditLayer_phone(this);
    }
    else if (this.field.type == "date") {
        this.edit_layer = new FieldEditLayer_date(this);
    }
    else if (this.field.type == "combo") {
        this.edit_layer = new FieldEditLayer_combo(this);
    }
    else {
        this.edit_layer = new FieldEditLayer_string(this);
    };

    this.raw_values_set = function(){
        // The values were updated programmatically. Update the display
        this.edit_layer.raw_values_set();
    };

    this.html = this.edit_layer.html;

    this.show = function(){
        return label_offset = 0 || this.edit_layer.show();
    };

    this.hide = function(){
        this.edit_layer.hide();
    };

    this.focus_out = function(){
        // Called by each edit layer when the focus has been lost
        this.field.focus_out();
    };

    this.draw = function(){
        // Called whenever the size changes
        this.edit_layer.draw();
    };


};

function FieldHtml(Field){
    this.field = Field;
    this.edit_layer = null;
    this.loader = null;
    this.label_offset = 0;

    this.bottom_bar = $("<div class='field_bar'></div>");
    this.bottom_bar.css({
        "position": "absolute",
        "height": 1,
        "left": 0,
        "right": 0,
        "bottom": 0,
        "background": "rgba(255, 255, 255, 0.3)"
    });

    this.tooltip = $("<div class='field_tooltip'>" + this.field.placeholder + "</div>");
    this.tooltip.css({
        "position": "absolute",
        "background": "rgba(0, 0, 0, 0.8)",
        "text-align": "center",
        "opacity": 1,
        "height": 0,
        "display": "none",
    });

    this.focus_out_layer = $("<div class='field_focus_out_layer'></div>");
    this.focus_out_layer.css({
        "position": "absolute",
        "opacity": 1,
        // "background": "yellow",
        "display": "none",
    });

    this.placeholder = $("<div class='field_placeholder'>" + this.field.placeholder + "</div>");
    this.placeholder.css({
        "position": "absolute",
        "top": 0,
        "text-align": "left",
        "opacity": 0,
        "color": "rgba(255, 255, 255, 0.5)",
        "overflow": "hidden"
    });

    this.text_label = $("<div class='field_label'></div>");
    this.text_label.css({
        "position": "absolute",
        "top": 0,
        "text-align": "left",
        "opacity": 1,
        "color": "rgba(255, 255, 255, 0.8)",
        "overflow": "hidden",
        "white-space": "nowrap",
        "text-overflow": "ellipsis",
    });

    this.icon_box = $("<div class='field_icon_box'></div>");
    this.icon_box.css({
        "position": "absolute",
        "top": 0,
        "right": 0,
    });

    this.icon_insert = this.field.egui.Insert("field_icon_insert", {"html_container": this.icon_box});
    this.load_dots = null;
    this.field_icon = null;

    if (this.field.locked) {
        this.field_icon = new egui.Icon("load_icon", {"name": "locked", "max_width": this.field.height*0.4, "max_height": this.field.height*0.4});
        // this.field_icon = new egui.Image("load_icon", "image");
        this.icon_insert.set_content(this.field_icon);
    }
    else {
        this.load_dots = this.field.egui.Loader("field_load_dots");
        this.icon_insert.set_content(this.load_dots);
    }

    this.html = $("<div class='field_container'></div>");
    this.html.css({
        "left": 0,
        "top": 0,
        "overflow": "visible",
    });

    this.edit_layer = new FieldEditLayer(this.field);

    this.html.append(this.bottom_bar);
    this.html.append(this.tooltip);
    this.html.append(this.placeholder);
    this.html.append(this.text_label);
    this.html.append(this.icon_box);

    this.force_hide = function(){
        // Called when the user clicks the tooltip
        this.field.hide_edit_layer(true);
    };

    this.show = function(){
        this.html.append(this.focus_out_layer);
        this.html.append(this.edit_layer.html);

        this.focus_out_layer.css({
            "position": "absolute",
            "opacity": 1,
            "z-index": 10001,
        });

        this.edit_layer.html.css({
            "position": "absolute",
            "opacity": 1,
            "z-index": 10002
        });

        this.text_label.css({
            "width": this.field.width,
            "height": this.field.height,
            "line-height": this.field.line_height,
            "font-size": this.field.font_size,
        });

        this.label_offset = this.edit_layer.show();

        this.focus_out_layer.show();
        return this.label_offset;
    };

    this.hide = function(){
        this.label_offset = 0;
        this.edit_layer.hide();
        this.focus_out_layer.hide();
    };

    this.show_save_icon = function(){
        this.load_dots.start();
    };

    this.hide_save_icon = function(){
        this.load_dots.stop();
    };

    this.raw_values_set = function(){
        // A new value was programmatically set - update the gui to reflect
        this.edit_layer.raw_values_set();
    };

    this.draw = function(){

        this.tooltip.css({
            "width": this.field.width,
            "height": this.field.height,
            "line-height": this.field.line_height,
            "font-size": this.field.font_size*0.8,
            "bottom": this.field.height,
        });

        var focus_out_size = this.field.width*2;

        this.focus_out_layer.css({
            "width": focus_out_size,
            "height": focus_out_size,
            "top": -(focus_out_size*0.5)+(this.field.height*0.5),
            "left": -(focus_out_size*0.5)+(this.field.width*0.5),
        });

        this.placeholder.css({
            "width": this.field.width,
            "height": this.field.height,
            "line-height": this.field.line_height,
            "font-size": this.field.font_size,
        });

        this.icon_box.css({
            "width": this.field.height,
            "height": this.field.height,
            "line-height": this.field.line_height,
        });

        if (!this.field.can_edit) {
            this.lock_icon.css({
                "width": this.field.height*0.33,
                "height": this.field.height*0.33,
                "top": this.field.height*0.33,
                "right": this.field.height*0.33,
            });
        }

        this.html.css({
            "width": this.field.width,
            "height": this.field.height,
            "line-height": this.field.line_height,
            "font-size": this.field.font_size,
        });

        this.edit_layer.draw();
        this.icon_insert.draw(new this.field.egui.utils.Vector2(this.field.height, this.field.height));

    };

    (function(self){

        self.tooltip.click(function(){
            self.force_hide();
        });

        self.focus_out_layer.click(function(e){
            self.focus_out_layer.hide();
            self.force_hide();
        });

    })(this);

    this.html.show();

}












function FieldManager(Egui) {
    // Global container for all field objects
    this.egui = Egui;
    this.all_objects = {};
    this.currently_active = null;
    this.last_active_object = null;

    this.register = function(field_object){
        this.all_objects[field_object.id] = field_object;
    };

    this.get_next_object = function(){
        if (!this.currently_active) {
            return;
        }

        var next_object = this.currently_active.html.parent().parent().next().find(".egui_field");
        var field_id = next_object.attr("egui_id");
        var next_field = this.all_objects[field_id];

        if (!next_field) {
            return;
        }

        return next_field;

    };

    this.advance = function(){

        if (this.currently_active) {
            this.last_active_object = this.currently_active;

            var next_object = this.get_next_object();

            if (next_object) {
                next_object.enter_edit_mode();
            }

            (function(self){

                setTimeout(function(){
                    if (self.last_active_object.edit_active) {
                        self.last_active_object.field_obj.edit_layer.focus_out();
                    };

                }, 50);

            })(this);
        };
    };

    this.mark_active = function(field_object){
        if (this.currently_active && this.currently_active.edit_active) {
            this.currently_active.field_obj.edit_layer.focus_out();
        };

        this.currently_active = field_object;
    };
}

function EguiField(Egui, name, params) {
    // A field represents most short-form input types

    this.egui = Egui;
    this.packbox = new this.egui.Vbox("field_packbox");
    this.packbox.set_size(new this.egui.utils.Vector2(-1, this.egui.line_height));
    this.name = name;
    this.size = null;

    this.params = params || {};
    // this.on_save = null || this.params["on_save"];
    this.is_password = null || this.params["password"];
    this.can_edit = true || this.params["can_edit"];
    this.locked = false || this.params["locked"];
    this.on_change = false || this.params["on_change"];
    this.type = this.params["type"] || "string";
    this.placeholder = "" || this.params["placeholder"];
    this.id = "field_" + (Math.random()*1000);
    this.raw_values = "" || this.params["raw_values"];
    this.raw_values_saved = this.raw_values;
    this.display_value = "";
    this.on_keyup = this.params.on_keyup || null;


    // if (!this.type) {
    //     this.type = "string";
    // }

    this.egui.fields.register(this);

    // This is a slight hack until everything is moved into Egui.
    // For now, the contents within this Egui object are pretty standard
    this.html = $("<div></div>");

    this.html.css({
        // "background": "rgba(255, 255, 255, 0.2)",
        "position": "absolute",
        "overflow": "visible",
        "left": 0,
        "top": 0,
    });

    this.html.attr("egui_id", this.id);
    this.html.addClass("egui_field");

    this.html_view = new egui.HTMLView("field_view_packbox");

    this.packbox.append(this.html_view);

    this.width = -1; // Expand to full width of container
    this.height = this.egui.line_height;

    this.line_height = this.height + "px";
    this.font_size = this.egui.font_size;

    this.hover_active = false;
    this.hover_start_time = null;
    this.hover_trigger = 250;

    this.tooltip_visible = false;
    this.placeholder_visible = null;
    this.edit_active = false;
    this.edit_layer = null;
    this.is_saving = false;

    // MANAGE HTML HERE
    this.field_obj = new FieldHtml(this);
    this.html.append(this.field_obj.html);
    // MANAGE HTML HERE

    this.set_value = function(raw_values){
        // Force a new value
        this.raw_values = raw_values;
        this.field_obj.raw_values_set();
        this.display_value = this.field_obj.edit_layer.display_value;
        this.set_text_label();
    };

    this.draw = function(size){
        // Called whenever it's resized
        this.width = size.x;
        this.height = size.y;

        this.html.css({
            "width": this.width,
            "height": this.height,
        });

        (function(self){
            self.field_obj.draw();
        })(this);

    };

    this.get_combo_option_for_id = function(id){
        var found_option = null;

        for (var i in this.params["combo_options"]) {
            var option = this.params["combo_options"][i];
            if (id == option["id"]) {
                found_option = option;
                break;
            }

        }

        return found_option;

    };

    this.set_text_label = function(){

        this.field_obj.text_label.text(this.display_value);

        if (this.display_value) {
            // We've got something to display
            this.hide_placeholder();
            this.field_obj.text_label.animate({"opacity": 1});
        }
        else {
            // Nothing to display. Show the placeholder
            this.show_placeholder();
        }
    };

    this.validate_for_save = function(force_hide){
        var save_required = false;

        if (force_hide && this.on_change) {
            this.save();
        }
        else {
            if (this.raw_values_saved != this.raw_values) {
                this.save();
            }
        }
    };

    this.save_complete = function(){
        if (!this.is_saving) {return;}

        this.is_saving = false;
        this.field_obj.hide_save_icon();
        this.raw_values_saved = this.raw_values;

    };

    this.save = function(){

        if (this.is_saving) {
            // onsole.log("Already saving...");
            return;
        }

        if (!this.can_edit) {
            // alert("This field is currently locked");
            return;
        }

        if (this.params["save"] == false) {
            // console.log("Skipping save");
            return;
        }

        if (this.on_change) {
            // We have a save callback
            if (this.on_change == "advance") {
                console.log("Advance to next field");
            }
            else {
                this.field_obj.show_save_icon();
                this.is_saving = true;
                this.on_change(this);
            };

        }
        else {
            // We don't have a save callback
            console.log("Warning: No save callback set for " + this.name + " Field()");
        }

        // (function(self){
        //     setTimeout(function(){
        //         self.save_complete();
        //     }, 1000);
        // })(this);

        // console.log("Save to server");
    };

    this.hide_edit_layer = function(force_hide){
        // Generally called when the user clicks the tooltip
        this.raw_values = this.field_obj.edit_layer.raw_values;
        this.display_value = this.field_obj.edit_layer.display_value;

        if (this.edit_active) {
            this.leave_edit_mode();
        }

        this.hide_tooltip(true);
        this.set_text_label();
        this.validate_for_save(force_hide);

    };

    this.enter_edit_mode = function(){
        if (this.edit_active) {return;}
        if (this.is_saving) {return;};
        if (this.locked) {return;};

        this.egui.fields.mark_active(this);

        this.hide_placeholder();
        this.edit_active = true;

        this.field_obj.text_label.animate({"opacity": 0});
        var label_offset = this.field_obj.show();

        // console.log("--> " + label_offset);


        this.show_tooltip(true, label_offset);


    }

    this.leave_edit_mode = function(){
        if (!this.edit_active) {return;}

        (function(self){
            setTimeout(function(){
                self.edit_active = false;
            }, 100);
        })(this);

        this.field_obj.hide();
        this.hide_tooltip(true);

    };

    this.focus_out = function(){
        // Focus was lost

        // Set the display, if content exists
        this.hide_edit_layer(true);
        this.leave_edit_mode();
    };

    this.show_placeholder = function(){
        if (this.placeholder_visible == true) {return;}

        this.field_obj.placeholder.animate({"opacity": 1});

        this.placeholder_visible = true;
    };

    this.hide_placeholder = function(){
        if (this.placeholder_visible == false) {return;}

        this.field_obj.placeholder.animate({"opacity": 0});

        this.placeholder_visible = false;
    };

    this.show_tooltip = function(force_tooltip, label_offset){
        if (!label_offset) {
            label_offset = 0;
        };

        if (this.tooltip_visible && !label_offset) {
            return;
        }

        if (this.raw_values.length == 0 && !force_tooltip && !label_offset) {
            return;
        }

        this.field_obj.tooltip.show();
        var label_offset = this.field_obj.label_offset;

        if (this.tooltip_visible && label_offset) {
            // The label is already visible, we just need to asjust for the offset
            this.field_obj.tooltip.animate({"bottom": this.height-label_offset}, 250);
            return;
        }

        if (this.field_obj.tooltip.offset()["top"] < this.height && !label_offset) {
            // console.log("Pushing down");
            // console.log(this.field_obj.tooltip.offset()["top"]);
            label_offset = -this.height;
        }

        this.field_obj.tooltip.css({"opacity": 0, "height": 0});
        this.field_obj.tooltip.stop().animate({"opacity": 1, "height": this.height, "bottom": this.height+label_offset}, 250);

        this.tooltip_visible = true;

    };

    this.hide_tooltip = function(force_tooltip){
        if (!this.tooltip_visible) {return;}
        if (this.edit_active && !force_tooltip) {return;}

        this.field_obj.tooltip.stop().animate({"opacity": 0, "height": 0, "bottom": this.height}, 500);

        this.tooltip_visible = false;
    };

    this.check_hover = function(timestamp){
        if (!this.hover_active || this.tooltip_visible) {return;}

        var hover_duration = timestamp-this.hover_start_time;

        if (hover_duration >= this.hover_trigger) {
            this.show_tooltip();
        };

        (function(self){

            if (self.hover_active) {
                window.requestAnimationFrame(function(timestamp){
                    self.check_hover(timestamp);
                });
            };

        })(this);

    };

    this.mouse_in = function(timestamp){
        if (this.hover_active) {
            // we're already hovering
            return;
        }

        this.hover_active = true;
        this.hover_start_time = timestamp;
        this.check_hover(this.hover_start_time);

    };

    this.mouse_out = function(){
        if (!this.hover_active) {
            // we're already not hovering
            return;
        }

        this.hover_active = false;
        this.hover_start_time = null;

        if (this.tooltip_visible) {
            this.hide_tooltip();
        }

    };

    (function(self){

        self.html.mouseenter(function(e) {
            self.mouse_in(e.timeStamp);
        });

        self.html.mouseleave(function() {
            self.mouse_out();
        });

        self.field_obj.tooltip.mouseenter(function() {
            self.mouse_out();
        });

        self.html.click(function() {
            self.enter_edit_mode();
        });

        self.html_view.set_html(self.html, function(size){
            self.size = size;
            self.draw(size);
        });

         self.html.bind('keydown', function(event) {
            if (event.keyCode == 9) {
                self.egui.fields.advance();
            }
         });

    })(this);

    // Set the initial display, if content exists
    this.hide_edit_layer(false);





}



