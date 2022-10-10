import idleAnimation from "./animation/idleAnimation";

export default class Animator {
  constructor(scene, analyser) {
    this.scene = scene;
    this.analyser = analyser;
    this.currentMode = "idle";
    this.animations = {
      idle: new idleAnimation(analyser),
    };

    //temp init
    this.toggleAnimation(this.currentMode);
  }

  toggleAnimation(mode) {
    this.currentMode = mode;
    const currentAnimation = this.animations[mode];
    this._addToScene(currentAnimation.objects);
  }

  animate() {
    if (this.currentMode) {
      this.animations[this.currentMode].animate();
    }
  }

  _addToScene(objects) {
    objects.forEach((object) => {
      this.scene.add(object);
    });
  }

  _hideFromScene() {}
}
