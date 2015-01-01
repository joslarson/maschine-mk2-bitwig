var GroupsSection = function(){
    this.TRACK_SELECT = 0;
    this.TRACK_BANK_SELECT = 1;
    this.TRACK_SOLO = 2;
    this.TRACK_MUTE = 3;

    this.mode = this.TRACK_SELECT;

    this.buttonColors = []

    this.selectedTrackIndex = undefined;
    this.trackBankPage = 0;
    this.bankPageTrackCount = 0;

    trackbank.addChannelScrollPositionObserver(function(position){
        // println('Called scrollPositionObserver(): ' + position);
        // sections.groups.selectedTrackIndex = undefined;
        sections.groups.trackBankPage = position / 8;
        sections.groups.setBankPageTrackCount();
        sections.groups.refreshTrackBankButtons();
    }, 0);

    trackbank.addChannelCountObserver(function(count){
        // println('Called channelCountObserver(): ' + count);
        trackCount = count;
        sections.groups.setBankPageTrackCount();
        sections.groups.refreshTrackBankButtons();
    });

    for (var i = 0; i < 8; i++) {
        (function(){
            const t = i;
            trackbank.getChannel(t).addIsSelectedInMixerObserver(function(isSelected){
                // println('Called isSelectedInMixerObserver(): Slot ' + t + ', ' + isSelected);
                var selected = sections.groups.selectedTrackIndex;
                if(t == selected && !isSelected){
                    sections.groups.selectedTrackIndex = undefined;
                }
                // Set color if it is available
                if(sections.groups.buttonColors[t] != undefined){
                    midiOut.sendMidi(0xb0, CTRL.GROUPS[t], sections.groups.buttonColors[t]['h']);
                    midiOut.sendMidi(0xb1, CTRL.GROUPS[t], sections.groups.buttonColors[t]['s']);
                }
                // Handle brightness chnges to group buttons during selection
                if(isSelected){
                    sections.groups.selectedTrackIndex = t;
                    midiOut.sendMidi(0xb2, CTRL.GROUPS[t], 127);
                } else if(sections.groups.trackExists(t)){
                    midiOut.sendMidi(0xb2, CTRL.GROUPS[t], 0);
                } else {
                    midiOut.sendMidi(0xb2, CTRL.GROUPS[t], 10);
                }
            });
            trackbank.getChannel(t).addColorObserver(function(r, g, b){
                var hsb = rgb2hsb(r,g,b);
                sections.groups.buttonColors[t] = hsb;
                // println('Called colorObserver(): Slot ' + t + ' [' + hsb['h'] + ', ' + hsb['s'] + ', ' + hsb['b'] + ']');
                sections.groups.refreshTrackBankButton(t);
            });
        })();
    }

    trackbank.scrollChannelsPageDown();
    trackbank.scrollChannelsPageUp();
};


GroupsSection.prototype.setBankPageTrackCount = function() {
    this.bankPageTrackCount = trackCount < ((sections.groups.trackBankPage + 1) * 8) ? trackCount % 8 : 8;
};

GroupsSection.prototype.trackExists = function(index) {
    return this.bankPageTrackCount && index > this.bankPageTrackCount - 1;
}

GroupsSection.prototype.refreshTrackBankButton = function(index) {
    if(sections.groups.buttonColors[index] != undefined){
        midiOut.sendMidi(0xb0, CTRL.GROUPS[index], sections.groups.buttonColors[index]['h']);
        midiOut.sendMidi(0xb1, CTRL.GROUPS[index], sections.groups.buttonColors[index]['s']);
    }
    if(index == this.selectedTrackIndex){
        midiOut.sendMidi(0xb2, CTRL.GROUPS[index], 127);
    } else if(this.trackExists(index)){
        midiOut.sendMidi(0xb2, CTRL.GROUPS[index], 0);
    } else {
        midiOut.sendMidi(0xb2, CTRL.GROUPS[index], 10);
    }
};

GroupsSection.prototype.refreshTrackBankButtons = function() {
    for (var i = 0; i < 8; i++) {
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