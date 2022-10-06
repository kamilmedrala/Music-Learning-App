<template>
  <div class="absolute w-full h-full z-0 inset-0 pt-[50vh]">
    <div ref="canvas-container" class="w-full h-full overflow-hidden"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import Render from "../src/visuals/Render";
export default {
  data() {
    return {
      mode: "Init",
    };
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const container = this.$refs["canvas-container"];
      const render = new Render(container);
      const scene = render.scene;

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x006d77,
        linewidth: 20,
      });

      const curve = new THREE.SplineCurve([
        new THREE.Vector2(-4, 0),
        new THREE.Vector2(4, 0),
      ]);

      const points = curve.getPoints(500);

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeometry, lineMaterial);
      line.matrixAutoUpdate = true;
      scene.add(line);

      window.addEventListener("resize", function () {
        render.renderResize();
      });

      let increment = 0;
      const analyzer = this.$Analyser;
      let amplitude = 0.2;
      function animate() {
        if (analyzer.isInitialized) {
          amplitude = analyzer.getOutputLevel() / 2;
        }
        for (let i = 0; i < points.length; i++) {
          points[i].y = Math.sin((i * amplitude) / 20) * amplitude + 0.4;
          // points[i].x = points[i].x + increment / 1000;
        }

        let geometry = new THREE.BufferGeometry().setFromPoints(points);

        line.geometry.dispose();
        line.geometry = geometry;

        increment++;

        requestAnimationFrame(animate);
        render.renderGraphics();
      }
      animate();
    },
  },
};
</script>

<style></style>
