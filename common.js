function toggleBtn(button, test){
    if(test){
        midiOut.sendMidi(0xbf, button, 127);
    } else {
        midiOut.sendMidi(0xbf, button, 0);
    }
}

function isInArray(array, searchValue) {
    for (var i = array.length - 1; i >= 0; i--) {
        if(array[i] == searchValue) return true;
    };
    return false;
}


function getCcList(ctrlSection) {
    var ccList = [];
    var keys = Object.keys(ctrlSection);
    // println(keys);
    for (var i = 0; i < keys.length; i++) {
        var node = ctrlSection[keys[i]];
        if(typeof(node) === 'number'){
            ccList.push(node);
        } else {
            ccList = ccList.concat(getCcList(node));
        }
    };
    return ccList;
}

function isCc(status) {
    return (status & 0xf0) == 0xb0;
}

function isNote(status) {
    return ((status & 0xf0) == 0x80) || ((status & 0xf0) == 0x90);
}

function rgb2hsb(r, g, b) {
    var result = {};

    var minVal = Math.min(r, g, b);
    var maxVal = Math.max(r, g, b);
    var delta = maxVal - minVal;

    result.b = maxVal;

    if (delta == 0) {
        result.h = 0;
        result.s = 0;
    } else {
        result.s = delta / maxVal;
        var del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
        var del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
        var del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;

        if (r == maxVal) { result.h = del_B - del_G; }
        else if (g == maxVal) { result.h = (1 / 3) + del_R - del_B; }
        else if (b == maxVal) { result.h = (2 / 3) + del_G - del_R; }

        if (result.h < 0) { result.h += 1; }
        if (result.h > 1) { result.h -= 1; }
    }

    result.h = Math.round(result.h * 360);
    result.s = Math.round(result.s * 1);
    result.b = Math.round(result.b * 1);

    result.h = Math.floor (result.h * 127.0 / 360.0);
    result.s = Math.floor ((1 - Math.pow (1 - result.s, 2)) * 127.0);
    result.b = Math.floor (result.b * 127.0);
 
    return result;
}

function initCountingArray(startValue, length) {
    var arr = [];
    arr.length = length;
    for (var x = 0; x < arr.length; x++) {
        arr[x] = x;
    }
    return arr;
}