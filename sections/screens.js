var ScreensSection = function(){
    for (var i = 0; i < 8; i++) {
        (function(){
            const t = i;
            trackbank.getChannel(t).getVolume().addRawValueObserver(function(value){
                // println(value);
                midiOut.sendMidi(0xbf, CTRL.SCREENS.VOL[t], Math.round(value * 100));
            });
            trackbank.getChannel(t).getPan().addRawValueObserver(function(value){
                var percent = (1 + value) / 2;
                // println(percent);
                midiOut.sendMidi(0xbf, CTRL.SCREENS.PAN[t], Math.round(percent * 127));
            });
        })();
    };
}

ScreensSection.prototype.handles = function(status, data1, data2) {
    // println(getCcList(CTRL.SCREENS));
    if(isInArray(getCcList(CTRL.SCREENS), data1)){
        return true;
    } else {
        return false;
    }
};

ScreensSection.prototype.onMidi = function(status, data1, data2) {
    var pressed = data2 >= 0x3F;
    var volIndex = CTRL.SCREENS.VOL.indexOf(data1);
    var panIndex = CTRL.SCREENS.PAN.indexOf(data1);
    var bankPageTrackCount = sections.groups.bankPageTrackCount;

    if(volIndex > -1){
        if(volIndex > bankPageTrackCount - 1){
            midiOut.sendMidi(0xbf, CTRL.SCREENS.VOL[volIndex], 0);
        } else {
            trackbank.getChannel(volIndex).getVolume().setRaw(data2/100);
        }
    } else if(panIndex > -1){
        if(panIndex > bankPageTrackCount - 1){
            midiOut.sendMidi(0xbf, CTRL.SCREENS.PAN[panIndex], 63);
        } else {
            var rawValue = data2 == 63 ? 0 : ((data2 / 127) * 2) - 1;
            trackbank.getChannel(panIndex).getPan().setRaw(rawValue);
        }
    }
};