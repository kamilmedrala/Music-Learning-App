import MidiParser from "midi-parser-js";
import { Clock } from "three";

export default class LearnTrack {
  constructor(rawMidi) {
    this.rawMidi = rawMidi;
    this.parsedMidi = {};
    this._parseMidi("./midi/fur_elise.mid");
    this.clock = new Clock(false);
    this.currentTime = 0;
    this.timeConstant = 1;
  }

  _parseMidi(url) {
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((ab) => {
        const file = new Uint8Array(ab);
        const parsedMidi = MidiParser.parse(file);

        let rawNotes = parsedMidi.track?.[0].event;
        let timestampsArray = [];
        
        if (rawNotes) {
          for (let i = 0; i < rawNotes.length; i++) {
            let prevTimestamp = 0;
            if (i > 0) {
              prevTimestamp = timestampsArray[i - 1];
            }
            timestampsArray.push(rawNotes[i].deltaTime + prevTimestamp);
          }
        }
        this.parsedMidi = { notes: rawNotes, timestamps: timestampsArray };

      })
      .catch((err) => console.log(err));
  }

  play() {
    this.clock.start();
  }

  stop() {
    this.clock.stop();
  }

  setTimeConstant(value){
    this.timeConstant = value
  }

  updateCurrentTime() {
    this.currentTime = this.clock.running ?  this.clock.getElapsedTime() : 0;
  }
}
