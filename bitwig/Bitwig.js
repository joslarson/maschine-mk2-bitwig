var Bitwig = function(){
    var that = this;

    this.application = host.createApplicationSection();
    this.transport = host.createTransportSection();
    this.trackbank = host.createMainTrackBank(CONFIG.GROUP_COUNT,0,CONFIG.PAD_COUNT);
    
    this.totalTrackCount = 0;
    
    this.trackbankPage = {
        index: 0,
        pageTrackCount: 0,
        selectedTrackIndex: null,
        tracks: [],
    };

    // initialize bitwig object

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

    for (var i = 0; i < CONFIG.GROUP_COUNT; i++) {
        // init track list
        that.trackbankPage.tracks[i] = new Track();

        (function(){ // enclosure
            const trackIndex = i;
            var track = that.trackbankPage.tracks[trackIndex];
            var trackClipSlots = that.trackbank.getChannel(trackIndex).getClipLauncherSlots();

            that.trackbank.getChannel(trackIndex).addIsSelectedInMixerObserver(
                function(isSelected){
                    // if no track is selected, set selectedTrackIndex to null
                    if(trackIndex == that.trackbankPage.selectedTrackIndex && !isSelected) {
                        that.trackbankPage.selectedTrackIndex = null;
                    }
                    if(isSelected){
                        that.trackbankPage.tracks[trackIndex].isSelected = true;
                        that.trackbankPage.selectedTrackIndex = trackIndex;
                    } else {
                        that.trackbankPage.tracks[trackIndex].isSelected = false;
                    }
                }
            );

            that.trackbank.getChannel(trackIndex).addColorObserver(function(r, g, b){
                var hsb = rgb2hsb(r, g, b);
                that.trackbankPage.tracks[trackIndex].color = hsb;
            });

            trackClipSlots.addHasContentObserver(function(index, hasContent){
                if(track.clips[index] == null) track.clips[index] = new Clip();
                track.clips[index].hasContent = hasContent;
            });

            trackClipSlots.addColorObserver(function(index, r, g, b){
                if(index < CONFIG.PAD_COUNT){
                    var hsb = rgb2hsb(r,g,b);
                    // set clip color
                    track.clips[index].color = hsb;
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