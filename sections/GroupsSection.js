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
            var track = bitwig.trackbankPage.tracks[trackIndex];
            bitwig.trackbank.getChannel(trackIndex).addIsSelectedInMixerObserver(function(isSelected){
                that.sendGroupColor(trackIndex, track.getColor());
            });
            bitwig.trackbank.getChannel(trackIndex).addColorObserver(function(r, g, b){
                that.sendGroupColor(trackIndex, track.getColor());
            });
        })();
    }
};

GroupsSection.prototype.sendGroupColor = function(index, hsb) {
    midiOut.sendMidi(0xb0, CTRL.GROUPS[index], hsb.h);
    midiOut.sendMidi(0xb1, CTRL.GROUPS[index], hsb.s);
    midiOut.sendMidi(0xb2, CTRL.GROUPS[index], hsb.b);
};

GroupsSection.prototype.refreshTrackBankButtons = function() {
    for (var i = 0; i < CONFIG.GROUP_COUNT; i++) {
        var track = bitwig.trackbankPage.tracks[i];
        this.sendGroupColor(i, track.getColor());
    };
};

GroupsSection.prototype.handles = function(status, data1, data2) {
    return isInArray(getCcList(CTRL.GROUPS), data1) && status == 0xbf;
};

GroupsSection.prototype.onMidi = function(status, data1, data2) {
    var pressed = data2 >= 0x3F;
    var track = bitwig.trackbank.getChannel(CTRL.GROUPS.indexOf(data1));
    dump(track)

    if(pressed){
        bitwig.application.selectNone();
        track.select();

        if(MOD.DUPLICATE){
            bitwig.application.duplicate();
        } else if(MOD.ERASE){
            bitwig.application.remove();
        }
    }
};
