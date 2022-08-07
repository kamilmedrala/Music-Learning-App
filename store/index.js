export const state = () => ({
  settings: {
    input: null,
    output: null,
  },
});

export const getters = {
  getSettings(state) {
    return state.settings;
  },
};

export const mutations = {
  initialiseStore(state) {
    // Check if the ID exists
    if (localStorage.getItem("store")) {
      console.log(localStorage);
      // Replace the state object with the stored item
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem("store")))
      );
    }
  },
  setSettings(state, { type, data }) {
    state.settings[type] = data;
  },
};

export const actions = {};
