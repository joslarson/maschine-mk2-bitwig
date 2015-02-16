var MiddleSection = function(){
};

MiddleSection.prototype.handles = function(status, data1, data2) {
    return isInArray(getCcList(CTRL.MIDDLE), data1);
};

MiddleSection.prototype.onMidi = function(status, data1, data2) {
    var pressed = data2 >= 0x3F;

    if(data1 == CTRL.MIDDLE.SCENE) {
        if(MOD.SHIFT){
            bitwig.project.createSceneFromPlayingLauncherClips();
        } else {
            sections.pads.setSceneMode();
            midiOut.sendMidi(0xbf, CTRL.MIDDLE.PATTERN, 0);
            midiOut.sendMidi(0xbf, CTRL.MIDDLE.PAD_MODE, 0);
        }
    } else if(data1 == CTRL.MIDDLE.PATTERN) {
        sections.pads.setPatternMode();
        midiOut.sendMidi(0xbf, CTRL.MIDDLE.SCENE, 0);
        midiOut.sendMidi(0xbf, CTRL.MIDDLE.PAD_MODE, 0);
    } else if(data1 == CTRL.MIDDLE.PAD_MODE) {
        sections.pads.setPadMode();
        midiOut.sendMidi(0xbf, CTRL.MIDDLE.SCENE, 0);
        midiOut.sendMidi(0xbf, CTRL.MIDDLE.PATTERN, 0);
    } else if(data1 == CTRL.MIDDLE.NAVIGATE) {
        pressed ? MOD.NAVIGATE = true : MOD.NAVIGATE = false;
    } else if(data1 == CTRL.MIDDLE.DUPLICATE) {
        if(pressed){
            MOD.DUPLICATE = true;
        } else {
            MOD.DUPLICATE = false;
            CLIPBOARD = null;
        }
    } else if(data1 == CTRL.MIDDLE.SELECT) {
        pressed ? MOD.SELECT = true : MOD.SELECT = false;
    } else if(data1 == CTRL.MIDDLE.SOLO) {
        pressed ? MOD.SOLO = true : MOD.SOLO = false;
    } else if(data1 == CTRL.MIDDLE.MUTE) {
        pressed ? MOD.MUTE = true : MOD.MUTE = false;
    }
};