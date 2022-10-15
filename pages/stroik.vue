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
    </div>
    <div>
      <HeaderTitle title="Stroik" />
      <div class="mx-auto relative w-full md:w-1/2 aspect-square">
        <div class="absolute top-1/2 left-1/2 z-0">
          <span class="text-xl text-black">
            {{ currentFreq?.value.toFixed() }} Hz</span
          >
        </div>
        <div
          v-for="(note, index) in noteScale"
          :key="index"
          class="absolute z-10 top-1/2 w-full h-10 ml-1/2 flex justify-end transition duration-300"
          :style="{
            transform: 'rotate(' + (360 / noteScale.length) * index + 'deg)',
          }"
        >
          <div
            class="h-14 w-14 transition duration-300"
            :style="{
              transform: 'rotate(' + (360 / noteScale.length) * -index + 'deg)',
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
  mounted() {
    this.$store.commit("setCurrentMode", "tuner");
  },
};
</script>

<style></style>
