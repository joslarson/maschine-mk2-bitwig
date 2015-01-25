var Scene = function() {
    this.hasContent = false;
    this.isPlaying = false;
    this.isQueued = false;
    this.isSelected = false;

    this.clips = [];
}

Scene.prototype.setHasContent = function() {
    // if scene has a clip with content, it has content
    for (var i = 0; i < this.clips.length; i++) {
        if(this.clips[i].hasContent){
            this.hasContent = true;
            return;
        }
    }
    // no clips with content :(
    this.hasContent = false;
};

Scene.prototype.setIsQueued = function() {
    if(!this.hasContent){
        this.isQueued = false;
        return;
    }
    // if all clips with content are playing, scene is playing
    for (var i = 0; i < this.clips.length; i++) {
        var clip = this.clips[i];
        if(clip.hasContent && !clip.isQueued){
            this.isQueued = false;
            return;
        }
    }
    // all clips playing
    this.isQueued = true;
};

Scene.prototype.setIsPlaying = function() {
    if(!this.hasContent){
        this.isPlaying = false;
        return;
    }
    // if all clips with content are playing, scene is playing
    for (var i = 0; i < this.clips.length; i++) {
        var clip = this.clips[i];
        if(clip.hasContent && !clip.isPlaying){
            this.isPlaying = false;
            return;
        }
    }
    // all clips playing
    this.isPlaying = true;
};

Scene.prototype.getColor = function() {
    var hsb = {h: 0, s: 0, b:0};
    if(this.isQueued){
        hsb = {h: 14, s: 115, b: 127};
    } else if(this.isPlaying){
        hsb = {h: 47, s: 127, b: 127};
    } else if(this.hasContent){
        hsb = {h: 100, s: 0, b: this.isSelected ? 127 : CONFIG.DIM_VALUE};
    }
    return hsb;
};