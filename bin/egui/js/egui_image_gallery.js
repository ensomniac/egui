'use strict';

function EguiImageGallery(opts){
    this.description = "An image gallery";

    this.html = $("<div></div>");

    this.opts = opts || {};
    this.feature_width = this.opts["width"] || 600; // Add a description...
    this.feature_height = this.opts["height"] || 400; // Add a description...
    this.desired_width = this.opts["width"]; // Add a description...
    this.bleed = this.opts["bleed"] || "full"; // full or something else
    this.show_thumbs = this.opts["show_thumbs"] || "auto"; // hidden, visible, auto
    this.thumb_padding = this.opts["thumb_padding"] || 3; // the padding between each thumb
    this.timeout_duration = this.opts["timeout_duration"] || 8000; // the padding between each thumb

    this.image_content = [];
    this.thumbs = [];
    this.setup_complete = false;
    this.loaded_image = -1;
    this.auto_timeout = null;
    this.start_delay_timeout = null;
    this.is_visible = true;

    this.size = [-1, this.feature_height]; // Add a description...

    // Inherits from Box
    // egui.Box.call(this, {"size": this.size, "background": "rgba(0, 0, 0, 0)"});

    this.create = function(){
        // Create and attach base objects
        this.feature_area = $("<div></div>");
        this.next_button = $("<div></div>");
        this.previous_button = $("<div></div>");
        this.image_cache = $("<div></div>");
        this.thumbs_bar = $("<div></div>");

        this.next_button_icon = $("<img src='egui/img/arrow_right.png'>");
        this.previous_button_icon = $("<img src='egui/img/arrow_left.png'>");

        this.html.append(this.feature_area);
        this.html.append(this.next_button);
        this.html.append(this.previous_button);
        this.html.append(this.image_cache);
        this.html.append(this.thumbs_bar);

        this.next_button.append(this.next_button_icon);
        this.previous_button.append(this.previous_button_icon);
    };

    this.style = function(){
        // Style base objects (no sizing)
        this.html.css({
            // "overflow": "hidden",
            "border-radius": 4,
        });

        this.feature_area.css({
            "background": "rgba(0, 0, 0, 0.9)",
            "position": "absolute",
            "top": 0,
            // "overflow": "hidden",
            "border-radius": 4,
        });

        this.next_button.css({
            "position": "absolute",
            "top": 0,
            "cursor": "pointer",
        });

        this.previous_button.css({
            "position": "absolute",
            "top": 0,
            "cursor": "pointer",
        });

        this.next_button_icon.css({
            "position": "absolute",
            "opacity": 0,
        });

        this.previous_button_icon.css({
            "position": "absolute",
            "opacity": 0,
        });

        this.image_cache.css({
            "position": "absolute",
            "top": 0,
            "left": 0,
            "width": 10,
            "height": 10,
            // "overflow": "hidden",
            "opacity": 0.1,
        });

        this.thumbs_bar.css({
            "position": "absolute",
            "bottom": 0,
            "left": 0,
            // "overflow": "hidden",
            "background": "rgba(0, 0, 0, 0.7)",
            "opacity": 0.01,
        });
    };

    this.connect = function(){
        (function(self){

            self.previous_button.click(function(){self.Previous()});
            self.next_button.click(function(){self.Next()});


            self.html.mouseenter(function(){
                self.next_button_icon.stop().animate({"opacity": 0.7});
                self.previous_button_icon.stop().animate({"opacity": 0.7});

                if (self.show_thumbs == "auto") {
                    self.thumbs_bar.stop().animate({
                        "bottom": 0,
                        "opacity": 1,
                    }, 200);
                };


            });

            self.html.mouseleave(function(){
                self.next_button_icon.stop().animate({"opacity": 0});
                self.previous_button_icon.stop().animate({"opacity": 0});

                if (self.show_thumbs == "auto") {
                    self.thumbs_bar.stop().animate({
                        "bottom": -self.thumb_bar_height,
                    }, 1000);
                };

            });

        })(this);
    };

    this.draw_buttons = function(){
        this.nav_button_width = this.feature_width*0.5;
        this.nav_icon_size = this.feature_width*0.07;

        this.next_button.css({
            "width": this.nav_button_width,
            "height": this.feature_height,
            "left": (this.width*0.5)-(this.nav_button_width)+(this.feature_width*0.5),
            "top": 0,
        });

        this.previous_button.css({
            "width": this.nav_button_width,
            "height": this.feature_height,
            "left": (this.width*0.5)-(this.feature_width*0.5),
            "top": 0,
        });

        this.next_button_icon.css({
            "width": this.nav_icon_size,
            "height": this.nav_icon_size,
            "right": 0,
            "top": (this.feature_height*0.5)-(this.nav_icon_size*0.5),
            "opacity": 0,
        });

        this.previous_button_icon.css({
            "width": this.nav_icon_size,
            "height": this.nav_icon_size,
            "left": 0,
            "top": (this.feature_height*0.5)-(this.nav_icon_size*0.5),
            "opacity": 0,
        });
    };

    this.draw_thumb_bar = function(){
        this.thumb_bar_height = this.height*0.1;

        this.thumbs_bar.css({
            "width": this.feature_width,
            "height": this.thumb_bar_height,
            "left": (this.width*0.5)-(this.feature_width*0.5),
        });

        var total_width = (this.thumb_bar_height*this.thumbs.length) + (this.thumb_padding*(this.thumbs.length-1));
        var left = (this.feature_width*0.5)-(total_width*0.5);

        for (var i in this.thumbs) {
            this.thumbs[i].css({
                "width": this.thumb_bar_height,
                "height": this.thumb_bar_height,
                "left": left,
                "opacity": 1,
            });

            left += this.thumb_bar_height + this.thumb_padding;
        };

        if (this.show_thumbs == "hidden" || this.show_thumbs == "auto") {
            this.thumbs_bar.animate({
                "bottom": -this.thumb_bar_height + 1,
            });
        }
        else {
            this.thumbs_bar.css({
                "bottom": 0,
                "opacity": 1,
            });
        }
    };

    this.draw = function(){
        // Called whenever the core size changes
        if (this.bleed == "full" && this.size[0] == -1) {
            this.feature_width = this.width;
        }
        else {

            if (this.width < this.desired_width) {
                this.feature_width = this.width;
            }
            else {
                this.feature_width = this.feature_width;
            }

        }

        if (this.bleed == "full" && this.size[1] == -1) {
            this.feature_height = this.height;
        }
        else {
            this.feature_height = this.feature_height;
        }

        this.feature_area.css({
            "width": this.feature_width,
            "height": this.feature_height,
            "top": 0,
            "left": (this.width*0.5)-(this.feature_width*0.5),
        });

        this.setup_complete = true;

        this.draw_buttons();
        this.draw_thumb_bar();

        if (this.image_content.length > 0 && this.loaded_image == -1) {
            if (this.start_delay_timeout) {
                clearTimeout(this.start_delay_timeout);
            }

            (function(self){
                self.start_delay_timeout = setTimeout(function(){
                    self.Next();
                }, 1000);
            })(this);
        }
    };

    this.AddImage = function (image_url, width, height, label, link) {
        var image = $("<div></div>");
        var thumb_image = $("<div></div>");

        image.css({
            "position": "absolute",
            "top": 0,
            "left": 0,
            "background": "rgba(0, 0, 0, 0.8)",
            "background": "url(" + image_url + ")",
            "-webkit-background-size": "cover",
            "-moz-background-size": "cover",
            "-o-background-size": "cover",
            "background-size": "cover",
        });

        thumb_image.css({
            "position": "absolute",
            "top": 0,
            "left": 0,
            "background": "rgba(0, 0, 0, 0.8)",
            "background": "url(" + image_url + ")",
            "-webkit-background-size": "cover",
            "-moz-background-size": "cover",
            "-o-background-size": "cover",
            "background-size": "cover",
            "cursor": "pointer",
            "width": 1,
            "height": 1,
            "opacity": 0,
        });

        var image_data = {};
        image_data["url"] = image_url;
        image_data["width"] = width;
        image_data["height"] = height;
        image_data["label"] = label;
        image_data["link"] = link;
        image_data["image"] = image;
        image_data["thumb_image"] = thumb_image;

        this.image_content.push(image_data);
        this.thumbs.push(thumb_image);

        this.thumbs_bar.append(thumb_image);
        this.image_cache.append(image);

        (function(self, thumb_image, index){
            thumb_image.click(function(){
                self.display_image_by_id(index, true);
            });
        })(this, thumb_image, this.thumbs.length-1);
    };

    this.Next = function() {
        var next_image_id = this.loaded_image + 1;

        if (next_image_id > this.image_content.length-1) {
            next_image_id = 0;
        }

        this.display_image_by_id(next_image_id, true);
    };

    this.Previous = function() {
        var next_image_id = this.loaded_image - 1;

        if (next_image_id < 0) {
            next_image_id = this.image_content.length-1;
        }

        this.display_image_by_id(next_image_id, false);
    };

    this.display_image_by_id = function(id, from_right) {
        if (!this.is_visible) {
            console.log("not visible");
            return;
        };

        if (id == this.loaded_image) {
            console.log("Already loaded");
            return;
        };

        console.log("DISPLAYING " + id);

        var image_data = this.image_content[id];
        this.feature_area.append(image_data["image"]);

        this.loaded_image = id;

        var start_x = -this.feature_width;
        if (from_right) {
            start_x  = this.feature_width;
        };

        image_data["image"].css({
            "left": start_x,
            "width": this.feature_width,
            "height": this.feature_height,
        });

        image_data["image"].animate({
            "left": 0,
        }, 400);

        if (this.auto_timeout) {
            clearTimeout(this.auto_timeout);
        };

        (function(self){
            self.auto_timeout = setTimeout(function(){
                self.Next();
            }, self.timeout_duration);
        })(this);
    };

    this.create();
    this.style();
    this.connect();

}

