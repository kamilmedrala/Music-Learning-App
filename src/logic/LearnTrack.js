import MidiParser from "midi-parser-js";
import { Clock } from "three";

export default class LearnTrack {
  constructor(rawMidi) {
    this.rawMidi = rawMidi;
    this.parsedMidi = {};
    this._parseMidi("./midi/fur_elise.mid");
    this.clock = new Clock(false);
    this.trackLength = 0;
    this.currentTime = 0;
    this.timeConstant = 1;
    this.isRunning = false
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
        this.trackLength = timestampsArray[timestampsArray.length -1] + 1000;

      })
      .catch((err) => console.log(err));
  }

  play() {
    this.clock.start();
    this.isRunning = true
  }

  stop() {
    this.clock.stop();
    this.isRunning = false
  }

  updateCurrentTime() {
    this.currentTime = this.clock.running ?  this.clock.getElapsedTime() : 0;
    
    let relativeTime = this.currentTime * this.parsedMidi.notes?.[1].data[2] * 5 * this.timeConstant;    
    if (relativeTime >= this.trackLength - 500) {
      this.stop();
    }
  }

  setTimeConstant(value){
    this.timeConstant = value
  }
}
