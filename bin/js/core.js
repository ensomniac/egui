function Example() {
    this.width = 0;
    this.height = 0;

    this.html = $("<div>Egui is Running</div>");

    this.html.css({
        "background": "#222",
    });

    this.draw = function(){
        // draw() is called whenever the size of the window changes
    };

    this.check_size = function(timestamp){
        var width = $(window).width();
        var height = $(window).height();

        if (width != this.width || height != this.height || !this.size_set) {
            this.width = width;
            this.height = height;
            this.size_set = true;
            this.draw();
        };

        (function(self){
            requestAnimationFrame(function(t){self.check_size(t)});
        })(this);
    };

    this.check_size();

}

function Start() {
    // Egui calls Start() when ready

    window.example = new Example();
    $("body").empty().append(window.example.html);

};



