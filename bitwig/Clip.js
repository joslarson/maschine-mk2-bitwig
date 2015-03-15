var Clip = function() {
    this.hasContent = false;
    this.isQueued = false;
    this.isPlaying = false;
    this.isRecordingQueued = false;
    this.isRecording = false;
    this.isSelected = false;

    this.hsb = {h: 0, s: 0, b: 0};
};

Clip.prototype.getColor = function() {
    var hsb = this.hsb;
    var track = bitwig.trackbankPage.tracks[bitwig.trackbankPage.selectedTrackIndex];
    if(this.isQueued || this.isPlaying || this.isRecordingQueued || this.isRecording){
        hsb = {h: hsb.h ? hsb.h : track.hsb.h, s: hsb.s ? hsb.s : track.hsb.s, b: 127};
    } else if(this.hasContent){
        hsb = {h: hsb.h, s: hsb.s, b: CONFIG.DIM_VALUE};
    } else {
        hsb = {h: hsb.h, s: hsb.s, b: 0};
    }
    return hsb;
};