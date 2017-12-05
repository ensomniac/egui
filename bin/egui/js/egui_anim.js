'use strict';

function EguiAnim(duration, update_callback){
    this.description = "Animation transition";

    this.transition_duration = duration || 1000;
    this.is_animating = false;
    this.transition_start_time = 0;
    this.transition_end_time = 0;
    this.update_callback = update_callback;
    this.complete_callback = null;

    this.curves = {};
    this.curves["linear"] = null;
    this.curves["ease_in_out"] = null;
    this.curves["ease_in"] = null;
    this.curves["ease_out"] = null;

    this.curve = "ease_in_out";

    this.t = 0;

    this.set_duration = function(duration){
        this.transition_duration = duration;
    };

    this.set_update_callback = function(update_callback){
        this.update_callback = update_callback;
    };

    this.set_complete_callback = function(complete_callback){
        this.complete_callback = complete_callback;
    };

    this.curves["linear"] = function(t){
        return t;
    };

    this.curves["ease_in_out"] = function(t){
        return t<.5 ? 2*t*t : -1+(4-2*t)*t;
        // return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2; // Sin
    };

    this.curves["ease_in"] = function(t){
        return t*t;
        // return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2); // sin
    };

    this.curves["ease_out"] = function(t){
        return t*(2-t);
        // return Math.sin(Math.PI / 2 * t); // Sin
    };

    this.set_ease_curve = function(curve){

        if (this.curves[curve]) {
            this.curve = curve;
        }
        else {
            console.log("WARNING: EGUI ANIM set_ease_curve(curve) - Curve type '" + curve + "' does not exist.");
        };

    };





    this.update = function(timestamp){
        if (!this.is_animating) {
            return;
        }

        this.t = this.inverse_lerp(this.transition_start_time, this.transition_end_time, timestamp);

        if (this.t > 1) {
            this.t = 1;
        }

        if (this.update_callback) {
            this.update_callback(this.curves[this.curve](this.t));
        }

        if (this.t >= 1) {

            if (this.complete_callback) {
                this.complete_callback();
            }

            return;
        }

        (function(self){
            window.requestAnimationFrame(function(timestamp){
                self.update(timestamp);
            });
        })(this);
    };

    this.start = function(){
        this.is_animating = true;

        (function(self){
            window.requestAnimationFrame(function(timestamp){
                self.transition_start_time = timestamp;
                self.transition_end_time = self.transition_start_time + self.transition_duration;
                self.update(timestamp);
            });
        })(this);

        return this;
    };

    this.stop = function(){
        this.is_animating = false;
        return this;
    };

    this.inverse_lerp = function(min, max, val){
        var t = (val - min) / (max - min)
        return t;
    };

    this.lerp = function(valA, valB, t){
        if (t > 1) {t = 1;}
        if (t < 0) {t = 0;}

        var x = valA + t * (valB - valA);
        return x;
    };

}

