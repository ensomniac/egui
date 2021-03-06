'use strict';

function EguiImage(){
    this.description = "Describe this Egui constructor..."

    egui.Box.call(this);

    this.image = null;
    this.image_path = "egui/img/default.jpg";
    this.image_size_callback = null;

    this.set_background_color();
    this.set_background_image(this.image_path);

    this.set_path = function(image_path){
        this.image_path = image_path;

        var callback = null;
        if (this.image_size_callback) {
            (function(self){
                callback = function(width, height){
                    self.image_size_callback(width, height);
                };
            })(this);
        }

        this.set_background_image(this.image_path, callback);
    };

    this.on_image_size = function(image_size_callback){
        this.image_size_callback = image_size_callback;
    };





};

