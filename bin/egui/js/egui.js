'use strict';

// Author: Ryan Martin ryan@ensomniac.com
// Github: https://github.com/ensomniac/egui

$(document).ready(function() {

    window.egui.start();

    var start_exists = false;
    try {if (Start) {start_exists = true;}} catch(e){};

    if (start_exists) {
        Egui = null;

        window.egui.Style = EguiStyle;
        EguiStyle = null;

        window.egui.Context = EguiContext;
        EguiContext = null;

        window.egui.Primitive = EguiPrimitive;
        EguiPrimitive = null;

        // LAYOUT ////////////////
        window.egui.Rect = EguiRect;
        EguiRect = null;

        window.egui.Layout = EguiLayout;
        EguiLayout = null;

        window.egui.layout.Linear = EguiLayoutLinear;
        EguiLayoutLinear = null;

        window.egui.layout.Horizontal = EguiLayoutHorizontal;
        EguiLayoutHorizontal = null;

        window.egui.layout.Vertical = EguiLayoutVertical;
        EguiLayoutVertical = null;

        window.egui.layout.CenterBox = EguiLayoutCenterBox;
        EguiLayoutCenterBox = null;





        window.egui.Packable = EguiPackable;
        EguiPackable = null;

        window.egui.LayoutContainer = EguiLayoutContainer;
        EguiLayoutContainer = null;

        window.egui.LayoutColumns = EguiLayoutColumns;
        EguiLayoutColumns = null;

        window.egui.LayoutRows = EguiLayoutRows;
        EguiLayoutRows = null;

        window.egui.LayoutBox = EguiLayoutBox;
        EguiLayoutBox = null;
        // LAYOUT ////////////////


        window.egui.Color = new EguiColor();
        EguiColor = null;

        window.egui.Anim = EguiAnim;
        EguiAnim = null;

        window.egui.View = EguiViewNew;
        EguiViewNew = null;

        window.egui.Packbox = EguiPackboxNew;
        EguiPackboxNew = null;

        window.egui.Hbox = EguiHbox;
        EguiHbox = null;

        window.egui.Vbox = EguiVbox;
        EguiVbox = null;

        window.egui["Box"] = EguiBox;
        EguiBox = null;

        window.egui["Label"] = EguiLabel;
        EguiLabel = null;

        window.egui["Icon"] = EguiIcon;
        EguiIcon = null;

        window.egui["ImageGallery"] = EguiImageGallery;
        EguiImageGallery = null;

        window.egui["Button"] = EguiButton;
        EguiButton = null;

        window.egui["ButtonBar"] = EguiButtonBar;
        EguiButtonBar = null;

        window.egui["Image"] = EguiImage;
        EguiButton = EguiImage;

        window.egui["Input"] = EguiInput;
        EguiInput = null;

        window.egui["alert"] = new EguiAlert().show;
        EguiAlert = null;

        window.egui["Spacer"] = EguiSpacer;
        EguiSpacer = null;

        window.egui["SpriteSheet"] = EguiSpriteSheet;
        EguiSpriteSheet = null;

        window.egui["LoadDots"] = EguiLoadDots;
        EguiLoadDots = null;

        window.egui["Modal"] = EguiModal;
        EguiModal = null;

        window.egui["HTML"] = EguiHTML;
        EguiHTML = null;


        // HTML PARTS ///////////////////////////////
        window.egui.html.Button = EguiHTMLButton;
        EguiHTMLButton = null;

        window.egui.html.Label = EguiHTMLLabel;
        EguiHTMLLabel = null;

        window.egui.html.Highlight = EguiHTMLHighlight;
        EguiHTMLHighlight = null;

        window.egui.html.Icon = EguiHTMLIcon;
        EguiHTMLIcon = null;

        window.egui.html.OnResize = EguiHTMLOnResize;
        EguiHTMLOnResize = null;

        window.egui.html.Dialog = EguiHTMLDialog;
        EguiHTMLDialog = null;

        // This will self assign itself
        new window.egui.Style();

        Start();
    }
    else {
        console.log("No 'Start()' function found. Include Start() to be called when the system is ready.");
    };

});

