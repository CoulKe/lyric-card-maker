// Filters with their default values
const state = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  hue: 0,
  invert: 0,
  saturate: 100,
  sepia: 0,
};

const mutations = {
  setBlur: function(state, blurValue) {
    state.blur = blurValue;
  },
  setBrightness: function(state, brightnessValue) {
    state.brightness = brightnessValue;
  },
  setContrast: function(state, contrastValue) {
    state.contrast = contrastValue;
  },
  setGrayscale: function(state, grayscaleValue) {
    state.grayscale = grayscaleValue;
  },
  setHue: function(state, hueValue) {
    state.hue = hueValue;
  },
  setInvert: function(state, invertValue) {
    state.invert = invertValue;
  },
  setSaturate: function(state, saturateValue) {
    state.saturate = saturateValue;
  },
  setSepia: function(state, sepiaValue) {
    state.sepia = sepiaValue;
  },
};

const getters = {
  getBlur: function(state) {
    return state.blur;
  },
  getBrightness: function(state) {
    return state.brightness;
  },
  getContrast: function(state) {
    return state.contrast;
  },
  getGrayscale: function(state) {
    return state.grayscale;
  },
  getHue: function(state) {
    return state.hue;
  },
  getInvert: function(state) {
    return state.invert;
  },
  getSaturate: function(state) {
    return state.saturate;
  },
  getSepia: function(state) {
    return state.sepia;
  },
};

export default {
  state,
  mutations,
  getters,
};
