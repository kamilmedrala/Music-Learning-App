export default class RecorderAnimation {
    constructor(analyser,recorder) {
      this.analyser = analyser
      this.recorder = recorder;
      this.objects = [];
    }
  
    animate() {
      this.analyser.calcLoudestFreq()
      this.recorder.updateCurrentTime()
    }
  
    fadeIn() {
      console.log("recorder fade-in");
    }
  
    fadeOut() {
      console.log("recorder fade-out");
    }
  }
  