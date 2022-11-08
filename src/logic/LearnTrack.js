import MidiParser from "midi-parser-js";
import { Clock } from "three";

export default class LearnTrack {
  constructor(rawMidi) {
    this.rawMidi = rawMidi;
    this.parsedMidi = {};
    this._parseMidi("./midi/fur_elise.mid");
    this.clock = new Clock(false);
    this.currentTime = 0;
  }

  _parseMidi(url) {
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((ab) => {
        let file = new Uint8Array(ab);
        this.parsedMidi = MidiParser.parse(file);
      })
      .catch((err) => console.log(err));
  }

  play() {
    this.clock.start();
  }

  stop() {
    this.clock.stop();
  }

  updateCurrentTime() {
    this.currentTime = this.clock.getElapsedTime();
  }
}
