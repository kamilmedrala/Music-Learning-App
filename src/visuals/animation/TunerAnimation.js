import {
  AnimationClip,
  AnimationMixer,
  InterpolateSmooth,
  VectorKeyframeTrack,
  LoopOnce,
  NumberKeyframeTrack,
} from "three";
import Wave from "../Wave";

export default class TunerAnimation {
  constructor(analyser) {
    this.analyser = analyser;
    this.buffers = [];
    this.wave = new Wave(0,0);
    this.wave.line.position.y = -0.25
    this.objects = [this.wave.line];
  }

  _createWave(){
    
  }

  animate() {
    let amplitudeArray = this.analyser.getOutputLevels()
    
    this.analyser.calcLoudestFreq();
    this.wave.updateWaveSpectrum(amplitudeArray)
  }

  fadeIn() {
    console.log("tuner fade-in");
    const mixers = [];

    const positionKF = new VectorKeyframeTrack(
      ".scale",
      [0, 1.2],
      [...this.wave.line.scale, 1, 1, 1],
      InterpolateSmooth
    );
    const opacityKF = new NumberKeyframeTrack(
      ".material.opacity",
      [0, 1],
      [this.wave.line.material.opacity, 1],
      InterpolateSmooth
    );
    const clip = new AnimationClip("Action", 1.2, [opacityKF,positionKF]);
    const mixer = new AnimationMixer(this.wave.line, this.wave.line);
    mixers.push(mixer);
    const clipAction = mixer.clipAction(clip);
    clipAction.clampWhenFinished = true;
    clipAction.setLoop(LoopOnce);
    clipAction.play();

    return mixers;
  }

  fadeOut() {
    console.log("tuner fade-out");
    const mixers = [];
    const positionKF = new VectorKeyframeTrack(
      ".scale",
      [0, 0.5],
      [...this.wave.line.scale, 1, 0, 1],
      InterpolateSmooth
    );
    const opacityKF = new NumberKeyframeTrack(
      ".material.opacity",
      [0, 0.5],
      [this.wave.line.material.opacity, 0],
      InterpolateSmooth
    );
    const clip = new AnimationClip("Action", 0.5, [opacityKF,positionKF]);
    const mixer = new AnimationMixer(this.wave.line, this.wave.line);
    mixers.push(mixer);
    const clipAction = mixer.clipAction(clip);
    clipAction.clampWhenFinished = true;
    clipAction.setLoop(LoopOnce);
    clipAction.play();

    return mixers;
  }
}