function Egui(){
    this.description = "EGUI Core"

    this.alert = null;

    this.Style = null;
    this.Color = null;

    this.current_context = null;
    this.Context = null;
    this.HTML = null;

    this.Rect = null;
    this.Primitive = null;

    this.Layout = null;
    this.Packable = null;
    this.Spacer = null;
    this.Modal = null;

    this.LayoutContainer = null;
    this.LayoutColumns = null;
    this.LayoutRows = null;
    this.LayoutBox = null;

    this.layout = {};
    this.layout["Horizontal"] = null;
    this.layout["Vertical"] = null;
    this.layout["Grid"] = null;
    this.layout["Ripple"] = null;
    this.layout["CenterBox"] = null;

    this.Anim = null;

    this.View = null;
    this.Packbox = null;
    this.Hbox = null;
    this.Vbox = null;

    this.Box = null;

    this.ImageGallery = null;

    this.Label = null;
    this.Button = null;
    this.ButtonBar = null;
    this.Image = null;
    this.Input = null;
    this.Icon = null;
    this.SpriteSheet = null;
    this.LoadDots = null;

    // HTML Simple Objects
    this.html = {};
    this.html.Button = null;
    this.html.Label = null;
    this.html.Highlight = null;
    this.html.Icon = null;
    this.html.OnResize = null;
    this.html.Dialog = null;

    // Global Functions
    this.lerp = null;
    this.inverse_lerp = null;
    this.lerp_rgb = null;
    this.make_gradient_from_rgb = null;
    this.adjust_rgb = null;
    this.format_time = null;
    this.random_color = null;
    this.is_mobile = null;
    this.is_object = null;

    this.get_image_size_from_src = null;
    this.image_size_cache = {};

    this.create_public_functions = function(){
        // This wrapper function is simply used to organize the public function descriptions

        this.get_image_size_from_src = function(src, callback){
            if (this.image_size_cache[src]) {
                callback(this.image_size_cache[src]["width"], this.image_size_cache[src]["height"]);
                return;
            };

            var img = new Image();
            img.src = src;

            (function(self, img, src, callback){

                img.onload = function() {
                    self.image_size_cache[src] = {"width": this.width, "height": this.height};
                    callback(this.width, this.height);
                };

            })(this, img, src, callback);

        };



        this.is_object = function(obj){

            // null and undefined are "empty"
            if (obj == null || obj == undefined) {
                return false;
            };

            return true;

        };

        this.inverse_lerp = function(min, max, val, ease){
            var t = (val - min) / (max - min);
            return t;
        };

        this.lerp = function(valA, valB, t){
            if (t > 1) {t = 1;}
            if (t < 0) {t = 0;}

            var x = valA + t * (valB - valA);
            return x;
        };

        this.lerp_rgb = function(rgb_a, rgb_b, t){
            return [
                parseInt(this.lerp(rgb_a[0], rgb_b[0], t)),
                parseInt(this.lerp(rgb_a[1], rgb_b[1], t)),
                parseInt(this.lerp(rgb_a[2], rgb_b[2], t))
            ];
        };

        this.make_gradient_from_rgb = function(rgb, opac){
            var center = 50;
            var opac = opac || 1;

            var top_color = this.adjust_rgb(rgb, 0.1, 70);
            var mid_color = rgb;
            var bot_color = this.adjust_rgb(rgb, 0.1, -50);

            var grad = "-webkit-linear-gradient(top, ";
            grad += "rgba(" + top_color[0] + "," + top_color[1] + "," + top_color[2] + "," + opac + ")";
            grad += " 0%,";
            grad += "rgba(" + mid_color[0] + "," + mid_color[1] + "," + mid_color[2] + "," + opac + ")";
            grad += " " + center + "%,";
            grad += "rgba(" + bot_color[0] + "," + bot_color[1] + "," + bot_color[2] + "," + opac + ")";
            grad += " 100%)";

            return grad;
        };

        this.rgb_component_to_hex = function(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        };

        this.rgb_to_hex = function(rgb) {
            var hex = "#" + this.rgb_component_to_hex(rgb[0]);
            hex += this.rgb_component_to_hex(rgb[1]);
            hex += this.rgb_component_to_hex(rgb[2]);
            return hex;
        };

        this.hex_to_rgb = function(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16)
            ] : null;
        };

        this.rgb_to_css = function(rgb_a) {
            if (rgb_a.length == 3) {
                var color = "rgb(" + rgb_a[0] + "," + rgb_a[1] + "," + rgb_a[2] + ")"
            }
            else {
                var color = "rgba(" + rgb_a[0] + "," + rgb_a[1] + "," + rgb_a[2] + "," + rgb_a[3] + ")"
            };

            return color;
        };

        this.adjust_rgb = function(rgb, sat, brightness){
            // Sat = 0, 1 (0 = no change)
            // Brightness = -255, 255 (0 = no change)

            var adjusted = [0, 0, 0];

            if (brightness != null) {
                adjusted[0] = parseInt(Math.min(Math.max((rgb[0] + brightness), 0), 255));
                adjusted[1] = parseInt(Math.min(Math.max((rgb[1] + brightness), 0), 255));
                adjusted[2] = parseInt(Math.min(Math.max((rgb[2] + brightness), 0), 255));
            }
            else {
                adjusted[0] = rgb[0];
                adjusted[1] = rgb[1];
                adjusted[2] = rgb[2];
            }

            if (sat != null) {
                var sat_adjusted = [0, 0, 0];

                var avg = parseInt((adjusted[0] + adjusted[1] + adjusted[2])/3.0);
                sat_adjusted[0] = parseInt(Math.min(Math.max(this.lerp(adjusted[0], avg, sat), 0), 255));
                sat_adjusted[1] = parseInt(Math.min(Math.max(this.lerp(adjusted[1], avg, sat), 0), 255));
                sat_adjusted[2] = parseInt(Math.min(Math.max(this.lerp(adjusted[2], avg, sat), 0), 255));

                adjusted = sat_adjusted;
            };

            return adjusted;
        };

        this.format_time = function(js_date, format){
            format = format || 1;

            var months = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];

            var month_number = js_date.getMonth() + 1;
            var month = months[month_number - 1];
            var day = js_date.getDate();
            var year = js_date.getFullYear();
            var hour = js_date.getHours();
            var minute = js_date.getMinutes();
            var tz = js_date.getTimezoneOffset();
            var ampm = hour < 12 ? "am" : "pm";

            if (hour == 0) {
                hour = 12;
            }
            else if (hour >= 12) {
                hour = hour-12;
            };

            if (("" + minute).length == 1) {
                minute = "0" + minute;
            };

            var smap = {1: "st", 2: "nd", 3: "rd", 21: "st", 22: "nd", 23: "rd", 31: "st"};
            var suffix = smap[day] || "th";

            var formated_time = "Unknown format type";

            if (format == 0) {
                // {month, day, year, hour, minute, ampm}
                formated_time = {};
                formated_time["month"] = month;
                formated_time["day"] = day;
                formated_time["year"] = year;
                formated_time["hour"] = hour;
                formated_time["minute"] = minute;
                formated_time["ampm"] = ampm;
                formated_time["suffix"] = suffix;
            }
            else if (format == 1) {
                // 1:08pm
                formated_time = hour + ":" + minute + " " + ampm;
            }
            else if (format == 2) {
                // 12/12/2017
                formated_time = month_number + "/" + day + "/" + year;
            }
            else if (format == 3) {
                // 12/12
                formated_time = month_number + "/" + day
            }
            return formated_time;
        };

        this.random_color = function(){
            return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
        };

        this.is_mobile = function(){
            var uag = navigator.userAgent||navigator.vendor||window.opera;
            return(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(uag)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(uag.substr(0,4)));
        };
    };

    this.create_prototypes = function(){

        this.array_remove = function(array, item_to_remove){
            var index = array.indexOf(item_to_remove);

            if (index > -1) {
                array.splice(index, 1);
            };

            return array;

        };

        this.object_length = function(obj){
            var count = 0;

            for (var key in obj) {
                count += 1;
            };

            return count;
        };

        (function(self){

            Object.defineProperty(Array.prototype, 'remove', {
                "value" : function(item_to_remove) {return self.array_remove(this, item_to_remove)},
                "enumerable" : false
            });

            Object.defineProperty(Object.prototype, 'length', {
                "value" : function() {return self.object_length(this)},
                "enumerable" : false
            });

        })(this);

    };

    this.start = function(){
        // Called when all scripts are loaded but before modules are created
        this.create_prototypes();
        this.create_public_functions();
    };

};

window.egui = new Egui();