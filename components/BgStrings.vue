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
        new THREE.Vector2(-2, 0.5),
        new THREE.Vector2(2, -0.5),
        new THREE.Vector2(4, 0),
      ]);

      const points = curve.getPoints(100);

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);

      window.addEventListener("resize", function () {
        render.renderResize();
      });

      function animate() {
        requestAnimationFrame(animate);
        render.renderGraphics();
      }
      animate();
    },
  },
};
</script>

<style></style>
