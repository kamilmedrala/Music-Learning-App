import {
  AnimationClip,
  AnimationMixer,
  Group,
  InterpolateSmooth,
  LoopOnce,
  NumberKeyframeTrack,
  VectorKeyframeTrack,
} from "three";
import Wave from "../Wave";

export default class idleAnimation {
  constructor(analyser) {
    this.analyser = analyser;
    this.bufferSize = 6;
    this.buffers = [[], [], []];
    this.waves = this._createWaves();
    this.objects = [this.waves[0].line, this.waves[1].line, this.waves[2].line];
  }

  _sliceRanges() {
    let levels = [0, 0, 0];
    if (this.analyser.isInitialized) {
      let inputData = this.analyser.getOutputLevels();
      let low = inputData.slice(0, 5);
      let mid = inputData.slice(6, 100);
      let high = inputData.slice(101, 1023);
      const lowLevel = Math.max.apply(null, low) / 255;
      const midLevel = Math.max.apply(null, mid) / 255;
      const highLevel = Math.max.apply(null, high) / 255;
      levels = [lowLevel / 2, midLevel / 2, highLevel / 2];
    }

    return levels;
  }

  _createWaves() {
    const waveLow = new Wave(20, 1);
    const waveMid = new Wave(16, 0.6);
    const waveHigh = new Wave(12, 0.2);

    return [waveLow, waveMid, waveHigh];
  }

  animate() {
    const waves = this.waves;
    const amplitudes = this._sliceRanges();

    for (let i = 0; i < this.buffers.length; i++) {
      const buffer = this.buffers[i];
      const amplitude = amplitudes[i];

      if (buffer.length < this.bufferSize) {
        buffer.unshift(amplitude);
      }
      buffer.unshift(amplitude);
      buffer.pop();

      amplitude = buffer.reduce((a, b) => a + b, 0) / buffer.length;

      waves[i].updateWave(amplitude);
    }
  }

  fadeIn() {
    const mixers = [];
    this.waves.forEach((wave) => {
      const positionKF = new VectorKeyframeTrack(
        ".position",
        [0, 1.5],
        [...wave.line.position, 0, 0, 0],
        InterpolateSmooth
      );
      const opacityKF = new NumberKeyframeTrack(
        ".material.opacity",
        [0, 1],
        [wave.line.material.opacity, wave.opacity],
        InterpolateSmooth
      );
      const clip = new AnimationClip("Action", 2, [positionKF, opacityKF]);
      const mixer = new AnimationMixer(wave.line, wave.line);
      mixers.push(mixer);
      const clipAction = mixer.clipAction(clip);
      clipAction.clampWhenFinished = true;
      clipAction.setLoop(LoopOnce);
      clipAction.play();
    });

    return mixers;
  }

  fadeOut() {
    const mixers = [];
    this.waves.forEach((wave) => {
      const positionKF = new VectorKeyframeTrack(
        ".position",
        [0, 0.8],
        [...wave.line.position, 0, -0.8, 0],
        InterpolateSmooth
      );
      const opacityKF = new NumberKeyframeTrack(
        ".material.opacity",
        [0, 0.8],
        [wave.line.material.opacity, 0],
        InterpolateSmooth
      );
      const clip = new AnimationClip("Action", 0.8, [positionKF, opacityKF]);
      const mixer = new AnimationMixer(wave.line, wave.line);
      mixers.push(mixer);
      const clipAction = mixer.clipAction(clip);
      clipAction.clampWhenFinished = true;
      clipAction.setLoop(LoopOnce);
      clipAction.play();
    });

    return mixers;
  }
}
