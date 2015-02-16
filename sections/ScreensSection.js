var ScreensSection = function(){
    for (var i = 0; i < 8; i++) {
        (function(){
            const t = i;
            bitwig.trackbank.getChannel(t).getVolume().addRawValueObserver(function(value){
                // println(value);
                midiOut.sendMidi(0xbf, CTRL.SCREENS.VOL[t], Math.round(value * 100));
            });
            bitwig.trackbank.getChannel(t).getPan().addRawValueObserver(function(value){
                var percent = (1 + value) / 2;
                // println(percent);
                midiOut.sendMidi(0xbf, CTRL.SCREENS.PAN[t], Math.round(percent * 127));
            });
            bitwig.trackbank.getChannel(t).getArm().addValueObserver(function(isArmed){
                var value = isArmed ? 127 : 0;
                midiOut.sendMidi(0xbf, CTRL.SCREENS.ARM[t], value);
            });
        })();
    }
};

ScreensSection.prototype.handles = function(status, data1, data2) {
    if(isInArray(getCcList(CTRL.SCREENS), data1)){
        return true;
    } else {
        return false;
    }
};

ScreensSection.prototype.onMidi = function(status, data1, data2) {
    var pressed = data2 >= 0x3F;
    var bankPageTrackCount = bitwig.trackbankPage.pageTrackCount;

    if((volIndex = CTRL.SCREENS.VOL.indexOf(data1)) > -1){
        if(volIndex > bankPageTrackCount - 1){
            midiOut.sendMidi(0xbf, CTRL.SCREENS.VOL[volIndex], 0);
        } else {
            bitwig.trackbank.getChannel(volIndex).getVolume().setRaw(data2/100);
        }
    } else if((panIndex = CTRL.SCREENS.PAN.indexOf(data1)) > -1){
        if(panIndex > bankPageTrackCount - 1){
            midiOut.sendMidi(0xbf, CTRL.SCREENS.PAN[panIndex], 63);
        } else {
            var rawValue = data2 == 63 ? 0 : ((data2 / 127) * 2) - 1;
            bitwig.trackbank.getChannel(panIndex).getPan().setRaw(rawValue);
        }
    } else if((armIndex = CTRL.SCREENS.ARM.indexOf(data1)) > -1){
        if(armIndex > bankPageTrackCount - 1){
            midiOut.sendMidi(0xbf, CTRL.SCREENS.ARM[armIndex], 0);
        } else {
            bitwig.trackbank.getChannel(armIndex).getArm().set(pressed);
        }
    }
};