var PadsSection = function(){
    that = this;

    // this.TRACK_CLIP_SELECT = 0;
    // this.TRACK_CLIP_SOLO = 1;
    // this.TRACK_CLIP_MUTE = 2;

    // this.mode = this.TRACK_CLIP_SELECT;

    // this.playingClips = [];

    // setup clipSlot observers for all 8 trackbank slots
    for (var i = 0; i < CONFIG.GROUP_COUNT; i++) {
        (function(){
            const trackIndex = i;
            var track = bitwig.trackbankPage.tracks[trackIndex];
            var trackClipSlots = bitwig.trackbank.getChannel(trackIndex).getClipLauncherSlots();
            
            trackClipSlots.addColorObserver(function(index, r, g, b){
                if(index < CONFIG.PAD_COUNT){
                    var clip = track.clips[index];
                    var hsb = clip.color;
                    
                    if(trackIndex == bitwig.trackbankPage.selectedTrackIndex){
                        that.refreshClipPad(index, clip);
                    }
                }
            });

            bitwig.trackbank.getChannel(trackIndex).addIsSelectedInMixerObserver(function(isSelected){
                for (var i = 0; i < CONFIG.PAD_COUNT; i++) {
                    if(isSelected){
                        for (var i = 0; i < track.clips.length; i++) {
                            var clip = track.clips[i];
                            that.refreshClipPad(i, clip);
                        };
                    } else if(!isSelected && bitwig.trackbankPage.selectedTrackIndex == null){
                        that.sendPadColor(i, {h:0,s:0,b:0,off:true});
                    }
                }
            });
 
            trackClipSlots.addIsPlayingObserver(function(index, isPlaying){
                if(trackIndex == bitwig.trackbankPage.selectedTrackIndex){
                    var clip = track.clips[index];
                    that.refreshClipPad(index, clip);
                }
            });
        })();
    }
};

PadsSection.prototype.refreshClipPad = function(index, clip) {
    var hsb = clip.color;

    if(clip.isPlaying){
        hsb = {h: hsb.h, s: hsb.s, b: 127};
    } else if(clip.hasContent){
        hsb = {h: hsb.h, s: hsb.s, b: CONFIG.DIM_VALUE};
    } else {
        hsb = {h: hsb.h, s: hsb.s, b: 0};
    }
    this.sendPadColor(index, hsb);
};

PadsSection.prototype.handles = function(status, data1, data2) {
    return isInArray(getCcList(CTRL.PADS), data1);
};

PadsSection.prototype.onMidi = function(status, data1, data2) {
    var pressed = data2 > 0x0;
    var clip = CTRL.PADS.indexOf(data1);
    var trackClipSlots = bitwig.trackbank.getChannel(bitwig.trackbankPage.selectedTrackIndex).getClipLauncherSlots();
    if(pressed){
        trackClipSlots.launch(clip);
        // trackClipSlots.select(clip);
    }
};

PadsSection.prototype.sendPadColor = function(index, hsb) {
    midiOut.sendMidi(0x90, CTRL.PADS[index], hsb['h']);
    midiOut.sendMidi(0x91, CTRL.PADS[index], hsb['s']);
    midiOut.sendMidi(0x92, CTRL.PADS[index], hsb['b']);
};