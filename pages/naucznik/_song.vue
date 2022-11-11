<template>
  <div>
    <div class="relative h-screen">
      <div
        class="relative z-10 bg-gradient-to-b from-green-1000 via-green-1000/90"
      >
        <nuxt-link
          class="group block w-full h-full pt-10 transition duration-200"
          :class="{ '-translate-y-full': play }"
          to="/naucznik"
        >
          <span
            class="font-main text-xl md:text-2xl transition duration-300 hover:text-green-3000"
          >
            〈 Back
          </span>
        </nuxt-link>
        <div
          class="flex justify-between items-center mb-5 transition duration-200"
        >
          <HeaderTitle
            class="capitalize transition duration-200"
            :class="{ 'opacity-0 -translate-y-10 pointer-events-none': play }"
            :title="this.$route.params.song.replaceAll('-', ' ')"
          />
          <div class="py-5 pr-5">
            <button
              class="h-14 w-14 flex flex-col justify-end items-center group bg-green-1000 rounded-full border-2 border-green-2000 hover:border-green-3000 hover:text-green-3000 transition duration-200 overflow-hidden"
              @click="togglePlay()"
            >
              <div
                class="shrink-0 grow-0 basis-full w-full flex-0 flex transition duration-[400ms] justify-center items-center"
                :class="{ 'translate-y-full': play }"
              >
                <span
                  class="w-6 h-6 bg-black group-hover:bg-green-3000 inline-block transition duration-200"
                ></span>
              </div>
              <div
                class="shrink-0 grow-0 basis-full w-full flex-0 flex transition duration-[400ms] items-center"
                :class="{ 'translate-y-full': play }"
              >
                <span
                  class="w-0 h-0 border-[15px] border-transparent border-l-black group-hover:border-l-green-3000 inline-block translate-x-5 scale-y-75 transition duration-200"
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="absolute inset-0 z-0 flex flex-col overflow-y-hidden">
        <div
          class="grow-0 shrink-0 basis-[calc(100%_-_70px)] xl:basis-[calc(100%_-_200px)] h-full"
        ><div class="h-full flex"
        :style="{transform: `translateY(${currTime * midiNotes?.notes?.[1].data[2] * 3 - 100}px)`}"
        :class="{' transition duration-200':currTime == 0}"
        >
          <div
            class=" basis-auto flex-grow shrink-0 h-full"
            v-for="(noteName, noteIndex) in noteScale"
            :key="noteIndex"
          >
            <div
              class="relative h-full"
            >
              <template v-for="(note, index) in midiNotes?.notes">
                <div
                  class="bg-green-3000 absolute left-0 right-0 rounded-sm"
                  :style="{
                    'padding-top':
                      midiNotes?.timestamps[index + 2] -
                      midiNotes?.timestamps[index] +
                      'px',
                    bottom: midiNotes?.timestamps[index] + 'px',
                  }"
                  v-if="
                    note.data &&
                    index > 2 &&
                    note.data[0] - 50 == noteIndex &&
                    note.type == 9
                  "
                  :key="index"
                >
                </div>
              </template>
            </div>
          </div>
        </div>
        </div>
        <div class="relative z-20 basis-full shrink-0 grow-0 flex">
          <div
          v-for="(noteName, noteIndex) in noteScale"
          :key="noteIndex"
            class="note basis-auto flex-grow shrink-0 h-full border-0 border-r border-black/50 text-[0px] 2xl:text-[10px] text-center translate-y-0 transition duration-500"
              :class="[noteName.includes('#') ? 'bg-black/80' : 'bg-white/80' ]"
              :style="{'transition-delay': `${noteIndex * 20}ms`}"
          >            
          {{noteName}}
          </div>
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
      pageMounted: false,
      play: false,
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
      if (this.$LearnTrack?.parsedMidi) {
        let rawNotes = this.$LearnTrack.parsedMidi.track?.[0].event;
        let timestampsArray = [];
        if (rawNotes) {
          for (let i = 0; i < rawNotes.length; i++) {
            let prevTimestamp = 0;
            if (i > 0) {
              prevTimestamp = timestampsArray[i - 1];
            }
            timestampsArray.push(rawNotes[i].deltaTime + prevTimestamp);
          }
        }
        return { notes: rawNotes, timestamps: timestampsArray };
      }
    },
    currTime() {
      return this.$LearnTrack?.currentTime;
    },
  },
  methods: {
    togglePlay() {
      this.play = !this.play;
      if (this.play) {
        this.$LearnTrack?.play();
      } else {
        this.$LearnTrack?.stop();
      }
    },
  },
  
  mounted() {
    this.$store.commit("setCurrentMode", "track");
  },

};
</script>

<style >
.page-leave-active .note {
  @apply duration-200 !delay-[0ms];
}
.page-enter .note,
.page-leave-to .note{
  @apply translate-y-full;
}</style>
