<template>
  <div class="absolute inset-0 flex items-center justify-center py-20">
    <div
      class="w-[450px] h-full max-h-[600px] py-10 px-20 bg-green-3000/60 rounded-3xl backdrop-blur-lg overflow-auto"
    >
      <div class="flex flex-col text-white">
        <h3 class="mb-10 font-main text-4xl text-center">Select device</h3>
        <span class="font-body text-xl mb-3"> Audio input</span>
        <div class="max-w-[400px] text-black mb-12">
          <ElementCollapse
            :defaultSelect="
              storedSettings.input ? storedSettings.input.label : 'Wybierzeee'
            "
            :options="audioInputs.map((val) => val.label)"
            @optionSelect="setInput($event)"
          />
        </div>
        <span class="font-body text-xl mb-3"> Audio output</span>
        <div class="max-w-[400px] text-black">
          <ElementCollapse
            :defaultSelect="
              storedSettings.output ? storedSettings.output.label : 'Wybierz'
            "
            :options="audioOutputs.map((val) => val.label)"
            @optionSelect="setOutput($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Analyser from "../src/logic/analyser";
import ElementCollapse from "./ElementCollapse.vue";

export default {
  name: "SettingsModal",
  data() {
    return {
      audioInputs: [],
      audioOutputs: [],
    };
  },
  computed: {
    storedSettings() {
      const settings = this.$store.getters.getSettings;
      return { input: settings.input, output: settings.output };
    },
  },
  mounted() {
    const vm = this;
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      devices.forEach(function (device) {
        if (device.kind === "audioinput") {
          vm.audioInputs.push({ label: device.label, id: device.deviceId });
        } else if (device.kind === "audiooutput") {
          vm.audioOutputs.push({ label: device.label, id: device.deviceId });
        }
      });
    });
    // const analyser = new Analyser();
    // navigator.mediaDevices
    //   .getUserMedia({ video: false, audio: true })
    //   .then((stream) => {
    //     console.log(stream);
    //     return stream;
    //     // window.localStream = stream; // A
    //     // window.localAudio.srcObject = stream; // B
    //     // window.localAudio.autoplay = true; // C
    //   })
    //   .catch((err) => {
    //     console.error(`you got an error: ${err}`);
    //   });
    // navigator.mediaDevices
    //   .getUserMedia({ video: false, audio: true })
    //   .then((stream) => {
    //     console.log(stream);
    //     // window.localStream = stream; // A
    //     // window.localAudio.srcObject = stream; // B
    //     // window.localAudio.autoplay = true; // C
    //   })
    //   .catch((err) => {
    //     console.error(`you got an error: ${err}`);
    //   });
    // navigator.mediaDevices.enumerateDevices().then(function (devices) {
    //   devices.forEach(function (device) {
    //     console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
    //   });
    // });
  },
  methods: {
    setInput(value) {
      this.$store.commit("setSettings", {
        type: "input",
        data: {
          label: value,
          id: this.audioInputs.find((obj) => obj.label == value).id,
        },
      });
    },
    setOutput(value) {
      this.$store.commit("setSettings", {
        type: "output",
        data: {
          label: value,
          id: this.audioOutputs.find((obj) => obj.label == value).id,
        },
      });
    },
  },
  components: { ElementCollapse },
};
</script>

<style></style>
