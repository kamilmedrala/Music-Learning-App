import { Clock } from "three";
import * as MidiWriter from "midi-writer-js";

export default class Recorder{
    constructor(analyser){
        this.analyser = analyser
        this.clock = new Clock(false);
        this.isRunning = false
        this.currentTime = 0;
        this.notes = []
        this.trackLength = 3200 //16 bars
        this.track = new MidiWriter.Track()
        this.track.setTempo(60)
    }

    addNote(key){
        if (key > -1) {
            let note = {
                keyId: key,
                startTime: this.currentTime,
                duration: 0
            }
            this.notes.push(note)
        }
        if (this.notes.length>0) {
            let lastNote = this.notes.find(note => note.duration == 0);
            lastNote.duration = this.currentTime - lastNote.startTime 
        }
    }

    clearNotes(){
        this.notes = []
    }

    start(){
        this.clock.start();
        this.isRunning = true
    }

    stop(){
        this.clock.stop();
        this.isRunning = false
    }

    updateCurrentTime() {
        this.currentTime = this.clock.running ?  this.clock.getElapsedTime()*200 : 0;
        if (this.currentTime >= this.trackLength) {
            this.stop();
        }
    }

    generateMidi(){
        let bpm = 60
        this.track.removeEventsByType('note')   //clear

        this.notes.forEach((note)=>{
            let startSeconds = note.startTime;
            let startBeats = startSeconds * (bpm / 60); 

            let durationSeconds =  note.duration/200;
            let durationTicks = Math.round(durationSeconds * (bpm / 60) * 128) // 128 is resolution

            this.track.addEvent(new MidiWriter.NoteEvent({pitch: note.keyId + 24, duration: 'T' + durationTicks ,time:startBeats}));
            console.log(note.duration/200 +'s');
        })

        const midiFile = new MidiWriter.Writer(this.track);
        const data = midiFile.buildFile();
        const blob = new Blob([data], {type: 'audio/midi'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'record.mid';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }


}