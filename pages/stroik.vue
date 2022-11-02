<template>
  <div>
    <div class="py-10">
      <nuxt-link class="group block w-full h-full" to="/start">
        <span
          class="font-main text-xl md:text-2xl transition duration-300 hover:text-green-3000"
        >
          〈 Back
        </span>
      </nuxt-link>
      <HeaderTitle title="Stroik" />
    </div>
    <div class="mx-auto md:mr-0 max-w-sm md:w-1/2 aspect-square">
      <div class="relative h-1/2 overflow-hidden">
        <div class="absolute z-30 top-2/3 right-[calc(50%-30px)]">
          <span class="text-xl text-black">
            {{ currentFreq?.value.toFixed() }} Hz</span
          >
        </div>
        <div
          class="absolute z-20 w-full top-1/2 bottom-0 bg-gradient-to-t from-green-1000"
        ></div>
        <div class="relative w-full aspect-square">
          <div
            v-for="(note, index) in noteScale"
            :key="index"
            class="absolute z-10 top-[calc(50%-20px)] w-full h-10 ml-1/2 flex justify-end will-change-transform transition duration-500"
            :style="{
              transform:
                'rotate(' +
                ((360 / noteScale.length) * index - circleRotation) +
                'deg)',
            }"
          >
            <div
              class="h-14 w-14 will-change-transform transition duration-500"
              :style="{
                transform:
                  'rotate(' +
                  ((360 / noteScale.length) * -index + circleRotation) +
                  'deg)',
              }"
            >
              <span
                class="w-full h-full flex justify-center items-center text-2xl border-2 border-green-3000 rounded-full"
                >{{ noteScale[index] }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentFreq: this.$Analyser?.loudestFreq,
      noteScale: [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "H",
      ],
    };
  },
  computed: {
    circleRotation() {
      let rotation = 0;
      if (this.currentFreq?.value) {
        let key = 12 * Math.log2(this.currentFreq.value / 440); // + 49 ;
        rotation = (key / 12) * 360;
      }
      return rotation;
    },
  },
  mounted() {
    this.$store.commit("setCurrentMode", "tuner");
  },
};
</script>

<style></style>
