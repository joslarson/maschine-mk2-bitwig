var TransportSection = function(){
    transport.addIsPlayingObserver(function(isPlaying){
        toggleBtn(CTRL.TRANSPORT.PLAY, isPlaying);
    });
};

TransportSection.prototype.handles = function(status, data1, data2) {
    if(isInArray(getCcList(CTRL.TRANSPORT), data1)){
        return true;
    } else {
        return false;
    }
};

TransportSection.prototype.onMidi = function(status, data1, data2) {
    var pressed = data2 >= 0x3F;

    if (data1 == CTRL.TRANSPORT.PLAY) {
        if(pressed){
            transport.play();
        } else {
            transport.stop();
        }
    }
};