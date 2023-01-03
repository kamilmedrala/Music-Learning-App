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
    <div class="flex flex-col-reverse md:flex-row justify-center items-center md:justify-between">
      <div class="self-baseline -mt-10 md:mt-5 mx-auto lg:mx-0">
        <p class="font-body">Played keys:</p>
        <ul class="flex">
          <li v-for="(note,index) in noteScale" :key="index" class="block mt-8 md:mt-12 relative" 
          >
          <div class="mr-2 md:mr-4"
          :class="{'absolute bottom-8 md:bottom-11 mr-0 -ml-5 md:-ml-7':note.includes('#')}"
          >
            <div class="w-8 h-8 md:w-10 md:h-10 flex justify-center items-center border rounded-full"
            :class="[findMatching(note)? 'opacity-100 border-green-3000': 'opacity-50 border-gray-600']">
              <div class="relative text-xs md:text-base translate duration-200"
              :class="{'-translate-x-1':findMatching(note)}">
                {{note}}
                <span class="absolute right-0 -bottom-1 text-sm transition duration-200"
                :class="[findMatching(note)? 'translate-x-2 opacity-100': 'opacity-0']">{{findMatching(note)}}</span>
              </div>
            </div>
          </div>
          </li>
        </ul>        
      </div>
      <div class="mx-auto w-full md:mr-0 max-w-sm md:w-1/2 aspect-square">
        <div class="relative h-1/2 overflow-hidden">
          <div class="absolute z-30 top-2/3 right-[calc(50%-40px)]">
            <span class="text-xl text-black">
              {{ Math.round( currentFreq?.value * 10) / 10 }} Hz</span
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
      return this.currentFreq?.keyId ? ((this.currentFreq.keyId - 9 )/12) * 360 :0;
    },
    playedKeys(){
      return this.$Analyser?.loudestArray
    }

  },
  mounted() {
    this.$store.commit("setCurrentMode", "tuner");
  },
  methods:{
    findMatching(note){
      const playedKeys = this.playedKeys
      if (!playedKeys) {
        return false
      }
      for (let i = 0; i < playedKeys.length; i++) {
        let key = playedKeys[i].key.slice(0,-1)
        if (key === note) {
          return playedKeys[i].key.slice(-1)
        }        
      }
    }
  }
};
</script>