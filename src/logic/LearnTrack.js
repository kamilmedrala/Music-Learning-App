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
        let combined = []
        rawNotes.forEach((note,index)=>{
            if (note.type == 9) {
              combined.push(
                {
                  key: note.data[0],
                  startTime: timestampsArray[index],
                  duration: timestampsArray[index+2] - timestampsArray[index]
                }
              ) 
            }
          }
        )
        this.parsedMidi = { notes: rawNotes, timestamps: timestampsArray,combined: combined };
        this.trackLength = timestampsArray[timestampsArray.length -1] + 1000;

      })
      .catch((err) => console.log(err));
  }

  hitCheck(){
    if (this.parsedMidi?.notes) {
      const relativeTime = this.parsedMidi.notes?.[1].data[2] * 5 * this.timeConstant
      console.log(this.parsedMidi.notes.indexOf(Math.floor(relativeTime)));
    }
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

    if(this.clock.running){
      let searchValue = Math.round(relativeTime - 110 -96)
      let range = 2
      // mapować wszystki z type 9
      let foundNote = this.parsedMidi.combined.find(val => Math.abs(val.startTime - searchValue) <= range);
      if (foundNote) {
        console.log(foundNote.key)
        // if (foundNoteIndex == 0) {
        //   foundNoteIndex = 3
        // }
        // if (this.parsedMidi.notes[foundNoteIndex].type == 9) {
        //   // console.log( foundNoteIndex,this.parsedMidi.notes[foundNoteIndex].data[0] - 50);
        // }
      }
    } 
    if (relativeTime >= this.trackLength - 500) {
      this.stop();
    }
  }

  setTimeConstant(value){
    this.timeConstant = value
  }
}
