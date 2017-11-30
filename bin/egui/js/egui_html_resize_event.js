'use strict';

function EguiHTMLOnResize(html, callback){
    this.description = "Fire callback whenever the size of html changes";

    this.html = html;
    this.callback = callback;

    this.width = this.html.width();
    this.height = this.html.height();
    this.size_set = false;

    this.width = -1;
    this.height = -1;

    this.on_size_change = function(){

        if (this.callback) {
            this.callback(this.width, this.height);
            this.size_set = true;
        }
        else {
        }

    };

    this.check_size = function(){
        var width = this.html.width();
        var height = this.html.height();

        if (width != this.width || height != this.height) {
            this.width = width;
            this.height = height;
            this.on_size_change();
        };

        (function(self){
            var r = setTimeout(function(){
                self.check_size();
            }, 100);
        })(this);

    };

    (function(self){
        var r = requestAnimationFrame(function(){
            self.check_size();
        });
    })(this);

}

