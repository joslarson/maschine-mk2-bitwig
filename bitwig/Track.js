var Track = function() {
    this.exists = false;
    this.isActive = true;
    this.isSelected = false;

    this.color = {h: 0, s: 0, b: 0};
    
    this.clips = [];
    this.playingClipIndex = null;
    this.queuedClipIndex = null;
    this.recordingClipIndex = null;
    this.recordingQueuedClipIndex = null;
}