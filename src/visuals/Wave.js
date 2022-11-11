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
        Math.sin(i / this.waveLength + this.phaseShift / 200) *
        (amplitude + 0.1);
    }

    let geometry = new BufferGeometry().setFromPoints(this.linePoints);

    this.line.geometry.dispose();
    this.line.geometry = geometry;
    this.phaseShift = this.phaseShift + 1 + amplitude * 16;
  }

  updateWaveSpectrum(amplitudeArray) {
    let testArray = []
    for (let i = 0; i < 2048; i++) {
      // this.linePoints[i].y = 
      // console.log((-4) * Math.pow(max/min, exp));
      let posX = ((10*Math.log10(i))/4) - 4
      posX = posX == -Infinity ? -4 : posX
      testArray[i] = new Vector2(posX, amplitudeArray[i]/200)
      // console.log(10 * Math.log10(this.linePoints[i].x + 4));
      // this.linePoints[i].x = 10 * Math.log10(this.linePoints[i].x + 4) +0.0001;
    }
    let newCurve = new SplineCurve(testArray);
    let newCurvePoints = newCurve.getPoints(5000);
    let lineGeometry = new BufferGeometry().setFromPoints(newCurvePoints);
    // let geometry = new BufferGeometry().setFromPoints(testArray);

    this.line.geometry.dispose();
    this.line.geometry = lineGeometry;
    lineGeometry = null
  }
}
