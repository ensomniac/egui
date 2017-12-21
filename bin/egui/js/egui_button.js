'use strict';

function EguiButton(){
    this.description = "Describe this Egui constructor..."

    egui.Label.call(this);

    this.height = egui.line_height;
    this.rect.set_expand_y(this.height);

    this.button_setup_complete = false;
    this.upload_setup_complete = false;
    this.upload_active = false;

    this.set_text("Egui Button");

    this.set_background_color(egui.button_color);
    this.set_background_hover_color(egui.button_color_hover);

    this.set_text_color(egui.button_text_color);
    this.set_cursor("pointer");

    this.on_upload_progress_cb = null;
    this.on_upload_complete_cb = null;

    this.draw_button = function(){
        if (!this.button_setup_complete) {
            this.setup_button();
        };

        if (this.on_upload_complete_cb && !this.upload_setup_complete) {
            this.setup_file_uploader();
        };
    };

    this.setup_button = function(){
        this.button_setup_complete = true;
        this.set_primitive_pointer_events_active("label", false);
    };

    this.set_file_upload = function(url, params, on_upload_progress, on_upload_complete){
        this.upload_url = url;
        this.upload_params = params;
        this.on_upload_progress_cb = on_upload_progress;
        this.on_upload_complete_cb = on_upload_complete;
        this.setup_file_uploader();
    };

    this.on_upload_started = function(){
        this.upload_active = true;
        this.set_loading(true);
    };

    this.on_upload_completed = function(result){
        this.upload_active = false;
        this.set_loading(false);

        if (this.on_upload_complete_cb) {
            this.on_upload_complete_cb(result);
        };

        self.set_progress_bar(0);

    };

    this.setup_file_uploader = function(){
        if (!this.primitives["box"]) {
            return;
        };

        var options = {};
        options["url"] = this.upload_url;
        options["uploadMultiple"] = false;
        options["addRemoveLinks"] = false;
        options["createImageThumbnails"] = false;
        options["previewsContainer"] = false;
        options["params"] = this.upload_params;

        (function(self){

            options["init"] = function(){

                this.on("uploadprogress", function(file, progress){

                    self.set_progress_bar(progress*0.01);

                    if (self.on_upload_progress_cb) {

                        if (!self.upload_active) {
                            self.on_upload_started();
                        };

                        self.on_upload_progress_cb(progress);
                    };

                });

                this.on("success", function(file, result){
                    self.on_upload_completed($.parseJSON(result));
                });

            };

        })(this);

        this.uploader = this.primitives["box"].uploader(options);
        this.upload_setup_complete = true;

        this.uploader.css({
            "opacity": 0,
        });

    };

    (function(self){
        self.on_draw(function(){
            self.draw_button();
        });
    })(this);

};












