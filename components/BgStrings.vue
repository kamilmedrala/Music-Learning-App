<template>
  <div class="fixed w-full h-full z-0 inset-0 pt-[50vh]">
    <div ref="canvas-container" class="w-full h-full overflow-hidden"></div>
  </div>
</template>

<script>
import Animator from "../src/visuals/Animator";
import Render from "../src/visuals/Render";
export default {
  data() {
    return {
      mode: "Init",
      animator: null,
    };
  },
  mounted() {
    this.initCanvas();
  },
  computed: {
    currentState() {
      return this.$store.getters.getCurrentMode;
    },
  },
  watch: {
    currentState(mode) {
      this.$store.commit[("setCurrentMode", mode)];
      this.animator.toggleAnimation(mode);
    },
  },
  methods: {
    initCanvas() {
      const container = this.$refs["canvas-container"];
      const render = new Render(container);
      const scene = render.scene;
      const analyzer = this.$Analyser;
      const track = this.$LearnTrack;
      const recorder = this.$Recorder;
      const animator = new Animator(scene, analyzer,track,recorder);
      this.animator = animator;

      window.addEventListener("resize", function () {
        render.renderResize();
      });

      function animate() {
        if (animator) {
          animator.animate();
        }

        requestAnimationFrame(animate);
        render.renderGraphics();
      }
      animate();
    },
  },
};
</script>

<style></style>
