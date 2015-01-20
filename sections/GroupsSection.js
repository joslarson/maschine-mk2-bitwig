var GroupsSection = function(){
    var that = this;

    bitwig.trackbank.addChannelScrollPositionObserver(function(position){
        that.refreshTrackBankButtons();
    }, 0);

    bitwig.trackbank.addChannelCountObserver(function(count){
        that.refreshTrackBankButtons();
    });

    for (var i = 0; i < CONFIG.GROUP_COUNT; i++) {
        (function(){
            const trackIndex = i;
            bitwig.trackbank.getChannel(trackIndex).addIsSelectedInMixerObserver(function(isSelected){
                var track = bitwig.trackbankPage.tracks[trackIndex];
                var selectedTrackIndex = bitwig.trackbankPage.selectedTrackIndex;
                var data2 = CTRL.GROUPS[trackIndex];

                that.refreshTrackBankButton(trackIndex, isSelected);
            });
            bitwig.trackbank.getChannel(trackIndex).addColorObserver(function(r, g, b){
                that.refreshTrackBankButton(trackIndex);
            });
        })();
    }
};

GroupsSection.prototype.refreshTrackBankButton = function(index, isSelected) {
    isSelected = isSelected != undefined ? isSelected : index == bitwig.trackbankPage.selectedTrackIndex;
    
    var track = bitwig.trackbankPage.tracks[index];
    var data2 = CTRL.GROUPS[index];
    
    // Set color if it is available
    if(track.color){
        midiOut.sendMidi(0xb0, data2, track.color.h);
        midiOut.sendMidi(0xb1, data2, track.color.s);
    }
    // Handle brightness changes to group buttons during selection
    if(isSelected){
        midiOut.sendMidi(0xb2, data2, 127);
    } else if(!track.exists){
        midiOut.sendMidi(0xb2, data2, 0);
    } else {
        midiOut.sendMidi(0xb2, data2, CONFIG.DIM_VALUE);
    }
};

GroupsSection.prototype.refreshTrackBankButtons = function() {
    for (var i = 0; i < CONFIG.GROUP_COUNT; i++) {
        this.refreshTrackBankButton(i);
    };
};

GroupsSection.prototype.handles = function(status, data1, data2) {
    if(isInArray(getCcList(CTRL.GROUPS), data1) && status == 0xbf){
        return true;
    } else {
        return false;
    }
};

GroupsSection.prototype.onMidi = function(status, data1, data2) {
    var pressed = data2 >= 0x3F;
    var track = CTRL.GROUPS.indexOf(data1);
    bitwig.trackbank.getChannel(track).selectInMixer();
};