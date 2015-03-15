var PadsSection = function(){
    // setup mode constants
    this.SCENE_MODE = 0;
    this.PATTERN_MODE = 1;
    this.PAD_MODE = 2;
    this.SHIFT_MODE = 3;

    this.mode;
    this.prevMode;

    this.setMode(this.PATTERN_MODE);

    // Init modes, setup observers, etc
    this.initSceneMode();
    this.initPatternMode();
    this.initPadMode();
    this.initShiftMode();

};

PadsSection.prototype.setMode = function(mode) {
    if(mode == this.SCENE_MODE){
        this.setSceneMode();
    } else if(mode == this.PATTERN_MODE){
        this.setPatternMode();
    } else if(mode == this.PAD_MODE){
        this.setPadMode();
    } else if(mode == this.SHIFT_MODE){
        this.setShiftMode();
    }
};

PadsSection.prototype.handles = function(status, data1, data2) {
    return isInArray(getCcList(CTRL.PADS), data1);
};

PadsSection.prototype.onMidi = function(status, data1, data2) {
    var pressed = data2 > 0x0;

    if(this.mode == this.SCENE_MODE){
        this.sceneModeOnMidi(status, data1, data2, pressed);
    } else if(this.mode == this.PATTERN_MODE){
        this.patternModeOnMidi(status, data1, data2, pressed);
    } else if(this.mode == this.PAD_MODE){
        this.padModeOnMidi(status, data1, data2, pressed);
    } else if(this.mode == this.SHIFT_MODE){
        this.shiftModeOnMidi(status, data1, data2, pressed);
    }
};




//////////////////
// SCENE MODE


PadsSection.prototype.initSceneMode = function() {
    var that = this;

    for (var i = 0; i < CONFIG.GROUP_COUNT; i++) {
        (function(){
            const trackIndex = i;
            var track = bitwig.trackbank.getChannel(trackIndex);
            var trackClipSlots = track.getClipLauncherSlots();
            
            trackClipSlots.addHasContentObserver(function(index, hasContent){
                if(!that.isSceneMode()) return;
                var scene = bitwig.trackbankPage.scenes[index];

                that.sendPadColor(index, scene.getColor());
            });
 
            trackClipSlots.addIsQueuedObserver(function(index, isQueued){
                if(!that.isSceneMode()) return;
                var scene = bitwig.trackbankPage.scenes[index];
                that.sendPadColor(index, scene.getColor());
            });

            trackClipSlots.addIsPlayingObserver(function(index, isPlaying){
                if(!that.isSceneMode()) return;
                var scene = bitwig.trackbankPage.scenes[index];
                that.sendPadColor(index, scene.getColor());
            });

            trackClipSlots.addIsRecordingQueuedObserver(function(index, isRecordingQueued){
                if(!that.isSceneMode()) return;
                var scene = bitwig.trackbankPage.scenes[index];
                that.sendPadColor(index, scene.getColor());
            });

            trackClipSlots.addIsRecordingObserver(function(index, isRecording){
                if(!that.isSceneMode()) return;
                var scene = bitwig.trackbankPage.scenes[index];
                that.sendPadColor(index, scene.getColor());
            });
        })();
    }
};

PadsSection.prototype.setSceneMode = function() {
    padNotes.setKeyTranslationTable(padMIDITable.OFF);

    this.prevMode = this.mode;
    this.mode = this.SCENE_MODE;
    
    midiOut.sendMidi(0xbf, CTRL.MIDDLE.SCENE, 127);

    var scenes = bitwig.trackbankPage.scenes;
    for (var i = 0; i < CONFIG.PAD_COUNT; i++) {
        this.sendPadColor(i, scenes[i].getColor());
    }
};

PadsSection.prototype.sceneModeOnMidi = function(status, data1, data2, pressed) {
    var sceneIndex = CTRL.PADS.indexOf(data1);
    var scene = bitwig.scenebank.getScene(sceneIndex);
    if(pressed) scene.launch();
};




//////////////////
// PATTERN MODE


