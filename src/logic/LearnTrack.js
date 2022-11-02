import MidiParser from "midi-parser-js";

export default class LearnTrack {
  constructor(rawMidi) {
    this.rawMidi = rawMidi;
    this.parsedMidi = this._parseMidi();
  }

  _parseMidi() {
    fetch("./midi/fur_elise.mid")
      .then((response) => response.arrayBuffer())
      .then((ab) => {
        let file = new Uint8Array(ab);
        return MidiParser.parse(file);
      })
      .catch((err) => console.log(err));
  }
}
