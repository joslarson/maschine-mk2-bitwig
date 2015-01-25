var TransportSection = function(){
    bitwig.transport.addIsPlayingObserver(function(isPlaying){
        toggleBtn(CTRL.TRANSPORT.PLAY, isPlaying);
        bitwig.transportIsPlaying = isPlaying;
    });
};

TransportSection.prototype.handles = function(status, data1, data2) {
    return isInArray(getCcList(CTRL.TRANSPORT), data1);
};

TransportSection.prototype.onMidi = function(status, data1, data2) {
    var pressed = data2 >= 0x3F;

    if (data1 == CTRL.TRANSPORT.PLAY) {
        pressed ? bitwig.transport.play() : bitwig.transport.stop();
    } else if(data1 == CTRL.TRANSPORT.ERASE) {
        pressed ? MOD.ERASE = true : MOD.ERASE = false;
    }
};