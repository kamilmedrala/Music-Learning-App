import { Clock } from "three";
import idleAnimation from "./animation/idleAnimation";
import TunerAnimation from "./animation/TunerAnimation";
import TrackAnimation from "./animation/TrackAnimation";
const clock = new Clock();

export default class Animator {
  constructor(scene, analyser, track) {
    this.scene = scene;
    this.analyser = analyser;
    this.currentMode = "idle";
    this.animations = {
      idle: new idleAnimation(analyser),
      tuner: new TunerAnimation(analyser),
      track: new TrackAnimation(track)
    };
    this.newMixers = [];
    this.oldMixers = [];

    //temp init
    this._addToScene(this.animations[this.currentMode].objects);
  }

  // toggleAnimation(mode) {
  //   const currentMode = this.currentMode;
  //   const currentAnimation = this.animations[currentMode];
  //   if (currentAnimation && currentAnimation != mode) {
  //     console.log(mode, currentAnimation);
  //     let oldMixers = currentAnimation.fadeOut(); //TODO: mixer mo być brany z IdleAnimation this.mixer i w loopie animacji sprawdzany czy tam jest
  //     if (oldMixers?.length > 0) {
  //       this.mixers = oldMixers;
  //       this.mixers[this.mixers.length - 1].addEventListener("finished", () => {
  //         this.currentMode = mode;
  //         this.mixers = [];
  //       });
  //     } else {
  //       this.currentMode = mode;
  //     }
  //   }

  //   const newAnimation = this.animations[mode];
  //   if (newAnimation && newAnimation != mode) {
  //     this._addToScene(newAnimation.objects);
  //     let newMixers = newAnimation.fadeIn();
  //     // this.currentMode = mode;       //TODO: Fix animation stop
  //     if (newMixers?.length > 0) {
  //       this.mixers[this.mixers.length - 1].addEventListener("finished", () => {
  //         this.mixers = newMixers;
  //           this.mixers[this.mixers.length - 1].addEventListener("finished", () => {
  //             // this.mixers = newMixers;
  //               this.mixers = [];
  //           });
  //       });
  //     }else{
  //       this.mixers = [];
  //     }
  //   }
  // }

  // animate() {
  //   const delta = clock.getDelta();
  //   let animation = this.animations[this.currentMode];
  //   if (animation) {
  //     if (this.mixers) {
  //       this.mixers.forEach((mixer) => {
  //         mixer.update(delta);
  //       });
  //     }
  //     animation.animate();
  //   }
  // }

  toggleAnimation(mode) {
    const currentMode = this.currentMode;
    const currentAnimation = this.animations[currentMode];
    if (currentAnimation && currentAnimation != mode) {
      console.log(mode, currentAnimation);
      let oldMixers = currentAnimation.fadeOut(); //TODO: mixer mo być brany z IdleAnimation this.mixer i w loopie animacji sprawdzany czy tam jest
      if (oldMixers?.length > 0) {
        this.oldMixers = oldMixers;
        this.oldMixers[this.oldMixers.length - 1].addEventListener("finished", () => {
          this.currentMode = mode;
          this.oldMixers = [];
        });
      } else {
        this.oldMixers = []
        this.currentMode = mode;
      }
    }

    const newAnimation = this.animations[mode];
    if (newAnimation && newAnimation != mode) {
      this._addToScene(newAnimation.objects);
      let newMixers = newAnimation.fadeIn();
      // this.currentMode = mode;       //TODO: Fix animation stop
      if (newMixers?.length > 0) {
        this.newMixers = newMixers;
        this.newMixers[this.newMixers.length - 1].addEventListener("finished", () => {
          this.newMixers = []
        });
      }else{
        this.newMixers = [];
      }
    }
  }

  animate() {
    const delta = clock.getDelta();
    let animation = this.animations[this.currentMode];
    if (animation) {
      if (this.oldMixers) {
        this.oldMixers.forEach((mixer) => {
          mixer.update(delta);
        });
      }
      if (this.newMixers) {
        this.newMixers.forEach((mixer) => {
          mixer.update(delta);
        });
      }
      animation.animate();
    }
  }

  _addToScene(objects) {
    objects.forEach((object) => {
      this.scene.add(object);
    });
  }

  _hideFromScene() {}
}
