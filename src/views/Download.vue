<template>
  <div class="display-container">
    <router-link to="/">
      <img src="../assets/svg/home-icon.svg" alt="home icon" />
    </router-link>
    <div class="display-area">
      <img :src="img" alt="" id="uploadedImage" />
      <div id="saved-texts">
        <div v-html="formatLyrics" id="formattedLyrics"></div>
        <p id="artist">- {{ artist }}</p>
      </div>
    </div>
    <!-- display-area-->
    <div class="buttons">
      <router-link to="/form">Edit</router-link>
      <a href="" id="download_link"></a>
      <button @click="makeImg">Download</button>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      img: "",
      lyrics: "",
      artist: "",
      formattedLyrics: "",
    };
  },
  mounted() {
    this.img = this.$store.getters.getImg;
    this.lyrics = this.$store.getters.getLyrics;
    this.artist = this.$store.getters.getArtist;
  },
  computed: {
    formatLyrics: function () {
      let formatted = this.lyrics
        .split("\n")
        .map((line) => {
          if (line.length !== 0) {
            return `<p>${line}</p>`;
          }
        })
        .join("<br />");
    formatted =`<p class = 'quotes'>&OpenCurlyDoubleQuote;</p> <br /> ${formatted} <p class = 'quotes'>&CloseCurlyDoubleQuote;</p>`;
      return formatted;
    },
  },
  methods: {
    makeImg() {
      const _self = this;
      let displayArea = document.querySelector(".display-area");
      let displayAreaCopy = displayArea.cloneNode(true);
      displayAreaCopy.setAttribute("class", "screenshot");
      let imageCopy = displayAreaCopy.firstChild;
      let textCopy = imageCopy.nextSibling;
      imageCopy.setAttribute("id", "image-copy");
      textCopy.setAttribute("id", "text-copy");
      document.body.appendChild(displayAreaCopy);

      html2canvas(displayAreaCopy)
        .then(function (canvas) {
          document.body.appendChild(canvas);
        })
        .then(function () {
          let canvas = document.querySelector("canvas");
          let dataSrc = canvas.toDataURL("image/png");
          _self.downloadImage(dataSrc);
        });
    },
    downloadImage(dataSrc, filename = "untitled.jpeg") {
      let a = document.querySelector("#download_link");
      a.href = dataSrc;
      a.download = filename;
      a.click();
    },
  },
};
</script>

<style lang='scss'>
.quotes{
  font-weight: bolder;
  font-size: larger;
}
#download_link {
  display: none;
}
.display-container {
  width: max-content;
  img {
    &:hover {
      cursor: pointer;
    }
  }
}
.display-area {
  position: relative;
  #uploadedImage {
    object-fit: contain;
    width: 250px;
    height: 400px;
    border-radius: 4px;
  }
  #saved-texts {
    position: absolute;
    padding: 0.8rem;
    text-align: left;
    display: none;
    p {
      color: #000;
      background-color: #fff;
      word-break: break-word;
      display: inline;
      padding: 4px;
      line-height: 2rem;
    }
  }
}
.screenshot {
  position: relative;
  width: fit-content;
  height: fit-content;
  #image-copy {
    object-fit: cover;
    width: 500px;
    height: 650px;
  }
  #text-copy {
    position: absolute;
    padding: 0.8rem;
    display: inline-block;
    text-align: left;
    left: 0;
    bottom: 50px;
    font-size: larger;
    font-weight: 600;
    p {
      color: #000;
      background-color: #fff;
      word-break: break-word;
      display: inline;
      padding: 4px;
      line-height: 2rem;
    }
  }
}
</style>