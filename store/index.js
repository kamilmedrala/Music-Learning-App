export const state = () => ({
  settings: {
    name: null,
    input: null,
    output: null,
    modalActive: false,
  },
  currentMode: "idle",
});

export const getters = {
  getSettings(state) {
    return state.settings;
  },

  getCurrentMode(state) {
    return state.currentMode;
  },
};

export const mutations = {
  initialiseStore(state) {
    // Check if the ID exists
    if (localStorage.getItem("storedSettings")) {
      // Replace the state object with the stored item
      this.replaceState(
        Object.assign(state, {
          settings: JSON.parse(localStorage.getItem("storedSettings")),
        })
      );
      if (state.settings?.input?.id) {
        this.$Analyser.startAnalyser(state.settings.input.id);
      }
      if (state.settings?.output?.id) {
        this.$Analyser.setOutput(state.settings.output.id);
      }
    } else {
      state.modalActive = true;
    }
  },
  setSettings(state, { type, data }) {
    state.settings[type] = data;
  },

  setCurrentMode(state, mode) {
    return (state.currentMode = mode);
  },
};

export const actions = {};
