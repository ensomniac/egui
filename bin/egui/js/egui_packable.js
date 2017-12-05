'use strict';

function EguiPackable(){
    this.description = "Base constructor for any element that can be appended into another";

    this.root = "EguiPackable"; // Only set on objects that are consumed by children
    this.rect = new egui.Rect(this);

};

