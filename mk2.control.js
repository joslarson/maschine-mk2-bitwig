load('polyfills.js');

loadAPI(1);

/* Script Initilization */

var bitwig, midiOut, padNotes, padMIDITable;

var sections = [];

load('config.js');
load('common.js');
load('bitwig/_loader.js');
load('sections/_loader.js');
load('views/_loader.js');


host.defineController("Native Instruments", "Maschine MK2 Custom", "1.0", "9CC361A0-8D39-11E4-B4A9-0800200C9A66");
// Setup and Discover Midi Device
host.defineMidiPorts(1,1);
host.addDeviceNameBasedDiscoveryPair(['Maschine MK2 In'], ['Maschine MK2 Out']);
host.addDeviceNameBasedDiscoveryPair(['Maschine MK2 Virtual Input'], ['Maschine MK2 Virtual Output']);

function onMidi(status, data1, data2) {
    // println(status + ', ' + data1 + ', ' + data2 + ': ' + isNote(status));
    if(isCc(status)){
        if(sections.transport.handles(status, data1, data2)){
            sections.transport.onMidi(status, data1, data2);
        } else if(sections.groups.handles(status, data1, data2)){
            sections.groups.onMidi(status, data1, data2);
        } else if(sections.screens.handles(status, data1, data2)){
            sections.screens.onMidi(status, data1, data2);
        } else if(sections.master.handles(status, data1, data2)){
            sections.master.onMidi(status, data1, data2);
        } else if(sections.middle.handles(status, data1, data2)){
            sections.middle.onMidi(status, data1, data2);
        }
    } else if(isNote(status)){
        if(sections.pads.handles(status, data1, data2)){
            sections.pads.onMidi(status, data1, data2);
        }
    }
}

function init() {
    bitwig = new Bitwig();
    midiOut = host.getMidiOutPort(0);

    blankController();

    padNotes = host.getMidiInPort(0).createNoteInput("Maschine Pads", "89????", "99????", "B940??", "D9????", "E9????");
    padNotes.setShouldConsumeEvents(false);
    padMIDITable = {
        ON: initCountingArray(0,128),
        OFF: initArray(-1,128)
    };
    host.getMidiInPort(0).setMidiCallback(onMidi);

    sections.transport = new TransportSection();
    sections.groups = new GroupsSection();
    sections.screens = new ScreensSection();
    sections.master = new MasterSection();
    sections.pads = new PadsSection();
    sections.middle = new MiddleSection();

    println("Maschine MK2 script");
}

function exit() {
    blankController();
}

function blankController(){
    var basicCtrls = getCcList(CTRL);
    
    var panKnobs = basicCtrls.splice(
        basicCtrls.indexOf(CTRL.SCREENS.PAN[0]), 
        CTRL.SCREENS.PAN.length
    );
    
    for (var i = 0; i < basicCtrls.length; i++) {
        midiOut.sendMidi(0xbf, basicCtrls[i], 0);
    }
    
    for (var i = 0; i < CTRL.PADS.length; i++) {
        midiOut.sendMidi(0x92, CTRL.PADS[i], 0);
        midiOut.sendMidi(0x91, CTRL.PADS[i], 0);
        midiOut.sendMidi(0x90, CTRL.PADS[i], 0);
    }

    for (var i = 0; i < CTRL.GROUPS.length; i++) {
        midiOut.sendMidi(0xb2, CTRL.GROUPS[i], 0);
        midiOut.sendMidi(0xb1, CTRL.GROUPS[i], 0);
        midiOut.sendMidi(0xb0, CTRL.GROUPS[i], 0);
    }

    for (var i = 0; i < panKnobs.length; i++) {
        midiOut.sendMidi(0xbf, panKnobs[i], 63);
    }
}