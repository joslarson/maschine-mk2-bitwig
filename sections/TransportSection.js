var TransportSection = function(){
    bitwig.transport.addIsPlayingObserver(function(isPlaying){
        toggleBtn(CTRL.TRANSPORT.PLAY, isPlaying);
        bitwig.transportIsPlaying = isPlaying;
    });
    bitwig.transport.addLauncherOverdubObserver(function(isActive){
        toggleBtn(CTRL.TRANSPORT.REC, isActive);
        bitwig.launcherOverdubIsActive = isActive;
    });
};

TransportSection.prototype.handles = function(status, data1, data2) {
    return isInArray(getCcList(CTRL.TRANSPORT), data1);
};

TransportSection.prototype.onMidi = function(status, data1, data2) {
    var pressed = data2 >= 0x3F;

    if (data1 == CTRL.TRANSPORT.RESTART && pressed) {
        bitwig.transport.restart();
    } else if (data1 == CTRL.TRANSPORT.LEFT && pressed) {
        bitwig.transport.rewind();
    } else if (data1 == CTRL.TRANSPORT.RIGHT && pressed) {
        bitwig.transport.fastForward();
    } else if(data1 == CTRL.TRANSPORT.GRID) {
        if(pressed){
            MOD.SHIFT = true;
            sections.pads.setMode(sections.pads.SHIFT_MODE);
        } else {
            MOD.SHIFT = false;
            sections.pads.setMode(sections.pads.prevMode);
        }
    } else if (data1 == CTRL.TRANSPORT.PLAY) {
        if(MOD.SHIFT){
            bitwig.transport.toggleClick();
        } else {
            bitwig.transport.togglePlay();
        }
    } else if (data1 == CTRL.TRANSPORT.REC) {
        bitwig.transport.toggleLauncherOverdub();
    } else if(data1 == CTRL.TRANSPORT.ERASE) {
        pressed ? MOD.ERASE = true : MOD.ERASE = false;
    }
};