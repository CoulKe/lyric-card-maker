const state = {
  image: "",
  artist: "",
  lyrics: "",
};
const mutations = {
  setImg: function(state, imgString) {
    state.image = imgString;
  },
  setArtist: function(state, artistName) {
    state.artist = artistName;
  },
  setLyrics: function(state, lyrics) {
    state.lyrics = lyrics;
  },
};
const getters = {
  getImg: function(state) {
    return state.image;
  },
  getArtist: function(state) {
    return state.artist;
  },
  getLyrics: function(state) {
    return state.lyrics;
  },
};

export default {
  state,
  mutations,
  getters,
};
