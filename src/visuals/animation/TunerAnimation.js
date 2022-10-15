export default class TunerAnimation {
  constructor(analyser) {
    this.analyser = analyser;
    this.objects = []; //TEMP
  }

  animate() {
    this.analyser.calcLoudestFreq();
  }

  fadeIn() {
    console.log("tuner fade-in");
  }

  fadeOut() {
    console.log("tuner fade-out");
  }
}
