import Analyser from "../src/logic/Analyser";
import LearnTrack from "../src/logic/LearnTrack";
import Vue from "vue";
import { reactive } from "vue";

window.onNuxtReady((app) => {
  app.$store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    if (mutation.type === 'setSettings') {
      localStorage.setItem("storedSettings", JSON.stringify(state.settings));
    }
  });
  app.$store.commit("initialiseStore");
  // if (app.$store) {
    // console.log(app);
  // }
});

export default ({ app }, inject) => {
  inject("Analyser", reactive(new Analyser()));
  inject("LearnTrack", reactive(new LearnTrack()));
};
