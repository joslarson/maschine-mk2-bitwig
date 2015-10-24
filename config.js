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


const STUDIO_CTRL_MAP = {
    TOPLEFT: {
        CHANNEL:  {ch: 1, cc: 21},
        PLUGIN:   {ch: 1, cc: 22},
        ARRANGE:  {ch: 1, cc: 23},
        MIX:      {ch: 1, cc: 24},
        BROWSE:   {ch: 1, cc: 25},
        SAMPLING: {ch: 1, cc: 26},
        ALL:      {ch: 1, cc: 27},
        AUTO:     {ch: 1, cc: 28},
        FS1:      {ch: 1, cc: 29},
        FS2:      {ch: 1, cc: 30},
    },

    METERS: {
        IN1:  {ch: 2, cc: 21},
        IN2:  {ch: 2, cc: 22},
        IN3:  {ch: 2, cc: 23},
        IN4:  {ch: 2, cc: 24},
        MST:  {ch: 2, cc: 25},
        GRP:  {ch: 2, cc: 26},
        SND:  {ch: 2, cc: 27},
        CUE:  {ch: 2, cc: 28},
        KNOB: {ch: 2, cc: 29},
    },

    PERFORMACE: {
        TAP:         {ch: 3, cc: 21},
        STEP_MODE:   {ch: 3, cc: 22},
        MACRO:       {ch: 3, cc: 23},
        NOTE_REPEAT: {ch: 3, cc: 24},
    },

    GROUPS: [
        {ch: 4, cc: 102},
        {ch: 4, cc: 103},
        {ch: 4, cc: 104},
        {ch: 4, cc: 105},
        {ch: 4, cc: 106},
        {ch: 4, cc: 107},
        {ch: 4, cc: 108},
        {ch: 4, cc: 109},
    ],

    TRANSPORT: {
        RESTART: {ch: 5, cc: 21},
        METRO:   {ch: 5, cc: 22},
        EVENTS:  {ch: 5, cc: 23},
        GRID:    {ch: 5, cc: 24},
        PLAY:    {ch: 5, cc: 25},
        REC:     {ch: 5, cc: 26},
        ERASE:   {ch: 5, cc: 27},
    },

    MIDDLE: {
        SCENE:     {ch: 6, cc: 21},
        PATTERN:   {ch: 6, cc: 22},
        PAD_MODE:  {ch: 6, cc: 23},
        NAVIGATE:  {ch: 6, cc: 24},
        DUPLICATE: {ch: 6, cc: 25},
        SELECT:    {ch: 6, cc: 26},
        SOLO:      {ch: 6, cc: 27},
        MUTE:      {ch: 6, cc: 28},
    },

    PADS: [
        {ch: 6, note: 36},
        {ch: 6, note: 37},
        {ch: 6, note: 38},
        {ch: 6, note: 39},
        {ch: 6, note: 40},
        {ch: 6, note: 41},
        {ch: 6, note: 42},
        {ch: 6, note: 43},
        {ch: 6, note: 44},
        {ch: 6, note: 45},
        {ch: 6, note: 46},
        {ch: 6, note: 47},
        {ch: 6, note: 48},
        {ch: 6, note: 49},
        {ch: 6, note: 50},
        {ch: 6, note: 51},
    ],

    EDIT: {
        COPY:        {ch: 7, cc: 21},
        PASTE:       {ch: 7, cc: 22},
        NOTE:        {ch: 7, cc: 23},
        NUDGE:       {ch: 7, cc: 24},
        UNDO:        {ch: 7, cc: 25},
        REDO:        {ch: 7, cc: 26},
        QUANTIZE:    {ch: 7, cc: 27},
        CLEAR:       {ch: 7, cc: 28},
        JOG_DIAL:    {ch: 7, cc: 29},
        JOG_RING:    {ch: 7, cc: 30},
        BACK:        {ch: 7, cc: 102},
        LEFT_ARROW:  {ch: 7, cc: 103},
        RIGHT_ARROW: {ch: 7, cc: 104},
        ENTER:       {ch: 7, cc: 105},
    },

    SCREENS: {
        ARM: [
            {ch: 8, cc: 21},
            {ch: 8, cc: 22},
            {ch: 8, cc: 23},
            {ch: 8, cc: 24},
            {ch: 8, cc: 25},
            {ch: 8, cc: 26},
            {ch: 8, cc: 27},
            {ch: 8, cc: 28},
        ],

        PREV_DEVICE:     {ch: 10, cc: 21},
        CHILD_DEVICE:    {ch: 10, cc: 22},
        PARENT_DEVICE:   {ch: 10, cc: 23},
        NEXT_DEVICE:     {ch: 10, cc: 24},
        PREV_PARAM_BANK: {ch: 10, cc: 25},
        NEXT_PARAM_BANK: {ch: 10, cc: 28},

        VOL_TOUCH: [
            {ch: 8, cc: 102},
            {ch: 8, cc: 104},
            {ch: 8, cc: 106},
            {ch: 8, cc: 108},
            {ch: 8, cc: 110},
            {ch: 8, cc: 112},
            {ch: 8, cc: 114},
            {ch: 8, cc: 116},
        ],
        VOL: [
            {ch: 8, cc: 103},
            {ch: 8, cc: 105},
            {ch: 8, cc: 107},
            {ch: 8, cc: 109},
            {ch: 8, cc: 111},
            {ch: 8, cc: 113},
            {ch: 8, cc: 115},
            {ch: 8, cc: 117},
        ],

        PAN_TOUCH: [
            {ch: 9, cc: 102},
            {ch: 9, cc: 104},
            {ch: 9, cc: 106},
            {ch: 9, cc: 108},
            {ch: 9, cc: 110},
            {ch: 9, cc: 112},
            {ch: 9, cc: 114},
            {ch: 9, cc: 116},
        ],
        PAN: [
            {ch: 9, cc: 103},
            {ch: 9, cc: 105},
            {ch: 9, cc: 107},
            {ch: 9, cc: 109},
            {ch: 9, cc: 111},
            {ch: 9, cc: 113},
            {ch: 9, cc: 115},
            {ch: 9, cc: 117},
        ],

        MACRO_TOUCH: [
            {ch: 10, cc: 102},
            {ch: 10, cc: 104},
            {ch: 10, cc: 106},
            {ch: 10, cc: 108},
            {ch: 10, cc: 110},
            {ch: 10, cc: 112},
            {ch: 10, cc: 114},
            {ch: 10, cc: 116},
        ],
        MACRO: [
            {ch: 10, cc: 103},
            {ch: 10, cc: 105},
            {ch: 10, cc: 107},
            {ch: 10, cc: 109},
            {ch: 10, cc: 111},
            {ch: 10, cc: 113},
            {ch: 10, cc: 115},
            {ch: 10, cc: 117},
        ],

        PARAM_TOUCH: [
            {ch:11, cc: 102},
            {ch:11, cc: 104},
            {ch:11, cc: 106},
            {ch:11, cc: 108},
            {ch:11, cc: 110},
            {ch:11, cc: 112},
            {ch:11, cc: 114},
            {ch:11, cc: 116},
        ],
        PARAM: [
            {ch:11, cc: 103},
            {ch:11, cc: 105},
            {ch:11, cc: 107},
            {ch:11, cc: 109},
            {ch:11, cc: 111},
            {ch:11, cc: 113},
            {ch:11, cc: 115},
            {ch:11, cc: 117},
        ],
    },
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