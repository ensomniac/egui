'use strict';

function EguiLoadDots(){
    this.description = "Loading Dot Animation"

    egui.SpriteSheet.call(this);

    this.set_layout(6, 5);
    this.set_path("egui/img/load_dots_ss.png");

};

