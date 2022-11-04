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
          <div class="flex h-full group">
            <div
              class="basis-[36px] shrink-0 h-full"
              v-for="(noteName, noteIndex) in noteScale"
              :key="noteIndex"
            >
              <div class="text-center">
                {{ noteName }}
              </div>
              <div class="relative h-[600px] ">
                <template v-for="(note, index) in midiNotes?.notes">
                  <!-- <div
                    class="bg-green-3000 absolute left-0 right-0"
                    :style="{
                      height:
                        (midiNotes?.notes[index].data[0] ==
                        midiNotes?.notes[index - 2].data[0]
                          ? midiNotes?.timestamps[index + 1] -
                            midiNotes?.timestamps[index - 1]
                          : 0) + 'px',
                      bottom: midiNotes?.timestamps[index] + 'px',
                    }"
                    v-if="
                      note.data && index > 2 && note.data[0] - 50 == noteIndex
                    "
                    :key="index"
                  > -->
                  <div
                    class="bg-green-3000 absolute left-0 right-0 odd:!pt-0 rounded-sm group-hover:translate-y-[4000px] transition duration-[15s] ease-linear"
                    :style="{
                      'padding-top':
                        
                        midiNotes?.timestamps[index+1] -
                          midiNotes?.timestamps[index - 1]
                          + 'px',
                      bottom: midiNotes?.timestamps[index] + 'px',
                    }"
                    v-if="
                      note.data && index > 2 && note.data[0] - 50 == noteIndex
                    "
                    :key="index"
                  >
                    <!-- {{ note.data[0] }} -->
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="h-[300px]">
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
      // let trackNotes = [];
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
      // return trackNotes;
    },
  },
  mounted() {
    this.$store.commit("setCurrentMode", "none");
  },
};
</script>

<style></style>
