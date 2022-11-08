export default class TrackAnimation {
    constructor(track) {
      this.track = track;
      this.objects = []; //TEMP
    }
  
    animate() {
      this.track.updateCurrentTime()
    }
  
    fadeIn() {
      console.log("track fade-in");
    }
  
    fadeOut() {
      console.log("track fade-out");
    }
  }
  