PadsSection.prototype.initPatternMode = function() {
    var that = this;

    // setup clipSlot observers for all 8 trackbank slots
    for (var i = 0; i < CONFIG.GROUP_COUNT; i++) {
        (function(){
            const trackIndex = i;
            var track = bitwig.trackbankPage.tracks[trackIndex];
            var trackClipSlots = bitwig.trackbank.getChannel(trackIndex).getClipLauncherSlots();
            
            trackClipSlots.addColorObserver(function(index, r, g, b){
                if(!that.isPatternMode()) return;

                var clip = track.clips[index];
                
                if(trackIndex == bitwig.trackbankPage.selectedTrackIndex){
                    that.sendPadColor(index, clip.getColor());
                }
            });

            bitwig.trackbank.getChannel(trackIndex).addIsSelectedInMixerObserver(function(isSelected){
                if(!that.isPatternMode()) return;

                for (var i = 0; i < CONFIG.PAD_COUNT; i++) {
                    if(isSelected){
                        for (var i = 0; i < track.clips.length; i++) {
                            var clip = track.clips[i];
                            that.sendPadColor(i, clip.getColor());
                        };
                    } else if(!isSelected && bitwig.trackbankPage.selectedTrackIndex == null){
                        // blank pads if nothing is selected
                        that.sendPadColor(i, {h:0,s:0,b:0});
                    }
                }
            });
 
            trackClipSlots.addIsQueuedObserver(function(index, isQueued){
                if(!that.isPatternMode()) return;

                if(trackIndex == bitwig.trackbankPage.selectedTrackIndex){
                    var clip = track.clips[index];
                    that.sendPadColor(index, clip.getColor());
                }
            });

            trackClipSlots.addIsPlayingObserver(function(index, isPlaying){
                if(!that.isPatternMode()) return;

                if(trackIndex == bitwig.trackbankPage.selectedTrackIndex){
                    var clip = track.clips[index];
                    that.sendPadColor(index, clip.getColor());
                }
            });

            trackClipSlots.addIsRecordingQueuedObserver(function(index, isRecordingQueued){
                if(!that.isPatternMode()) return;

                if(isRecordingQueued && trackIndex == bitwig.trackbankPage.selectedTrackIndex){
                    var clip = track.clips[index];
                    // that.sendPadColor(index, clip.getColor());
                    that.pulsePad(clip, index);
                }
            });

            trackClipSlots.addIsRecordingObserver(function(index, isRecording){
                if(!that.isPatternMode()) return;

                if(trackIndex == bitwig.trackbankPage.selectedTrackIndex){
                    var clip = track.clips[index];
                    that.sendPadColor(index, clip.getColor());
                }
            });
        })();
    }
};

PadsSection.prototype.setPatternMode = function() {
    padNotes.setKeyTranslationTable(padMIDITable.OFF);

    this.prevMode = this.mode;
    this.mode = this.PATTERN_MODE;

    midiOut.sendMidi(0xbf, CTRL.MIDDLE.PATTERN, 127);
    
    var trackIndex = bitwig.trackbankPage.selectedTrackIndex;
    if(trackIndex != null){
        var clips = bitwig.trackbankPage.tracks[trackIndex].clips;
        for (var i = 0; i < CONFIG.PAD_COUNT; i++) {
            this.sendPadColor(i, clips[i].getColor());
        }
    } else {
        for (var i = 0; i < CONFIG.PAD_COUNT; i++) {
            this.sendPadColor(i, {h:0, s:0, b:0});
        }
    }
};

PadsSection.prototype.patternModeOnMidi = function(status, data1, data2, pressed) {
    var selectedTrackIndex = bitwig.trackbankPage.selectedTrackIndex;
    var trackClipSlots = bitwig.trackbank.getChannel(selectedTrackIndex).getClipLauncherSlots();
    var track = bitwig.trackbankPage.tracks[selectedTrackIndex];
    var clipIndex = CTRL.PADS.indexOf(data1);
    var clip = track.clips[clipIndex];

    if(pressed){
        trackClipSlots.select(clipIndex);
        
        if(MOD.DUPLICATE){
            if(!CLIPBOARD){
                bitwig.application.copy();
                CLIPBOARD = 'clip';
            } else {
                bitwig.application.paste();
                CLIPBOARD = null;
            }
        } else if(MOD.SELECT){
            if(clip.isPlaying){
                trackClipSlots.stop();
            } else{
                var transportIsPlaying = bitwig.transportIsPlaying;
                trackClipSlots.launch(clipIndex);
                if(!transportIsPlaying) bitwig.transport.stop();
            }
        }  else if(MOD.ERASE){
            bitwig.application.remove();
        } else {
            trackClipSlots.launch(clipIndex);
        }
    }
};




//////////////////
// PAD MODE


PadsSection.prototype.initPadMode = function() {
    var that = this;

    for (var i = 0; i < CONFIG.GROUP_COUNT; i++) {
        (function(){
            const trackIndex = i;
            var track = bitwig.trackbankPage.tracks[trackIndex];

            bitwig.trackbank.getChannel(trackIndex).addIsSelectedInMixerObserver(function(isSelected){
                if(!that.isPadMode()) return;

                var color = track.getColor();
                color.b = CONFIG.DIM_VALUE;

                if(isSelected){
                    for (var ii = 0; ii < CONFIG.PAD_COUNT; ii++) {
                        that.sendPadColor(ii, color);
                    }
                } else if(!isSelected && bitwig.trackbankPage.selectedTrackIndex === null){
                    // blank pads if nothing is selected
                    for (var ii = 0; ii < CONFIG.PAD_COUNT; ii++) {
                        that.sendPadColor(ii, {h:0, s:0, b:0});
                    }
                }
            });

            bitwig.trackbank.getChannel(trackIndex).addNoteObserver(function(isNoteOn, note, velocity){
                if(!that.isPadMode()) return;
                var padIndex = CTRL.PADS.indexOf(note);
                
                if(padIndex == -1 || trackIndex != bitwig.trackbankPage.selectedTrackIndex) return;

                if(isNoteOn){
                    var color = track.getColor();
                    color.b = 127;
                    that.sendPadColor(padIndex, color);
                    host.scheduleTask(function(){
                        if(trackIndex == bitwig.trackbankPage.selectedTrackIndex && that.mode == that.PAD_MODE){
                            color.b = CONFIG.DIM_VALUE;
                            that.sendPadColor(padIndex, color);
                        }
                    }, null, 40);
                }
            });
        })();
    }
};

