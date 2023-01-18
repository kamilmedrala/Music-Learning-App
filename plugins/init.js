import Analyser from "../src/logic/Analyser";
import LearnTrack from "../src/logic/LearnTrack";
import Recorder from "../src/logic/Recorder";
import Vue from "vue";
import { reactive } from "vue";

window.onNuxtReady((app) => {
  app.$store.subscribe((mutation, state) => {
    if (mutation.type === 'setSettings') {
      localStorage.setItem("storedSettings", JSON.stringify(state.settings));
    }
  });
  app.$store.commit("initialiseStore");
});

export default ({ app }, inject) => {
  inject("Analyser", reactive(new Analyser()));
  inject("LearnTrack", reactive(new LearnTrack()));
  inject("Recorder", reactive(new Recorder()));
};
