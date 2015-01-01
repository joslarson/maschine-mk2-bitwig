load('polyfills.js');

loadAPI(1);

/* Script Initilization */

var transport, application, trackCount;
var sections = [];

load('config.js');
load('common.js');
load('sections/loader.js');
load('views/loader.js');

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
        }
    } else if(isNote(status)){
        if(sections.pads.handles(status, data1, data2)){
            sections.pads.onMidi(status, data1, data2);
        }
    }
}

function init() {
    transport = host.createTransportSection();
    application = host.createApplicationSection();
    trackbank = host.createMainTrackBank(8,0,16);

    midiOut = host.getMidiOutPort(0);

    host.getMidiInPort(0).createNoteInput("Maschine Pad Mode", "80????", "90????", "B040??", "D0????", "E0????");
    host.getMidiInPort(0).setMidiCallback(onMidi);

    sections.transport = new TransportSection();
    sections.groups = new GroupsSection();
    sections.screens = new ScreensSection();
    sections.pads = new PadsSection();
    // sections.transport.init();
    // sections.groups.init();

    println("Maschine MK2 script");
}

function exit() {
    // TODO: Reset controller
}