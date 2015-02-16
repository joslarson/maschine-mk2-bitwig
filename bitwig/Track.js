var Track = function() {
    this.type = 'unassigned';
    this.exists = false;
    this.isActive = true;
    this.isSelected = false;

    this.hsb = {h: 0, s: 0, b: 0};
    
    this.clips = [];
    this.playingClipIndex = null;
    this.queuedClipIndex = null;
    this.recordingClipIndex = null;
    this.recordingQueuedClipIndex = null;
    this.selectedClipIndex = null;
};

Track.prototype.getColor = function() {
    var hsb = this.hsb;

    if(this.isSelected){
        hsb = {h: hsb.h, s: hsb.s, b: 127};
    } else if(this.exists){
        hsb = {h: hsb.h, s: hsb.s, b: CONFIG.DIM_VALUE};
    } else {
        hsb = {h: hsb.h, s: hsb.s, b: 0};
    }
    // println('(' + hsb.h + ', ' + hsb.s + ', ' + hsb.b + ')');
    return hsb;
};