import MidiParser from "midi-parser-js";

export default class LearnTrack {
  constructor(rawMidi) {
    this.rawMidi = rawMidi;
    this.parsedMidi = {};
    this._parseMidi("./midi/fur_elise.mid");
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
}
