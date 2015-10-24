var Bitwig = function(){
    var that = this;

    this.application = host.createApplication();
    this.project = host.getProject();
    this.transport = host.createTransport();
    this.trackbank = this.project.getShownTopLevelTrackGroup().createMainTrackBank(CONFIG.GROUP_COUNT,0,CONFIG.PAD_COUNT, false);
    this.scenebank = host.createSceneBank(CONFIG.PAD_COUNT);
    
    this.totalTrackCount = 0;
    
    this.trackbankPage = {
        index: 0,
        pageTrackCount: 0,
        selectedTrackIndex: null,
        tracks: [],
        scenes: []
    };

    this.transportIsPlaying = false;
    this.tempo = 110;

    // initialize bitwig object

    this.transport.getTempo().addRawValueObserver(function(tempo){
        that.tempo = tempo;
        println(tempo);
    });

    this.trackbank.addChannelScrollPositionObserver(function(position){
        that.trackbankPage.index = position / CONFIG.GROUP_COUNT;
        that.setBankPageTrackCount();
        that.resetTrackExistsFlags();
    }, 0);

    this.trackbank.addChannelCountObserver(function(count){
        that.totalTrackCount = count;
        that.setBankPageTrackCount();
        that.resetTrackExistsFlags();
    });

    for (var i = 0; i < CONFIG.PAD_COUNT; i++) {
        this.trackbankPage.scenes[i] = new Scene();
    }
 
    for (var i = 0; i < CONFIG.GROUP_COUNT; i++) {
        // init track list
        if(that.trackbankPage.tracks[i] === undefined){
            that.trackbankPage.tracks[i] = new Track();
        }

        (function(){ // enclosure
            const trackIndex = i;
            var track = that.trackbankPage.tracks[trackIndex];
            var trackClipSlots = that.trackbank.getChannel(trackIndex).getClipLauncherSlots();

            that.trackbank.getChannel(trackIndex).addTrackTypeObserver(25, 'Unassigned', function(type){
                track.type = type; // Unassigned, Instrument, Audio, or Hybrid
            });

            that.trackbank.getChannel(trackIndex).addIsGroupObserver(function(isGroup){
                track.isGroup = isGroup;
            });

            that.trackbank.getChannel(trackIndex).addIsSelectedInMixerObserver(
                function(isSelected){
                    // if no track is selected, set selectedTrackIndex to null
                    if(isSelected){
                        that.trackbankPage.tracks[trackIndex].isSelected = true;
                        that.trackbankPage.selectedTrackIndex = trackIndex;
                    } else {
                        var page = that.trackbankPage;
                        if(trackIndex == page.selectedTrackIndex) page.selectedTrackIndex = null;
                        track.isSelected = false;
                    }
                }
            );

            that.trackbank.getChannel(trackIndex).addColorObserver(function(r, g, b){
                var hsb = rgb2hsb(r, g, b);
                that.trackbankPage.tracks[trackIndex].hsb = hsb;
            });

            trackClipSlots.addHasContentObserver(function(index, hasContent){
                var scene = that.trackbankPage.scenes[index];
                // println(trackIndex + ':' + index + ' ' + hasContent);
                // adds clips to tracks and scenes upon init
                if(track.clips[index] == undefined) track.clips[index] = new Clip();
                if(scene.clips[trackIndex] == undefined) scene.clips[trackIndex] = track.clips[index];

                track.clips[index].hasContent = hasContent;
                that.trackbankPage.scenes[index].setHasContent();
            });

            trackClipSlots.addIsQueuedObserver(function(index, isQueued){
                var scene = that.trackbankPage.scenes[index];

                if(isQueued){
                    track.queuedClipIndex = index;
                    track.clips[index].isQueued = true;
                    that.trackbankPage.scenes[index].setIsQueued();
                } else {
                    if(track.queuedClipIndex == index) track.queuedClipIndex = null;
                    track.clips[index].isQueued = false;
                    that.trackbankPage.scenes[index].isQueued = false;
                }

            });

            trackClipSlots.addIsPlayingObserver(function(index, isPlaying){

                if(isPlaying){
                    track.playingClipIndex = index;
                    track.clips[index].isPlaying = true;
                } else {
                    if(track.playingClipIndex == index) track.playingClipIndex = null;
                    track.clips[index].isPlaying = false;
                }

                var scene = that.trackbankPage.scenes[index];
                that.trackbankPage.scenes[index].setIsPlaying();
            });

            trackClipSlots.addIsRecordingObserver(function(index, isRecording){
                if(isRecording){
                    track.recordingClipIndex = index;
                    track.clips[index].isRecording = true;
                } else {
                    if(track.recordingClipIndex == index) track.recordingClipIndex = null;
                    track.clips[index].isRecording = false;
                }
            });

            trackClipSlots.addIsRecordingQueuedObserver(function(index, isRecordingQueued){
                if(isRecordingQueued){
                    track.recordingQueuedClipIndex = index;
                    track.clips[index].isRecordingQueued = true;
                } else {
                    if(track.recordingQueuedClipIndex == index) track.recordingQueuedClipIndex = null;
                    track.clips[index].isRecordingQueued = false;
                }
            });

            trackClipSlots.addIsSelectedObserver(function(index, isSelected){
                if(isSelected){
                    track.selectedClipIndex = index;
                    track.clips[index].isSelected = true;
                } else {
                    if(track.selectedClipIndex == index) track.selectedClipIndex = null;
                    track.clips[index].isSelected = false;
                }
            });

            trackClipSlots.addColorObserver(function(index, r, g, b){
                var hsb = rgb2hsb(r,g,b);
                // set clip color
                track.clips[index].hsb = hsb;
            });
        })();
    }
}

Bitwig.prototype.trackIndexExistsOnPage = function(index) {
    var pageTrackCount = this.trackbankPage.pageTrackCount;
    return pageTrackCount > 0 && index <= (pageTrackCount - 1);
}

Bitwig.prototype.setBankPageTrackCount = function() {
    this.trackbankPage.pageTrackCount = this.totalTrackCount < ((this.trackbankPage.index + 1) * CONFIG.GROUP_COUNT) ? this.totalTrackCount % CONFIG.GROUP_COUNT : CONFIG.GROUP_COUNT;
};

Bitwig.prototype.resetTrackExistsFlags = function() {
    for (var i = 0; i < CONFIG.GROUP_COUNT; i++) {
        this.trackbankPage.tracks[i].exists = this.trackIndexExistsOnPage(i);
    };
}