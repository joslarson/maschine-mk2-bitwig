var MasterSection = function(){
};

MasterSection.prototype.handles = function(status, data1, data2) {
    return isInArray(getCcList(CTRL.MASTER), data1);
};

MasterSection.prototype.onMidi = function(status, data1, data2) {
    var pressed = data2 >= 0x3F;

    if (data1 == CTRL.MASTER.NOTE_REPEAT && pressed) {
        bitwig.transport.tapTempo();
    } else if (data1 == CTRL.MASTER.LEFT && pressed) {
        bitwig.trackbank.scrollChannelsPageUp();
    } else if (data1 == CTRL.MASTER.RIGHT && pressed) {
        bitwig.trackbank.scrollChannelsPageDown();
    }
};