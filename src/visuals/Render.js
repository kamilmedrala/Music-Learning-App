import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Color,
  MathUtils,
} from "three";

export default class Render {
  constructor(container) {
    this.container = container;
    this.scene = this._createScene();
    this.camera = this._createCamera(container);
    this.renderer = this._createRenderer(container);
  }

  _createScene() {
    const scene = new Scene();
    scene.background = new Color("rgb(237, 246, 249)");

    return scene;
  }

  _createCamera() {
    const cameraAspect =
      this.container.clientWidth / this.container.clientHeight;
    const cameraFov = MathUtils.radToDeg(
      2 * Math.atan(Math.tan(MathUtils.degToRad(75) * 0.5) / cameraAspect)
    );

    const camera = new PerspectiveCamera(cameraFov, cameraAspect, 0.1, 1000);
    camera.position.z = 5;

    return camera;
  }

  _createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(renderer.domElement);

    return renderer;
  }

  renderResize() {
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.fov = MathUtils.radToDeg(
      2 * Math.atan(Math.tan(MathUtils.degToRad(75) * 0.5) / this.camera.aspect)
    );
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
  }

  renderGraphics() {
    this.renderer.render(this.scene, this.camera);
  }
}