PadsSection.prototype.setPadMode = function() {
    padNotes.setKeyTranslationTable(padMIDITable.ON);

    this.prevMode = this.mode;
    this.mode = this.PAD_MODE;

    midiOut.sendMidi(0xbf, CTRL.MIDDLE.PAD_MODE, 127);

    var trackIndex = bitwig.trackbankPage.selectedTrackIndex;

    if(trackIndex !== null){
        var track = bitwig.trackbankPage.tracks[trackIndex];
        var color = track.getColor();
        color.b = CONFIG.DIM_VALUE;
        for (var i = 0; i < CONFIG.PAD_COUNT; i++) {
            this.sendPadColor(i, color);
        }
    } else {
        for (var i = 0; i < CONFIG.PAD_COUNT; i++) {
            this.sendPadColor(i, {h:0, s:0, b:0});
        }
    }

};

PadsSection.prototype.padModeOnMidi = function(status, data1, data2, pressed) {
    // var track = bitwig.trackbankPage.tracks[bitwig.trackbankPage.selectedTrackIndex];
    // var padIndex = CTRL.PADS.indexOf(data1);
    // var color = track.getColor();

    // if(pressed){
    //     color.b = 127;
    //     this.sendPadColor(padIndex, color);
    // } else {
    //     color.b = CONFIG.DIM_VALUE;
    //     this.sendPadColor(padIndex, color);
    // }
};




//////////////////
// SHIFT MODE


PadsSection.prototype.initShiftMode = function() {
    var that = this;
};

PadsSection.prototype.setShiftMode = function() {
    padNotes.setKeyTranslationTable(padMIDITable.OFF);

    this.prevMode = this.mode;
    this.mode = this.SHIFT_MODE;
};

PadsSection.prototype.shiftModeOnMidi = function(status, data1, data2, pressed) {
    if(!pressed) return;
    var padIndex = CTRL.PADS.indexOf(data1);

    if(padIndex == 0){ // UNDO
        bitwig.application.undo();
    } else if(padIndex == 1){ // REDO
        bitwig.application.redo();
    } else if(padIndex == 2){ // STEP UNDO

    } else if(padIndex == 3){ // STEP REDO

    } else if(padIndex == 4){ // QUANTIZE

    } else if(padIndex == 5){ // QUANT 50%

    } else if(padIndex == 6){ // NUDGE <

    } else if(padIndex == 7){ // NUDGE >

    } else if(padIndex == 8){ // CLEAR

    } else if(padIndex == 9){ // CLR AUTO

    } else if(padIndex == 10){ // COPY
        bitwig.application.copy();
    } else if(padIndex == 11){ // PASTE
        bitwig.application.paste();
    } else if(padIndex == 12){ // SEMITONE -

    } else if(padIndex == 13){ // SEMITONE +

    } else if(padIndex == 14){ // OCTAVE -

    } else if(padIndex == 15){ // OCTAVE +

    }
};




////////////////////
// HELPER FUNCTIONS

PadsSection.prototype.sendPadColor = function(index, hsb) {
    midiOut.sendMidi(0x90, CTRL.PADS[index], hsb.h);
    midiOut.sendMidi(0x91, CTRL.PADS[index], hsb.s);
    midiOut.sendMidi(0x92, CTRL.PADS[index], hsb.b);
};

PadsSection.prototype.isSceneMode = function(mode) {
    return this.mode == this.SCENE_MODE;
};

PadsSection.prototype.isPatternMode = function(mode) {
    return this.mode == this.PATTERN_MODE;
};

PadsSection.prototype.isPadMode = function(mode) {
    return this.mode == this.PAD_MODE;
};

PadsSection.prototype.isShiftMode = function(mode) {
    return this.mode == this.PATTERN_MODE;
};

PadsSection.prototype.pulsePad = function(clip, padIndex) {
    var that = this;
    clip.pulseValue = true;

    function pulse(){
        var color = clip.getColor();
        if(clip.isRecordingQueued || clip.isRecording){
            host.scheduleTask(pulse, null, 150);
            if(clip.pulseValue){
                color.b = 127;
                that.sendPadColor(padIndex, color);
                clip.pulseValue = false;
            } else {
                color.b = 0;
                that.sendPadColor(padIndex, color);
                clip.pulseValue = true;
            }
        }
    }

    pulse();
};