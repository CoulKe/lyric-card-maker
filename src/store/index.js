import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import lyrics from "./modules/lyrics";
import filters from "./modules/filters";

const store = createStore({
  modules: {
    lyrics,
    filters,
  },
  plugins: [createPersistedState()],
});

export default store;
