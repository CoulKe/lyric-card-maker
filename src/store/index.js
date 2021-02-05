import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import lyrics from "./modules/lyrics";

const store = createStore({
  modules: {
    lyrics,
  },
  plugins: [createPersistedState()],
});

export default store;
