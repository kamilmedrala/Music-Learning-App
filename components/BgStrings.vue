<template>
  <div class="fixed w-full h-full z-0 inset-0 pt-[50vh]">
    <div ref="canvas-container" class="w-full h-full overflow-hidden"></div>
  </div>
</template>

<script>
import Render from "../src/visuals/Render";
import Wave from "../src/visuals/Wave";
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
      const waveLow = new Wave(20, 1);
      const waveMid = new Wave(16, 0.6);
      const waveHigh = new Wave(12, 0.2);

      scene.add(waveLow.line, waveMid.line, waveHigh.line);

      window.addEventListener("resize", function () {
        render.renderResize();
      });

      const bufferSize = 6;
      const analyzer = this.$Analyser;
      let amplitude = 0.1;
      let amplitudeMid = 0.1;
      let amplitudeHigh = 0.1;
      let amplitudeBuffer = [];
      let amplitudeMidBuffer = [];
      let amplitudeHighBuffer = [];

      function animate() {
        if (analyzer.isInitialized) {
          // filling buffer
          amplitude = analyzer.getOutputLevel()[0] / 2;

          if (amplitudeBuffer.length < bufferSize) {
            amplitudeBuffer.unshift(amplitude);
          }
          amplitudeBuffer.unshift(amplitude);
          amplitudeBuffer.pop();

          amplitude =
            amplitudeBuffer.reduce((a, b) => a + b, 0) / amplitudeBuffer.length;

          amplitudeMid = analyzer.getOutputLevel()[1] / 2;

          if (amplitudeMidBuffer.length < bufferSize) {
            amplitudeMidBuffer.unshift(amplitudeMid);
          }
          amplitudeMidBuffer.unshift(amplitudeMid);
          amplitudeMidBuffer.pop();

          amplitudeMid =
            amplitudeMidBuffer.reduce((a, b) => a + b, 0) /
            amplitudeMidBuffer.length;

          amplitudeHigh = analyzer.getOutputLevel()[2] / 2;

          if (amplitudeHighBuffer.length < bufferSize) {
            amplitudeHighBuffer.unshift(amplitudeHigh);
          }
          amplitudeHighBuffer.unshift(amplitudeHigh);
          amplitudeHighBuffer.pop();

          amplitudeHigh =
            amplitudeHighBuffer.reduce((a, b) => a + b, 0) /
            amplitudeHighBuffer.length;
        }
        //update line geometry
        waveLow.updateWave(amplitude);
        waveMid.updateWave(amplitudeMid);
        waveHigh.updateWave(amplitudeHigh);

        requestAnimationFrame(animate);
        render.renderGraphics();
      }
      animate();
    },
  },
};
</script>

<style></style>
