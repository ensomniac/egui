'use strict';

function EguiAlert(){
    this.description = "Describe this Egui constructor..."

    this.show = function(message){
        // This needs to be native
        alert(message);
    };


};

