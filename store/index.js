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
  setSettings(state, { type, data }) {
    state.settings[type] = data;
  },
};

export const actions = {
  async fetchCounter(state) {
    // make request
    const res = { data: 10 };
    state.counter = res.data;
    return res.data;
  },
};
