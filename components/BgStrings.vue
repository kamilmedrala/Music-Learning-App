<template>
  <div class="absolute w-full h-full z-0 inset-0 pt-[50vh]">
    <div ref="canvas-container" class="w-full h-full overflow-hidden"></div>
  </div>
</template>

<script>
import * as THREE from "three/build/three.module";
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
      const cameraAspect = container.clientWidth / container.clientHeight;
      const cameraFov = THREE.MathUtils.radToDeg(
        2 *
          Math.atan(Math.tan(THREE.MathUtils.degToRad(75) * 0.5) / cameraAspect)
      );

      const camera = new THREE.PerspectiveCamera(
        cameraFov,
        cameraAspect,
        0.1,
        1000
      );

      const scene = new THREE.Scene();
      scene.background = new THREE.Color("rgb(237, 246, 249)");
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      window.addEventListener("resize", function () {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.fov = cameraFov;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        console.log(container.clientWidth, container.clientHeight);
      });

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      }
      animate();
    },
  },
};
</script>

<style></style>
