import Analyser from "../src/logic/analyser";
import Vue from "vue";

window.onNuxtReady((app) => {
  app.$store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem("store", JSON.stringify(state));
  });
  app.$store.commit("initialiseStore");
  if (app.$store) {
    // console.log(app);
  }
});

export default ({ app }, inject) => {
  inject("Analyser", new Analyser());
};
