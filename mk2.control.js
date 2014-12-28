loadAPI(1);

/* Script Initilization */

load("config.js");

host.defineController("Native Instruments", "Maschine MK2 Custom", "1.0", "9CC361A0-8D39-11E4-B4A9-0800200C9A66");

// Discover Midi Device
if (host.platformIsWindows()) {
    host.addDeviceNameBasedDiscoveryPair(['Maschine MK2 Controller'], ['Maschine MK2 Controller']);
} else if (host.platformIsMac())  {
    host.addDeviceNameBasedDiscoveryPair(['Maschine MK2 Virtual Input'], ['Maschine MK2 Virtual Output']);
} else { // Linux
    host.addDeviceNameBasedDiscoveryPair(['Maschine MK2 In'], ['Maschine MK2 Out']);
}

function onMidi(status, data1, data2) {
    // pressed = data2 > 0;

    // /* transport */
    // if (status ==  0xb0) {
    //     if (data1 == 115 && pressed == true) {
    //         transport.rewind();
    //     }
    //     if (data1 == 116 && pressed == true) {
    //         transport.fastForward();
    //     }
    //     if (data1 == 117 && pressed == true) {
    //         transport.stop();
    //     }
    //     if (data1 == 118 && pressed == true) {
    //         if(shifted){
    //             transport.toggleClick();
    //         } else {
    //             transport.play();
    //         }
    //     }
    //     if (data1 == 119 && pressed == true) {
    //         if(shifted){
    //             transport.toggleLauncherOverdub();
    //         } else {
    //             transport.record();
    //         }
    //     }
    // }    
}

function init() {
    host.getMidiInPort(0).createNoteInput("Maschine Pad Mode", "80????", "90????", "B040??", "D0????", "E0????");
    host.getMidiInPort(0).setMidiCallback(onMidi);
    
    // transport = host.createTransportSection();
    // application = host.createApplicationSection();
    // trackBank = host.createMainTrackBankSection(8, 2, 16);
    // sceneLaunchTrackBank = host.createTrackBank(4,0,64);

    // cursorTrack = host.createCursorTrack(2, 0);
    // cursorDevice = host.createCursorDevice();    
    
    println("Maschine MK2 script");
}

function exit() {
    // TODO: Reset controller
}