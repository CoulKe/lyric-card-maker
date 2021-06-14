import { createStore } from "vuex";
import lyrics from "./modules/lyrics";
import filters from "./modules/filters";

const store = createStore({
  modules: {
    lyrics,
    filters,
  },
});

export default store;
