import { Clock } from "three";

export default class Recorder{
    constructor(analyser){
        this.analyser = analyser
        this.clock = new Clock(false);
        this.isRunning = false
        this.currentTime = 0;
        this.notes = []
        this.trackLength = 3200 //16 bars
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
        
    }


}