var PadsSection = function(){
    this.TRACK_CLIP_SELECT = 0;
    this.TRACK_CLIP_SOLO = 1;
    this.TRACK_CLIP_MUTE = 2;

    this.mode = this.TRACK_CLIP_SELECT;

    this.padColors = [];

    this.selectedPadIndex = undefined;

    // setup clipSlot observers for all 8 trackbank slots
    for (var i = 0; i < 8; i++) {
        (function(){
            const t = i;

            var trackClipSlots = trackbank.getChannel(t).getClipLauncherSlots();
            trackClipSlots.addColorObserver(function(index, r, g, b){
                if(index < 16){
                    var hsb = rgb2hsb(r,g,b);
                    if(sections.pads.padColors[t] == undefined) sections.pads.padColors[t] = [];
                    sections.pads.padColors[t][index] = hsb;
                }
            });

            trackbank.getChannel(t).addIsSelectedInMixerObserver(function(isSelected){
                if(isSelected){
                    if(sections.pads.padColors[t] == undefined) sections.pads.padColors[t] = [];
                    for (var i = 0; i < sections.pads.padColors[t].length; i++) {
                        var hsb = sections.pads.padColors[t][i];
                        hsb['b'] = hsb['off'] ? 0 : 10;
                        sections.pads.sendPadColor(i, hsb);
                    };
                }
            });
            trackClipSlots.addIsSelectedObserver(function(index, isSelected){
                var hsb = sections.pads.padColors[t][index];
                var isOff = hsb['b'] == 0;
                if(isSelected){
                    hsb['b'] = 127;
                } else {
                    hsb['b'] = hsb['off'] ? 0 : 10;
                }
                sections.pads.sendPadColor(index, hsb);
            });
        })();
    }

    trackbank.scrollChannelsPageDown();
    trackbank.scrollChannelsPageUp();
};

PadsSection.prototype.handles = function(status, data1, data2) {
    if(isInArray(getCcList(CTRL.PADS), data1)){
        return true;
    } else {
        return false;
    }
};

PadsSection.prototype.onMidi = function(status, data1, data2) {
    var pressed = data2 >= 0x3F;
};

PadsSection.prototype.sendPadColor = function(index, hsb) {
    midiOut.sendMidi(0x90, CTRL.PADS[index], hsb['h']);
    midiOut.sendMidi(0x91, CTRL.PADS[index], hsb['s']);
    midiOut.sendMidi(0x92, CTRL.PADS[index], hsb['b']);
};