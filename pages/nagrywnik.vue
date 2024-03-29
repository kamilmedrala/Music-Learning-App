<template>
    <div>
      <div class="relative h-screen flex flex-col">
        <div
          class="relative z-10 bg-gradient-to-b from-green-1000 via-green-1000/90"
        >
          <nuxt-link
            class="group block w-full pt-10 transition duration-200"
            to="/start"
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
          <div
          class="capitalize transition duration-200"
          >
            <HeaderTitle
              :title="'Nagrywnik'"
            />
          </div>
          <div class="flex items-center">
            <button v-show="!isRecording && recordedNotes.length>0" class="flex justify-center items-center group bg-green-1000 rounded-full px-3 py-2 pb-1 mr-5 border-2 border-green-2000 hover:border-green-3000 transition duration-200 overflow-hidden"
            @click="downloadMidi()">
              DOWNLOAD
            </button>

            <button v-show="!isRecording && recordedNotes.length>0" class="flex justify-center items-center group bg-green-1000 rounded-full px-3 py-2 pb-1 mr-5 border-2 border-green-2000 hover:border-green-3000 transition duration-200 overflow-hidden"
            @click="clearNotes()">
              CLEAR
            </button>

            <button class="h-14 w-14 flex flex-col justify-center items-center group bg-green-1000 rounded-full border-2 border-red-300 hover:border-red-500 transition duration-200 overflow-hidden"
            @click="toggleRecord()">
              <span class="h-6 w-6  group-hover:bg-red-700 transition-all duration-300"
              :class="[isRecording? 'bg-red-600 rounded-sm animate-pulse':'bg-red-400 rounded-3xl full']"></span>
            </button>
          </div>
          </div>
        </div>
        <div
        ref="pianoRoll" 
        class="overflow-y-auto">
            <div class="relative z-20 basis-[50px] xl:basis-[70px] shrink-0 grow-0 flex flex-col">
              <div 
               class="left-[76px] absolute z-30 w-px h-full bg-brown-2000 "
              :style="{transform: `translateX(${currTime}px)`}"
              ></div>
              <div
              v-for="(noteName, noteIndex) in noteScale.slice().reverse()"
              :key="noteIndex"
              class="relative flex w-max border-0 border-t border-black/5 "
              :class="[noteName.includes('#') ? 'bg-green-3000/10' : 'bg-green-3000/5']"
              >     
                <div class="sticky left-0 z-40 flex w-min shrink-0">
                    <span class="flex items-center h-4 xl:h-5 w-7 text-[10px] bg-green-1000 ">
                        {{noteName}}
                    </span>       
                    <div  
                    class="note h-4 xl:h-5 w-12 border-y-0 border-x border-black/20 before:absolute before:inset-0 before:z-20 before:transition before:duration-100  translate-y-0 transition duration-500"
                        :class="[noteName.includes('#') ? 'bg-black/80' : 'bg-white' ,
                        {'before:bg-green-3000/50':currentKey == Math.abs(noteIndex-47) + 24}]"
                        :style="{'transition-delay': `${noteIndex * 20}ms`}"
                    >
                    </div>
                </div>
                <div class="relative w-[3200px] note-track shrink-0">
                  <template v-for="note,index in recordedNotes">
                    <div v-if="note.keyId == Math.abs(noteIndex-47) + 24" :key="index"
                    class="absolute top-0 h-4 xl:h-5 bg-green-3000"
                    :style="{
                      width: note.duration == 0 ? currTime - note.startTime + 'px' : note.duration + 'px',
                      left: note.startTime + 'px'
                  }"
                    
                    >
                </div>
                  </template>
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
            "C2",
          "C#2",
          "D2",
          "D#2",
          "E2",
          "F2",
          "F#2",
          "G2",
          "G#2",
          "A2",
          "A#2",
          "H2",
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
    watch:{
      currentKey(key){
        if (this.isRecording) {
          this.$Recorder.addNote(key)
        }
      }
    },
    computed:{
        currentKey(){
            if (this.currentFreq?.vol > 200) {
                return this.currentFreq.keyId
            }
            else{
                return -1
            }
        },

        isRecording(){
          return this.$Recorder?.isRunning
        },

        currTime() {
          if (this.$Recorder && this.$refs['pianoRoll']) {
            this.$refs['pianoRoll'].scrollLeft = this.$Recorder.currentTime - this.$refs['pianoRoll'].clientWidth/2
          }
          return this.$Recorder?.currentTime;
        },

        recordedNotes(){
          if (this.$Recorder) {
            return this.$Recorder?.notes
          }
          else{
            return []
          }
        }

    },
    mounted() {
      this.$store.commit("setCurrentMode", "recorder");
    },
    methods:{
      toggleRecord(){
        if (!this.$Recorder?.isRunning) {
          this.$Recorder?.start();
          this.$Recorder?.clearNotes();
        } else {
          this.$Recorder?.stop();
        }
      },

      clearNotes(){
        this.$Recorder?.clearNotes();
      },

      downloadMidi(){
        this.$Recorder?.generateMidi()
      }
    }
  
  };
  </script>
  
  <style scoped> 
  .page-leave-active .note {
    @apply duration-150 !delay-[0ms];
  }
  .page-enter .note,
  .page-leave-to .note{
    @apply opacity-0 -translate-x-full;
  }
  
  .note-track{
    background: repeating-linear-gradient(0.25turn,transparent , transparent 199px, rgba(0, 0, 0, 0.2) 199px, rgba(0, 0, 0, 0.2) 200px)
  }

  </style>
  