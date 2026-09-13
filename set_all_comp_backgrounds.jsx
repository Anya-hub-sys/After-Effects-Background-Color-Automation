// set_all_comp_backgrounds.jsx
// Loops through EVERY composition in the currently open After Effects
// project and sets its background color to the hex value below.

var HEX_COLOR = "969696"; // change this if you want a different color later

function hexToRGB01(hex) {
    hex = hex.replace("#", "");
    var r = parseInt(hex.substring(0, 2), 16) / 255;
    var g = parseInt(hex.substring(2, 4), 16) / 255;
    var b = parseInt(hex.substring(4, 6), 16) / 255;
    return [r, g, b];
}

app.beginUndoGroup("Set All Comp Backgrounds");

var color = hexToRGB01(HEX_COLOR);
var count = 0;

for (var i = 1; i <= app.project.items.length; i++) {
    var item = app.project.items[i];
    if (item instanceof CompItem) {
        item.bgColor = color;

        // Turn off "Toggle Transparency Grid" so the background color actually shows
        item.openInViewer();
        var viewer = app.activeViewer;
        if (viewer !== null) {
            for (var v = 0; v < viewer.views.length; v++) {
                viewer.views[v].options.checkerboards = false;
            }
        }

        count++;
    }
}

app.endUndoGroup();

alert("Done! Set background color on " + count + " composition(s) to #" + HEX_COLOR + ".");
