<template>
  <div class="absolute inset-0 flex items-center justify-center py-20">
    <div
      class="w-[450px] h-full max-h-[600px] py-10 px-20 bg-green-3000/50 rounded-3xl backdrop-blur-md overflow-auto"
    >
      <div class="flex flex-col text-white">
        <h3 class="mb-10 font-main text-4xl text-center">Select device</h3>
        <span class="font-body text-xl mb-3"> Audio input</span>
        <div class="max-w-[400px] text-black mb-10">
          <ElementCollapse
            :defaultSelect="
              storedSettings.input ? storedSettings.input.label : 'Wybierz'
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
  watch: {
    "storedSettings.input"(data) {
      if (typeof data.id == "string") {
        this.$Analyser.setInput(data.id);
      }
    },
    "storedSettings.output"(data) {
      if (typeof data.id == "string") {
        this.$Analyser.setOutput(data.id);
      }
    },
  },
  mounted() {
    const vm = this;
    if (!this.$Analyser.isInitialized) {
      this.$Analyser.startAnalyser().then(() => {
        vm.listDevices();
      });
    } else {
      this.listDevices();
    }
  },
  methods: {
    setInput(value) {
      let inputId = this.audioInputs.find((obj) => obj.label == value).id;
      this.$store.commit("setSettings", {
        type: "input",
        data: {
          label: value,
          id: inputId,
        },
      });
    },
    setOutput(value) {
      let outputId = this.audioOutputs.find((obj) => obj.label == value).id;
      this.$store.commit("setSettings", {
        type: "output",
        data: {
          label: value,
          id: outputId,
        },
      });
    },
    listDevices() {
      this.audioInputs.push({ label: "None", id: "" });
      this.audioOutputs.push({ label: "None", id: "" });
      const vm = this;
      this.$Analyser.getDevices().then(function (devices) {
        devices.forEach(function (device) {
          if (device.kind === "audioinput") {
            vm.audioInputs.push({ label: device.label, id: device.deviceId });
          } else if (device.kind === "audiooutput") {
            vm.audioOutputs.push({
              label: device.label,
              id: device.deviceId,
            });
          }
        });
      });
    },
  },
  components: { ElementCollapse },
};
</script>

<style></style>
