const state = {
  image: "",
  artist: "",
  lyrics: "",
  imgName: "",
};
const mutations = {
  setImg: function(state, imgString) {
    state.image = imgString;
  },
  setImgName: function(state, imgName) {
    state.imgName = imgName;
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
  getImgName: function(state) {
    return state.imgName;
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
