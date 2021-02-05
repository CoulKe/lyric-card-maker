<template>
  <div class="display-container">
    <router-link to="/">
      <img src="../assets/svg/home-icon.svg" alt="home icon" />
    </router-link>
    <div class="display-area">
      <img :src="img" alt="" id="uploadedImage" />
      <div id="saved-text">
        <p>{{ lyrics }}</p>
        <p>By {{ artist }}</p>
      </div>
    </div>
    <!-- display-area-->
    <div class="buttons">
      <router-link to="/form">Edit</router-link>
      <a href="" id="download_link"></a>
      <button @click="makeImg">Download</button>
    </div>
  </div>
  <Canvas :width="250" :height="500" />
</template>

<script>
import Canvas from "../components/Canvas";
export default {
  components:{
    Canvas
  },
  data() {
    return {
      img: "",
      lyrics: "",
      artist: "",
    };
  },
  mounted() {
    this.img = this.$store.getters.getImg;
    this.lyrics = this.$store.getters.getLyrics;
    this.artist = this.$store.getters.getArtist;
  },
  methods:{
    makeImg() {
      let myCanvas = document.querySelector("canvas");
      let image = document.querySelector("#uploadedImage");
      let ctx = ""; //context
      let realHeight="";
      let realWidth="";

      //real image dimensions
      realWidth = image.naturalWidth;
      realHeight = image.naturalHeight;

      //canvas dimensions
      myCanvas.setAttribute("width", realWidth);
      myCanvas.setAttribute("height", realHeight);
      
      //Draw image
      ctx = myCanvas.getContext("2d");
      ctx.drawImage(image, 0, 0, realWidth, realHeight);
      let dataSrc = myCanvas.toDataURL("image/png");
      let name = image.alt;
      this.downloadImage(dataSrc, name);
    },
    downloadImage(dataSrc, filename = "untitled.jpeg") {
      let a = document.querySelector("#download_link");
      a.href = dataSrc;
      a.download = filename;
      a.click();
    },
  }
};
</script>

<style lang='scss' scoped>
.display-container {
  width: max-content;
  img {
    &:hover {
      cursor: pointer;
    }
  }
}
.display-area {
  
  #uploadedImage {
    object-fit: contain;
    width: 250px;
    height: 400px;
    border-radius: 4px;
    position: relative;
  }
  #saved-text{
    position: absolute;
    padding: 0.8rem;
    p{
      color: #000;
      background-color: #fff;
    }
  }
}
</style>