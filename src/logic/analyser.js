export default class Analyser {
  constructor() {
    this.audioCtx = null;
    this.analyser = null;
    this.isInitialized = false;

    const thisClass = this;

    requestAnimationFrame(function log() {
      if (thisClass.analyser) {
        let bufferLength = thisClass.analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);
        thisClass.analyser.getByteFrequencyData(dataArray);
        const level = Math.max.apply(null, dataArray);
        console.log(level);
      }
      requestAnimationFrame(log);
    });
  }

  async startAnalyser(audioSource) {
    const thisClass = this;
    return navigator.mediaDevices
      .getUserMedia({
        audio: { deviceId: audioSource ? { exact: audioSource } : true },
        video: false,
      })
      .then(function (stream) {
        thisClass.isInitialized = true;

        thisClass.audioCtx = new AudioContext();
        thisClass.analyser = thisClass.audioCtx.createAnalyser();
        thisClass.analyser.smoothingTimeConstant = 0.8;
        thisClass.analyser.fftSize = 1024;

        const microphone = thisClass.audioCtx.createMediaStreamSource(stream);
        microphone.connect(thisClass.analyser);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  async getDevices() {
    return navigator.mediaDevices.enumerateDevices().then((devices) => {
      return devices;
    });
  }

  setInput(audioSource) {
    if (this.audioCtx && this.isInitialized) this.audioCtx.close();
    this.startAnalyser(audioSource);
  }

  setOutput(audioOutput) {}
}
