<template>
  <div>
    <div class="relative h-screen">
      <div
        class="relative z-10 bg-gradient-to-b from-green-1000 via-green-1000/90"
      >
        <nuxt-link
          class="group block w-full h-full pt-10 transition duration-200"
          :class="{ '-translate-y-full': isRunning }"
          to="/naucznik"
        >
          <span
            class="font-main text-xl md:text-2xl transition duration-300 hover:text-green-3000"
          >
            〈 Back
          </span>
        </nuxt-link>
        <div
          class="flex justify-between mb-5 transition duration-200"
        >
          <HeaderTitle
            class="capitalize transition duration-200"
            :class="{ 'opacity-0 -translate-y-10 pointer-events-none': isRunning }"
            :title="this.$route.params.song.replaceAll('-', ' ')"
          />
          <div class="py-5 pr-5 flex flex-col items-center">
            <button
              class="h-14 w-14 flex flex-col justify-end items-center group bg-green-1000 rounded-full border-2 border-green-2000 hover:border-green-3000 hover:text-green-3000 transition duration-200 overflow-hidden"
              @click="togglePlay()"
            >
              <div
                class="shrink-0 grow-0 basis-full w-full flex-0 flex transition duration-[400ms] justify-center items-center"
                :class="{ 'translate-y-full': isRunning }"
              >
                <span
                  class="w-6 h-6 bg-black group-hover:bg-green-3000 inline-block transition duration-200"
                ></span>
              </div>
              <div
                class="shrink-0 grow-0 basis-full w-full flex-0 flex transition duration-[400ms] items-center"
                :class="{ 'translate-y-full': isRunning }"
              >
                <span
                  class="w-0 h-0 border-[15px] border-transparent border-l-black group-hover:border-l-green-3000 inline-block translate-x-5 scale-y-75 transition duration-200"
                ></span>
              </div>
            </button>
            <div class="relative h-28 md:h-32 mt-4 w-12 flex justify-center transition duration-200"
            :class="{'translate-x-5 opacity-0':isRunning}">
              <input class="peer h-1.5 w-28 md:w-32 translate-y-14 md:translate-y-16 -rotate-90"  type="range" name="trackSpeed" id="trackSpeed" min="0.5" max="1" step="0.25" v-model="trackSpeed">
              <span class="absolute h-10 flex justify-center items-center left-full transition-all duration-200 text-base peer-hover:text-xl peer-hover:font-medium"
              :style="{'bottom':`calc(${trackSpeed*100}% - 52px)`}"
              >x{{trackSpeed}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute inset-0 z-0 flex flex-col overflow-y-hidden">
        <div
          class="grow-0 shrink-0 basis-[calc(100%_-_70px)] xl:basis-[calc(100%_-_200px)]  overflow-hidden"
        ><div class="h-full flex"
        :style="{transform: `translateY(${currTime * midiNotes?.notes?.[1].data[2] * 5 * trackSpeed}px)`}"
        :class="{' transition duration-200':currTime == 0}"
        >
          <div
            class=" self-end basis-auto flex-grow shrink-0"
            v-for="(noteName, noteIndex) in noteScale"
            :key="noteIndex"
            :style="{'height':  trackLength + 'px'}"
            :class="{'border-l border-solid border-black/10':noteName[0]=='C' && !isNaN(noteName[1])}"
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
                    bottom: midiNotes?.timestamps[index] + 200 + 'px',
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
        <div class="relative z-20 basis-[70px] xl:basis-[200px] shrink-0 grow-0 flex">
          <div
          v-for="(noteName, noteIndex) in noteScale"
          :key="noteIndex"
            class="note basis-auto flex-grow shrink-0 h-full border-0 border-r border-black/50 relative before:absolute before:inset-0 before:z-20 before:transition before:duration-100  translate-y-0 transition duration-500"
              :class="[noteName.includes('#') ? 'bg-black/80' : 'bg-white/80' ,
            {'before:bg-green-3000/50':currentKey == noteIndex}]"
              :style="{'transition-delay': `${noteIndex * 20}ms`}"
          >     
          <span class="flex justify-center relative z-30 text-[0px] 2xl:text-[8px] ">
            {{noteName}}
          </span>       
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
      trackSpeed: 0.75,
      currentFreq: this.$Analyser?.loudestFreq,
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
    currentKey(){
      return this.currentFreq?.keyId ? this.currentFreq.keyId-36 : 0
    },
    midiNotes() {
      return this.$LearnTrack?.parsedMidi
    },
    currTime() {
      return this.$LearnTrack?.currentTime;
    },
    trackLength(){
      return this.$LearnTrack?.trackLength;
    },
    isRunning(){
      return this.$LearnTrack?.isRunning;
    }
  },
  methods: {
    togglePlay() {
      if (!this.$LearnTrack?.isRunning) {
        this.$LearnTrack.setTimeConstant(this.trackSpeed)
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
