export default class Analyser {
  constructor() {
    this.audioCtx = null;
    this.audio = new Audio();
    this.analyser = null;
    this.input = null;
    this.output = null;
    this.isInitialized = false;
    this.loudestFreq = {vol: 0, value: 0, keyId: 0 };
    this.loudestArray = null
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

    const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "H"]

    if (this.isInitialized) {
      let bufferLength = this.analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      let nyquist = this.audioCtx.sampleRate / 2;
      this.analyser.getByteFrequencyData(dataArray);

      let peaks = this._detectPeaks(dataArray, 8, 200);
      var res = [];
      for (let j = 0; j < 12; j++) {  //sorting 12 biggest frequencies
        const max = Math.max(...peaks.map(o => o.value));
        peaks.forEach((item, index) => {
          if(item.value === max && item.value > 180){
            let key = Math.round(12 * Math.log2(item.freq / 440) + 45)
            let note = notes[key%12]
            if(!res.map(o => o.key?.slice(0,-1)).includes(note)){
              let octave = Math.floor(key/12)
              res.push({freq: item.freq, key: note + octave,keyId: key + 12,vol: item.value})
            };
            peaks[index].value = 0 // max set to 0 to find second biggest value
          };
        })       
      }
      if (res.length > 0) {
        this.loudestArray = res
        this.loudestFreq.vol = res[0].vol;
        this.loudestFreq.value = res[0].freq;
        this.loudestFreq.keyId = res[0].keyId
      }
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
