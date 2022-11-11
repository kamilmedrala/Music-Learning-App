export default class Analyser {
  constructor() {
    this.audioCtx = null;
    this.audio = new Audio();
    this.analyser = null;
    this.input = null;
    this.output = null;
    this.isInitialized = false;
    this.loudestFreq = { value: 0 };
  }

  async startAnalyser(audioSource) {
    const thisClass = this;
    return navigator.mediaDevices
      .getUserMedia({
        audio: { deviceId: audioSource ? { exact: audioSource } : true },
        video: false,
      })
      .then(function (stream) {
        thisClass.audioCtx = new AudioContext();
        thisClass.analyser = thisClass.audioCtx.createAnalyser();
        thisClass.analyser.smoothingTimeConstant = 0.8;
        thisClass.analyser.fftSize = 4096;
        const microphone = thisClass.audioCtx.createMediaStreamSource(stream);
        microphone.connect(thisClass.analyser);
        // const dest = thisClass.audioCtx.createMediaStreamDestination();

        thisClass.audio.srcObject = stream;
        if (thisClass.output) {
          thisClass.audio.setSinkId(thisClass.output);
          thisClass.audio.play();
        } else {
          thisClass.audio.pause();
        }
        thisClass.isInitialized = true;
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
    if (this.audioCtx?.state != "closed" && this.isInitialized)
      this.audioCtx.close();
    this.input = audioSource;
    this.startAnalyser(audioSource);
  }

  setOutput(audioOutput) {
    if (this.audioCtx?.state != "closed" && this.isInitialized)
      this.audioCtx.close();
    this.output = audioOutput;
    this.startAnalyser();
  }

  getOutputLevels() {
    if (this.isInitialized) {
      let bufferLength = this.analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      this.analyser.getByteFrequencyData(dataArray);
      return dataArray;
    }
  }

  calcLoudestFreq() {
    if (this.isInitialized) {
      let bufferLength = this.analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      let nyquist = this.audioCtx.sampleRate / 2;
      this.analyser.getByteFrequencyData(dataArray);

      for (let i = 0; i < dataArray.length; i++) {
        if (
          dataArray[i] == Math.max.apply(null, dataArray) &&
          dataArray[i] > 150
        ) {
          this.loudestFreq.value = i * (nyquist / bufferLength);
        }
      }
    }
  }
}
