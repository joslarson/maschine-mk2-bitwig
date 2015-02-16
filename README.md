maschine-mk2-bitwig
====================

**NOT YET FULLY IMPLEMENTED.**

## GLOBAL CONTROLS (Some Exceptions)
- [ ] GRID            : Shift Modifier
- [ ] GROUPS          : Relative track
    - [x] dimmed track color
    - [x] full brightness on selected
    - [ ] desaturate on tracks midi note on events
- [x] DUPLICATE+GROUP : DUPLICATE Track `[BUG]`
- [ ] SELECT+GROUP    : SELECT Track
- [ ] MUTE+GROUP      : MUTE Track
- [ ] SOLO+GROUP      : SOLO Track
- [ ] ERASE+GROUP     : DELETE Track
- [ ] SHIFT+GROUP     : Toggle track playback engine (laucher/arranger)
- [ ] 1st empty GROUP : new inst track (+SHIFT for audio track)
- [ ] SHIFT+TRANSPORT.LEFT/RIGHT: PREV/NEXT SCENE trigger `[???]`
- [ ] SHIFT+SCENE     : Create Scene from playing clips


### KNOB(CC14-CC45) & BUTTON(CC46-CC77) PAGES
- [x] VOL   (CC14-CC21) / ARM TRACK (CC46-CC53)
- [x] PAN   (CC22-CC29) / ARM TRACK (CC46-CC53)
- [ ] MACROS(CC30-CC37) / DEVICE < >(CC54,CC57) / PARAM BANK < >(CC58,CC61)
- [ ] PARAMS(CC38-CC45) / DEVICE < >(CC54,CC57) / PARAM BANK < >(CC58,CC61)


## PAD MODE
- [x] PADS            : Send midi notes to current track
- [ ] NAVIGATE+GROUPS : PAD groups (set's of 16 midi notes) `[???]`


## SCENE MODE
- [x] PADS          : Relative Scene Trigger
- [ ] NAVIGATE+PAD  : Select Scene page `[???]`
- [ ] DUPLICATE+PAD : DUPLICATE Scene
- [ ] SELECT+PAD    : SELECT Scene
- [ ] ERASE+PAD     : DELETE Scene


## PATTERN MODE
- [x] PADS          : Relative Clip Selection for Track 
    - [x] dimmed clip color
    - [x] full brightness when set to play
    - [x] pulsing on record
- [ ] NAVIGATE+PAD  : Select Clip page `[???]`
- [x] DUPLICATE+PAD : DUPLICATE Clip
- [x] SELECT+PAD    : SELECT Clip `[BUG]`
- [ ] SOLO+PAD      : SOLO Clip
- [ ] MUTE+PAD      : MUTE Clip
- [x] ERASE+PAD     : DELETE Clip


Thoughts/ideas/brainstorm
================================================

Idea: BROWSE could be device mode where you navigate through devices using the pads?

### STEP MODE 
- GROUPS        : Relative step page
- SHIFT+GROUPS  : Select step page group
- PADS          : Step sequencer, colors fade based on velocity
- SELECT+PADS   : Choose drum pad to step sequence
- SELECT+GROUPS : Choose relative track (+SHIFT : track page)