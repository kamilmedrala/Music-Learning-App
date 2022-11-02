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
      <HeaderTitle title="Naucznik" />
      <div class="w-full h-full flex flex-col overflow-x-scroll">
        <div class="h-full">
          <div class="flex gap-5">
            <div v-for="(noteName, index) in noteScale" :key="index">
              <div class="">
                {{ noteName }}
              </div>
            </div>
          </div>
        </div>
        <div class="h-[400px]">
          <!-- spacer for animation -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noteScale: [
        "C3",
        "C#3",
        "D3",
        "D#3",
        "E3",
        "F3",
        "F#3",
        "G3",
        "G#3",
        "A3",
        "A#3",
        "H3",
        "C4",
        "C#4",
        "D4",
        "D#4",
        "E4",
        "F4",
        "F#4",
        "G4",
        "G#4",
        "A4",
        "A#4",
        "H4",
        "C5",
        "C#5",
        "D5",
        "D#5",
        "E5",
        "F5",
        "F#5",
        "G5",
        "G#5",
        "A5",
        "A#5",
        "H5",
      ],
    };
  },
  computed: {
    midiNotes() {
      return this.$LearnTrack;
    },
  },
  mounted() {
    this.$store.commit("setCurrentMode", "none");
  },
};
</script>

<style></style>
