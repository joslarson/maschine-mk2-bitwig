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
            
            bitwig.trackbank.getChannel(trackIndex).addNoteObserver(function(isNoteOn, note, velocity){
                if(track.type == 'Instrument' && isNoteOn){
                    var color = track.getColor();
                    orig_sat = color.s;
                    color.s = 80;
                    that.sendGroupColor(trackIndex, color);
                    host.scheduleTask(function(){
                        color.s = orig_sat;
                        that.sendGroupColor(trackIndex, color);
                    }, null, 80);
                }
            });

            bitwig.trackbank.getChannel(trackIndex).addVuMeterObserver(128, -1, true, function(range){
                if(track.type == 'Audio'){
                    var color = track.getColor();
                    range = range < 10 ? 0 : parseInt(color.s * ((range / 175)));
                    color.s = color.s > 60 ? color.s - range : color.s + range;
                    that.sendGroupColor(trackIndex, color);
                    // var color = track.getColor();
                    // var selectedTrackIndex = bitwig.trackbankPage.selectedTrackIndex;
                    // if(trackIndex == selectedTrackIndex){
                    //     color.b = 127 - parseInt((127 - CONFIG.DIM_VALUE) * (range / 140));
                    //     that.sendGroupColor(trackIndex, color);
                    // } else {
                    //     color.b = CONFIG.DIM_VALUE + parseInt((127 - CONFIG.DIM_VALUE) * (range / 140));
                    //     that.sendGroupColor(trackIndex, color);
                    // }
                }
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
