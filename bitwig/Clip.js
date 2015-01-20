var Clip = function() {
    this.hasContent = false;
    this.isQueued = false;
    this.isPlaying = false;
    this.isRecordingQueued = false;
    this.isRecording = false;
    this.isSelected = false;

    this.color = {h: 0, s: 0, b: 0};
}