const CTRL = {
    TOPLEFT: {
        CONTROL: 85,
        STEP: 86,
        BROWSE: 87,
        SAMPLING: 88,
        ALL: 89,
        AUTO_WRITE: 90,
    },

    SCREENS: {
        // Buttons
        ARM: [46, 47, 48, 49, 50, 51, 52, 53],
        PREV_DEVICE: 54,
        NEXT_DEVICE: 57,
        PREV_PARAM_BANK: 58,
        NEXT_PARAM_BANK: 61,

        // Knobs
        VOL: [14, 15, 16, 17, 18, 19, 20, 21],
        PAN: [22, 23, 24, 25, 26, 27, 28, 29],
        MACRO: [30, 31, 32, 33, 34, 35, 36, 37],
        PARAM: [38, 39, 40, 41, 42, 43, 44, 45],
    },

    MASTER: {
        // Buttons
        VOLUME: 7,
        SWING: 9,
        TEMPO: 3,
        NOTE_REPEAT: 111,
        KNOB_PUSH: 102,
        LEFT: 98,
        RIGHT: 99,
        ENTER: 100,

        // Knobs
        KNOB: 101,
    },

    GROUPS: [80, 81, 82, 83, 91, 92, 93, 94],

    TRANSPORT: {
        RESTART: 104,
        LEFT: 105,
        RIGHT: 106,
        GRID: 107,
        PLAY: 108,
        REC: 109,
        ERASE: 110,
    },

    MIDDLE: {
        SCENE: 112,
        PATTERN: 113,
        PAD_MODE: 114,
        NAVIGATE: 115,
        DUPLICATE: 116,
        SELECT: 117,
        SOLO: 118,
        MUTE: 119,
    },

    PADS: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
};

const CONFIG = {
    DIM_VALUE: 20,
    EXTRA_DIM_VALUE: 10,
    GROUP_COUNT: 8,
    PAD_COUNT: 16,
};

var MOD = {
    SHIFT: false,
    NAVIGATE: false, 
    DUPLICATE: false, 
    SELECT: false, 
    SOLO: false, 
    MUTE: false,
    ERASE: false
};

var CLIPBOARD = null;