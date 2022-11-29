export default class Analyser {
  constructor() {
    this.audioCtx = null;
    this.audio = new Audio();
    this.analyser = null;
    this.input = null;
    this.output = null;
    this.isInitialized = false;
    this.loudestFreq = { value: 0, keyId: 0 };
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
        thisClass.analyser.smoothingTimeConstant = 0.7;
        thisClass.analyser.fftSize = 16384;
        const microphone = thisClass.audioCtx.createMediaStreamSource(stream);
        microphone.connect(thisClass.analyser);

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
    // TODO: replace notescale
    const tempNotesCale = [
      "C3",
      "C#3",
      "D3",
      "D#3",
      "E3",
      "F3",
      "F#3",
      "G3",
      "G#3",
      "A3",
      "A#3",
      "H3",
      "C4",
      "C#4",
      "D4",
      "D#4",
      "E4",
      "F4",
      "F#4",
      "G4",
      "G#4",
      "A4",
      "A#4",
      "H4",
      "C5",
      "C#5",
      "D5",
      "D#5",
      "E5",
      "F5",
      "F#5",
      "G5",
      "G#5",
      "A5",
      "A#5",
      "H5",
    ]

    if (this.isInitialized) {
      let bufferLength = this.analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      let nyquist = this.audioCtx.sampleRate / 2;
      this.analyser.getByteFrequencyData(dataArray);

      let peaks = this._detectPeaks(dataArray, 8, 200);
      var res = [0];
      for (let j = 0; j < 12; j++) {
        const max = Math.max(...peaks.map(o => o.value));
        peaks.forEach((item, index) => {
          if(item.value === max && item.value > 180){
            res[j] = {freq: item.freq, key: tempNotesCale[Math.round(12 * Math.log2(item.freq / 440) + 21)]}
            peaks[index].value = 0
          };
        })       
      }
      if (res[0] != 0) {
        // console.log([...new Set(res.map(o => o.key))]);
        this.loudestFreq.value = res[0].freq;
        this.loudestFreq.keyId = 12 * Math.log2(this.loudestFreq.value / 440) + 9
      }


      // for (let i = 0; i < dataArray.length; i++) {
      //   if (
      //     dataArray[i] == Math.max.apply(null, dataArray) &&
      //     dataArray[i] > 180
      //   ) {
          
      //     this.loudestFreq.value = i * (nyquist / bufferLength);
      //     this.loudestFreq.keyId = 12 * Math.log2(this.loudestFreq.value / 440) + 9
      //   }
      // }
    }
  }

  _detectPeaks(data, windowWidth, threshold){
      const peaks = [];
      for (let i = 0; i < data.length; i++) {
        const start = Math.max(0, i - windowWidth);
        const end = Math.min(data.length, i + windowWidth);
        let deltaAcc = 0;
        for (let a = start; a < end; a++) {
          deltaAcc += Math.abs(data[a - 1] - data[a]);
        }
        if (deltaAcc > threshold) {
          peaks.push({freq: i * 2.9296875,value:data[i]});
        }
      }
      return peaks;
  }
}
