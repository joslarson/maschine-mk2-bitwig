maschine-mk2-bitwig
====================

Custom Bitwig controller script for Native Instruments Maschine MK2.

SHIFT = `[ENTER]`

## NAV
UP/DOWN    : `[JOG WHEEL CW]`/`[JOG WHEEL CCW]`
LEFT/RIGHT : `[ < ]`/`[ > ]` (under `[JOG WHEEL]`)


## PAD MODES
CLIP TRIGGER  : `[PATTERN]`
SCENE TRIGGER : `[SCENE]`
NOTES MODE    : `[PAD MODE]`
SHIFT MODE    : `[SHIFT]`+`[MISC]`

## PAGES
* VOL + ARM
* PAN + ARM


Groups select tracks reatively

Pattern mode is current tracks next 16 relative clips

- Step Mode
- Mute/Solo tracks using mute/solo buttons
- launch

S/M/R

## GLOBAL CONTROLS (Some Exceptions)
- ENTER           : Shift Modifier
- GROUPS          : Relative track
    - dimmed track color
    - full brightness on selected
    - desaturate on tracks midi note on events
- DUPLICATE+GROUP : DUPLICATE Track
- SELECT+GROUP    : SELECT Track
- MUTE+GROUP      : MUTE Track
- SOLO+GROUP      : SOLO Track
- ERASE+GROUP     : DELETE Track

## DEFAULT MODE
- PADS            : Send midi notes to current track
    - desaturate on tracks cooresponding midi note on events
- NAVIGATE+GROUPS : PAD groups (set's of 16 midi notes)


### SCENE MODE
- PADS            : Relative Scene Trigger
- NAVIGATE+PAD    : Select Scene page
- DUPLICATE+PAD   : DUPLICATE Scene
- SELECT+PAD      : SELECT Scene
- ERASE+PAD       : DELETE Scene


### PATTERN MODE
- PADS          : Relative Clip Selection for Track 
    - dimmed clip color
    - full brightness when set to play
    - pulsing on record
- NAVIGATE+PAD  : Select Clip page
- DUPLICATE+PAD : DUPLICATE Clip
- SELECT+PAD    : SELECT Clip
- SOLO+PAD      : SOLO Clip
- MUTE+PAD      : MUTE Clip
- ERASE+PAD     : DELETE Clip


## STEP MODE 
- GROUPS        : Relative step page
- SHIFT+GROUPS  : Select step page group
- PADS          : Step sequencer, colors fade based on velocity
- SELECT+PADS   : Choose drum pad to step sequence
- SELECT+GROUPS : Choose relative track (+SHIFT : track page)


## KNOB(CC14-CC45) & BUTTON(CC46-CC77) PAGES
- VOL   (CC14-CC21) / ARM TRACK (CC46-CC53)
- PAN   (CC22-CC29) / ARM TRACK (CC46-CC53)
- MACROS(CC30-CC37) / DEVICE < >(CC54,CC57) / PARAM BANK < >(CC58,CC61)
- PARAMS(CC38-CC45) / DEVICE < >(CC54,CC57) / PARAM BANK < >(CC58,CC61)