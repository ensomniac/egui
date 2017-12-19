'use strict';

function EguiButton(){
    this.description = "Describe this Egui constructor..."

    egui.Label.call(this);

    this.height = egui.line_height;
    this.rect.set_expand_y(this.height);

    this.button_setup_complete = false;

    this.set_text("Egui Button");

    this.set_background_color(egui.button_color);
    this.set_background_hover_color(egui.button_color_hover);

    this.set_text_color(egui.button_text_color);
    this.set_cursor("pointer");

    this.on_upload_started_cb = null;
    this.on_upload_progress_cb = null;
    this.on_upload_complete_cb = null;

    this.draw_button = function(){
        if (!this.button_setup_complete) {
            this.setup_button();
        };
    };

    this.setup_button = function(){
        this.button_setup_complete = true;
        this.set_primitive_pointer_events_active("label", false);
    };

    this.set_file_upload_callbacks = function(on_upload_started, on_upload_progress, on_upload_complete){
        this.on_upload_started_cb = on_upload_started;
        this.on_upload_progress_cb = on_upload_progress;
        this.on_upload_complete_cb = on_upload_complete;
        this.setup_file_uploader();
    };

    this.setup_file_uploader = function(){
        console.log("UPLOAD SETUP");
        var options = {};
        options["url"] = "www.api.com?f=upload_image";
        options["uploadMultiple"] = false;
        options["addRemoveLinks"] = false;
        options["createImageThumbnails"] = false;
        options["params"] = {};


        (function(self){

            options["init"] = function(){

                this.on("uploadprogress", function(file, progress){
                    console.log(progress)
                });

                this.on("success", function(file, result){
                    console.log(result)
                });

            };

        })(this);

        console.log(this.primitives);

        // self.html.dropzone(options);

    };

    (function(self){
        self.on_draw(function(){
            self.draw_button();
        });
    })(this);

};












