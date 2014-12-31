var GroupsSection = function(){
    this.TRACK_SELECT = 0;
    this.TRACK_BANK_SELECT = 1;
    this.TRACK_SOLO = 2;
    this.TRACK_MUTE = 3;

    this.mode = this.TRACK_SELECT;

    this.selectedTrackIndex = 0;
    this.trackBankPage = 0;
    this.bankPageTrackCount = 0;

    trackbank.addChannelScrollPositionObserver(function(position){
        println('Called scrollPositionObserver(): ' + position);
        sections.groups.trackBankPage = position / 8;
        sections.groups.setBankPageTrackCount();
        // trackbank.getChannel(0).selectInMixer();
        sections.groups.refreshBrightnessLevels();
    }, 0);

    trackbank.addChannelCountObserver(function(count){
        println('Called channelCountObserver(): ' + count);
        trackCount = count;
        sections.groups.setBankPageTrackCount();
        sections.groups.refreshBrightnessLevels();
    });

    for (var i = 0; i < 8; i++) {
        (function(){
            const t = i;
            trackbank.getChannel(t).addIsSelectedInMixerObserver(function(isSelected){
                println('Called isSelectedInMixerObserver(): Slot ' + (t) + ', ' + isSelected);
                println(t + ' > ' + (sections.groups.bankPageTrackCount - 1));
                if(isSelected){
                    sections.groups.selectedTrackIndex = t;
                    midiOut.sendMidi(0xb2, CTRL.GROUPS[t], 127);
                } else if(t > sections.groups.bankPageTrackCount - 1){
                    println('off: ' + t);
                    midiOut.sendMidi(0xb2, CTRL.GROUPS[t], 0);
                } else {
                    midiOut.sendMidi(0xb2, CTRL.GROUPS[t], 10);
                }
            });
            trackbank.getChannel(t).addColorObserver(function(r, g, b){
                var hsb = rgb2hsb(r,g,b);
                println('Called colorObserver(): [' + hsb['h'] + ', ' + hsb['s'] + ', ' + hsb['b'] + ']');

                midiOut.sendMidi(0xb0, CTRL.GROUPS[t], hsb['h']);
                midiOut.sendMidi(0xb1, CTRL.GROUPS[t], hsb['s']);

                if(hsb['b'] == 0){ // bitwig is turning it off
                    midiOut.sendMidi(0xb2, CTRL.GROUPS[t], 0);
                } else if(t != sections.groups.selectedTrack){
                    midiOut.sendMidi(0xb2, CTRL.GROUPS[t], 10);
                }
            });
        })();
    }

    trackbank.scrollChannelsPageDown();
    trackbank.scrollChannelsPageUp();
};

GroupsSection.prototype.setBankPageTrackCount = function() {
    this.bankPageTrackCount = trackCount < ((sections.groups.trackBankPage + 1) * 8) ? trackCount % 8 : 8;
};

GroupsSection.prototype.refreshBrightnessLevels = function() {
    for (var i = 0; i < 8; i++) {
        if(i == this.selectedTrackIndex){
            midiOut.sendMidi(0xb2, CTRL.GROUPS[i], 127);
        } else if(i > this.bankPageTrackCount - 1){
            midiOut.sendMidi(0xb2, CTRL.GROUPS[i], 0);
        } else {
            midiOut.sendMidi(0xb2, CTRL.GROUPS[i], 10);
        }
    };
};

GroupsSection.prototype.handles = function(status, data1, data2) {
    if(isInArray(getCcList(CTRL.GROUPS), data1)){
        return true;
    } else {
        return false;
    }
};

GroupsSection.prototype.onMidi = function(status, data1, data2) {
    var pressed = data2 >= 0x3F;
    var channel = CTRL.GROUPS.indexOf(data1);
    trackbank.getChannel(channel).selectInMixer();
    // println(channel);
};

function shiftHue(hue, steps) {
    if(hue + steps > 127){
        return steps - (127 - hue) - 1;
    } else if(hue + steps < 0) {
        return 127 + (steps + hue)
    } else {
        return hue + steps;
    }
}

function addIndexedColorObserver(i, func){
    return function(r, g, b){
        func(i, r, g, b);
    }
}

var TrackUtils = function(){
}