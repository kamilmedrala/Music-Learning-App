import {
  LineBasicMaterial,
  SplineCurve,
  Vector2,
  BufferGeometry,
  Line,
} from "three";

export default class Wave {
  constructor(waveLength, opacity) {
    this.waveLength = waveLength;
    this.opacity = opacity;
    this.phaseShift = 0;
    this.linePoints = [];
    this.line = this.createLine();
  }

  createLine() {
    const lineMaterial = new LineBasicMaterial({
      color: 0x006d77,
      linewidth: 20,
      transparent: true,
      opacity: this.opacity,
    });

    const curve = new SplineCurve([new Vector2(-4, 0), new Vector2(4, 0)]);

    this.linePoints = curve.getPoints(100);
    const lineGeometry = new BufferGeometry().setFromPoints(this.linePoints);
    const line = new Line(lineGeometry, lineMaterial);
    line.matrixAutoUpdate = true;

    return line;
  }

  updateWave(amplitude) {
    for (let i = 0; i < this.linePoints.length; i++) {
      this.linePoints[i].y =
        Math.sin(i / this.waveLength + this.phaseShift / 100) *
        (amplitude + 0.1);
    }

    let geometry = new BufferGeometry().setFromPoints(this.linePoints);

    this.line.geometry.dispose();
    this.line.geometry = geometry;
    this.phaseShift = this.phaseShift + 1 + amplitude * 5;
  }
}
