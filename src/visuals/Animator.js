import { Clock } from "three";
import idleAnimation from "./animation/idleAnimation";
const clock = new Clock();

export default class Animator {
  constructor(scene, analyser) {
    this.scene = scene;
    this.analyser = analyser;
    this.currentMode = "idle";
    this.animations = {
      idle: new idleAnimation(analyser),
    };
    this.mixers = [];

    //temp init
    this._addToScene(this.animations[this.currentMode].objects);
  }

  toggleTransition(mode) {
    const currentAnimation = this.animations[mode];
  }

  toggleAnimation(mode) {
    const currentMode = this.currentMode;
    const currentAnimation = this.animations[currentMode];
    if (currentAnimation && currentAnimation != mode) {
      console.log(mode, currentAnimation);
      this.mixers = currentAnimation.fadeOut(); //TODO: mixer mo być brany z IdleAnimation this.mixer i w loopie animacji sprawdzany czy tam jest
    }

    const newAnimation = this.animations[mode];
    if (newAnimation && newAnimation != mode) {
      [];
      this._addToScene(newAnimation.objects);
      this.mixers = newAnimation.fadeIn();
      this.mixers[this.mixers.length - 1].addEventListener("finished", () => {
        this.currentMode = mode;
        this.mixers = [];
      });
    }
  }

  animate() {
    const delta = clock.getDelta();
    let animation = this.animations[this.currentMode];
    if (animation) {
      if (this.mixers) {
        this.mixers.forEach((mixer) => {
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
