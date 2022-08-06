export default class Analyser {
  constructor() {
    this.createAnalyser();
  }

  createAnalyser() {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then(function (stream) {
        const audioCtx = new AudioContext();
        const analyser = audioCtx.createAnalyser();
        const microphone = audioCtx.createMediaStreamSource(stream);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);

        requestAnimationFrame(function log() {
          let bufferLength = analyser.frequencyBinCount;
          let dataArray = new Uint8Array(bufferLength);
          analyser.getByteFrequencyData(dataArray);
          const level = Math.max.apply(null, dataArray);
          console.log(level);
          requestAnimationFrame(log);
        });
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  selectInput() {}

  selectOutput() {}
}
