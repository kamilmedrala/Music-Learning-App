export default class TrackAnimation {
    constructor(analyser,track) {
      this.analyser = analyser
      this.track = track;
      this.objects = []; //TEMP
    }
  
    animate() {
      this.analyser.calcLoudestFreq()
      this.track.updateCurrentTime()
    }
  
    fadeIn() {
      console.log("track fade-in");
    }
  
    fadeOut() {
      console.log("track fade-out");
    }
  }
  