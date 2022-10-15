export default class Analyser {
  constructor() {
    this.audioCtx = null;
    this.audio = new Audio();
    this.analyser = null;
    this.input = null;
    this.output = null;
    this.isInitialized = false;

    const thisClass = this;

    requestAnimationFrame(function log() {
      if (thisClass.analyser) {
        let bufferLength = thisClass.analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);
        thisClass.analyser.getByteFrequencyData(dataArray);
        const level = Math.max.apply(null, dataArray);
        // console.log(level);
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

  getOutputLevels() {
    if (this.isInitialized) {
      let bufferLength = this.analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      this.analyser.getByteFrequencyData(dataArray);

      // loudest freq detection demo
      // let loudest = 0;
      // for (let i = 0; i < dataArray.length; i++) {
      //   if (dataArray[i] == Math.max.apply(null, dataArray)) {
      //     loudest = i * (this.audioCtx.sampleRate / 2 / bufferLength);
      //   }
      // }
      // console.log(loudest);

      // let low = dataArray.slice(0, 5);
      // let mid = dataArray.slice(6, 100);
      // let high = dataArray.slice(101, 1023);

      // const lowLevel = Math.max.apply(null, low) / 255;
      // const midLevel = Math.max.apply(null, mid) / 255;
      // const highLevel = Math.max.apply(null, high) / 255;

      // const levels = [lowLevel, midLevel, highLevel];
      return dataArray;
    }
  }

  getLoudestFreq() {
    let loudestFreq = 0;
    if (this.isInitialized) {
      let bufferLength = this.analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      this.analyser.getByteFrequencyData(dataArray);

      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i] == Math.max.apply(null, dataArray)) {
          loudestFreq = i * (this.audioCtx.sampleRate / 2 / bufferLength);
        }
      }
    }

    return loudestFreq;
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
}
