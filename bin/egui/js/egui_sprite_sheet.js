'use strict';

function EguiSpriteSheet(){
    this.description = "Sprite Sheet Interface"

    egui.Image.call(this);

    this.aspect = 1.0;
    this.num_rows = 1;
    this.num_cols = 1;
    this.setup_complete = false;
    this.cycle_speed = 1000;
    this.num_frames = 1;
    this.current_frame = 1;
    this.frame_map = {};
    this.is_active = false;

    this.img_size_native = [0, 0];
    this.img_size_scalled = [0, 0];

    this.set_opacity(0);

    this.set_layout = function(num_rows, num_cols){
        this.num_rows = num_rows;
        this.num_cols = num_cols;
        this.num_frames = this.num_rows*this.num_cols;

        this.frame_map = {};

        var row = 0;
        var col = 0;

        for (var i = 0; i < this.num_frames; i++) {
            var frame = parseInt(i) + 1;

            this.frame_map[frame] = [row, col];

            col += 1;

            if (col >= this.num_cols) {
                col = 0;
                row += 1;
            };

        };

    };

    this.setup = function(width, height){
        this.aspect = width/height;
        this.setup_complete = true;
        this.img_size_native = [width, height];

        if (this.primitives["box"]) {
            this.draw_sprite_sheet();
        };

    };

    this.update = function(t){
        this.current_frame = Math.floor(egui.lerp(1, this.num_frames, t));
        this.draw_current_frame();
    };

    this.cycle_complete = function(){
        if (this.is_active) {
            this.start_cycle();
        };
    };

    this.start_cycle = function(){
        this.anim = new egui.Anim();
        this.anim.set_duration(this.cycle_speed);
        this.anim.set_ease_curve("linear");

        (function(self){

            self.anim.set_update_callback(function(t){
                self.update(t);
            });

            self.anim.set_complete_callback(function(){
                self.cycle_complete();
            });

        })(this);

        this.anim.start();

    };

    this.start = function(cycle_speed){
        if (cycle_speed) {
            this.cycle_speed = cycle_speed;
        };

        if (this.is_active) {
            return;
        };

        this.set_opacity(1);
        this.is_active = true;
        this.start_cycle();

    };

    this.stop = function(){
        this.is_active = false;
    };

    this.draw_sprite_sheet = function(){
        if (!this.setup_complete) {
            return;
        };

        this.img_size_scalled = [
            this.rect.width*this.num_cols,
            (this.rect.width*this.num_cols)/this.aspect
        ];

        this.cell_width = this.img_size_scalled[0]/this.num_cols;
        this.cell_height = this.img_size_scalled[1]/this.num_rows;

        this.primitives["box"].css({
            "background-size": this.img_size_scalled[0] + "px " + this.img_size_scalled[1] + "px",
        });

        this.draw_current_frame();

    };

    this.draw_current_frame = function(){
        var x = -((this.frame_map[this.current_frame][1])*this.cell_width);
        var y = -((this.frame_map[this.current_frame][0])*this.cell_height);

        this.primitives["box"].css({
            "background-position": x + "px " + y + "px",
        });

    };

    (function(self){

        self.on_image_size(function(width, height){
            self.setup(width, height);
        });

        self.on_draw(function(){
            self.draw_sprite_sheet();
        });

    })(this);

};

