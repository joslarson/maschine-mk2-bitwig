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

# GLOBAL CONTROLS (Some Exceptions)
- ENTER      : Shift Modifier
- MUTE+GROUP : MUTE Track
- SOLO+GROUP : SOLO Track

## CONTROL MODE
- GROUPS       : Relative track
    - dimmed track color
    - full brightness on selected
- SHIFT+GROUPS : Select track page / step page group

### SCENE MODE
- PADS : Relative Scene Trigger

### PATTERN MODE
- PADS       : Relative Clip Selection for Track 
    - dimmed clip color
    - full brightness selected
    - solid red record
    - solid green on playback
- MUTE+PAD   : SOLO Clip
- SOLO+PAD   : SOLO Clip

## STEP MODE 
- GROUPS        : Relative step page
- SHIFT+GROUPS  : Select step page group
- PADS          : Step sequencer, colors fade based on velocity
- SELECT+PADS   : Choose drum pad to step sequence
- SELECT+GROUPS : Choose relative track (+SHIFT : track page)

## CONTROL MODE (DEVICES)
- DEVICE NAV
- MACROS
- DEVICE PARAMETER BANKS
- DEVICE PRESET NEXT/PREV


# KNOB(CC14-CC45) & BUTTON(CC46-CC77) PAGES
- VOL   (CC14-CC21) / ARM TRACK (CC46-CC53)
- PAN   (CC22-CC29) / ARM TRACK (CC46-CC53)
- MACROS(CC30-CC37) / DEVICE < >(CC54,CC57) / PARAM BANK < >(CC58,CC61)
- PARAMS(CC38-CC45) / DEVICE < >(CC54,CC57) / PARAM BANK < >(CC58,CC61)