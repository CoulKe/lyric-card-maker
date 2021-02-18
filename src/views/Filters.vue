<template>
  <div class="display-container">
    <router-link to="/">
      <img src="../assets/svg/home-icon.svg" alt="home icon" />
    </router-link>
    <div class="display-area">
      <img
        :alt="imgName"
        id="uploadedImg"
        :style="{
          filter: `grayscale(${grayscale}%) blur(${blur}px)
             brightness(${brightness}%) contrast(${contrast}%) 
             hue-rotate(${hue}deg)
             invert(${invert}%) saturate(${saturate}%) sepia(${sepia}%)`,
        }"
        :src="img"
      />
      <div id="filters">
        <span id="leftArr" v-on:click="leftSlide">&lang;</span>
        <span id="rightArr" v-on:click="rightSlide">&rang;</span>
        <div class="filter">
          <h1>Blur</h1>
          <span>0</span>
          <input type="range" v-model="blur" min="0" max="200" id="blur" />
          <span>200</span>
        </div>
        <div class="filter">
          <h1>Brightness</h1>
          <span>0</span>
          <input
            type="range"
            min="0"
            max="200"
            v-model="brightness"
            id="brightness"
          />
          <span>200</span>
        </div>
        <div class="filter">
          <h1>Contrast</h1>
          <span>0</span>
          <input
            type="range"
            min="0"
            max="200"
            v-model="contrast"
            id="contrast"
          />
          <span>200</span>
        </div>

        <div class="filter">
          <h1>Grayscale</h1>
          <span>0</span>
          <input
            type="range"
            min="0"
            max="200"
            v-model="grayscale"
            id="grayscale"
          />
          <span>200</span>
        </div>
        <div class="filter">
          <h1>Hue-rotate</h1>
          <span>0</span>
          <input type="range" min="0" max="360" v-model="hue" id="hue" />
          <span>360</span>
        </div>
        <div class="filter">
          <h1>Invert</h1>
          <span>0</span>
          <input type="range" min="0" max="200" v-model="invert" id="invert" />
          <span>200</span>
        </div>
        <div class="filter">
          <h1>Saturate</h1>
          <span>0</span>
          <input
            type="range"
            min="0"
            max="200"
            v-model="saturate"
            id="saturate"
          />
          <span>200</span>
        </div>
        <div class="filter">
          <h1>Sepia</h1>
          <span>0</span>
          <input type="range" min="0" max="200" v-model="sepia" id="sepia" />
          <span>200</span>
        </div>
      </div>
    </div>
    <div class="buttons">
      <router-link to="/form">Edit lyrics</router-link>
      <a href="" id="download_link"></a>
      <button @click="applyFilters">Save filters</button>
    </div>
    <canvas id="hiddenCanvas"></canvas>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slide: 0,
      img: "",
      imgName: "",
      blur: "",
      brightness: "",
      contrast: "",
      grayscale: "",
      hue: "",
      invert: "",
      saturate: "",
      sepia: "",
    };
  },
  mounted() {
    this.img = this.$store.getters.getImg;
    this.imgName = this.$store.getters.getImgName;
    //filters
    this.blur = this.$store.getters.getBlur;
    this.brightness = this.$store.getters.getBrightness;
    this.contrast = this.$store.getters.getContrast;
    this.grayscale = this.$store.getters.getGrayscale;
    this.hue = this.$store.getters.getHue;
    this.invert = this.$store.getters.getInvert;
    this.saturate = this.$store.getters.getSaturate;
    this.sepia = this.$store.getters.getSepia;
  },
  methods: {
    applyFilters() {
      let hiddenCanvas = document.querySelector("#hiddenCanvas");
      let ctx = hiddenCanvas.getContext("2d");
      let image = document.querySelector("#uploadedImg");
      ctx.filter = `grayscale(${this.grayscale}%) blur(${this.blur}px)
             brightness(${this.brightness}%) contrast(${this.contrast}%) 
             hue-rotate(${this.hue}deg)
             invert(${this.invert}%) saturate(${this.saturate}%) sepia(${this.sepia}%)`;
      ctx.drawImage(image, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
      let imgUrl = hiddenCanvas.toDataURL("image/png");

      this.$store.commit("setImg", imgUrl);
      window.location.pathname = "form";
    },
    leftSlide() {
      let slideContents = document.querySelectorAll(".filter");
      if (this.slide === 0) {
        slideContents[this.slide].style = "display: none;";
        this.slide = slideContents.length - 1;
        slideContents[this.slide].style = "display: block;";
      } else {
        slideContents[this.slide].style = "display: none;";
        this.slide = this.slide - 1;
        slideContents[this.slide].style = "display: block;";
      }
    },
    rightSlide() {
      let slideContents = document.querySelectorAll(".filter");
      if (this.slide === slideContents.length - 1) {
        slideContents[this.slide].style = "display: none";
        this.slide = 0;
        slideContents[this.slide].style = "display: block";
      } else {
        slideContents[this.slide].style = "display: none";
        this.slide = this.slide + 1;
        slideContents[this.slide].style = "display: block";
      }
    },
  },
  watch: {
    blur: function () {
      this.$store.commit("setBlur", this.blur);
    },
    brightness: function () {
      this.$store.commit("setBrightness", this.brightness);
    },
    contrast: function () {
      this.$store.commit("setContrast", this.contrast);
    },
    grayscale: function () {
      this.$store.commit("setGrayscale", this.grayscale);
    },
    hue: function () {
      this.$store.commit("setHue", this.hue);
    },
    invert: function () {
      this.$store.commit("setInvert", this.invert);
    },
    saturate: function () {
      this.$store.commit("setSaturate", this.saturate);
    },
    sepia: function () {
      this.$store.commit("setSepia", this.sepia);
    },
  },
};
</script>
<style lang="scss" scoped>
#uploadedImg,
#filters {
  height: 50%;
  width: 100%;
  max-width: 100%;
}
#uploadedImg {
  object-fit: cover;
  display: block;
}
#hiddenCanvas {
  display: none;
  width: 500px;
  height: 650px;
}
#filters {
  display: flex;
  position: relative;
  overflow: hidden;

  .filter {
    width: 100%;
    min-width: 100%;
  }
}
#leftArr,
#rightArr {
  font-weight: bolder;
  font-size: 72px;
  position: absolute;
  z-index: 1000;
  top: 25%;
  cursor: pointer;
  user-select: none;
}
#leftArr {
  left: 0;
}
#rightArr {
  right: 0;
}
</style>