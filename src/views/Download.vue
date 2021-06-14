<template>
  <div class="display-container">
    <router-link to="/">
      <img src="../assets/svg/home-icon.svg" alt="home icon" />
    </router-link>
    
    <div class="display-area">
      <img :src="img" alt="" id="download__uploadedImg" />
      <div id="saved-texts">
        <div v-html="formatLyrics" id="formattedLyrics"></div>
        <p id="artist">- {{ artist }} ({{ song }})</p>
      </div>
      <div id="outro" v-if="!downloaded">
      <h1>Your image is ready 😜</h1>
      <p>
        Click the download button to download or click home to upload a new
        image.
      </p>
    </div>
    <div id="finished" v-if="downloaded">
      <div id="finished_circle">
        <span>&#10004;</span>
      </div>
      <p>Downloaded, <router-link to="/">Upload new image</router-link></p>
    </div>
    </div>
    <!-- display-area-->
    <div class="buttons" v-if="!downloaded">
      <router-link to="/form">Edit lyrics</router-link>
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
      song: "",
      formattedLyrics: "",
      downloaded: false,
    };
  },
  mounted() {
    if(!this.$store.getters.getImg){
      alert('You need to upload an image to continue')
      this.$router.push('/')
    }
    if(!this.$store.getters.getLyrics){
      alert('You need to insert lyrics to continue')
      this.$router.push('/form')
    }
    if(!this.$store.getters.getArtist){
      alert('You need to insert artist name to continue')
      this.$router.push('/form')
    }
    if(!this.$store.getters.getSong){
      alert('You need to insert song name to continue')
      this.$router.push('/form')
    }
    
    this.img = this.$store.getters.getImg;
    this.lyrics = this.$store.getters.getLyrics;
    this.artist = this.$store.getters.getArtist;
    this.song = this.$store.getters.getSong;
    this.downloaded = false;
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
      formatted = `<p class = 'quotes'>&OpenCurlyDoubleQuote;</p> <br /> ${formatted} <p class = 'quotes'>&CloseCurlyDoubleQuote;</p>`;
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
      displayAreaCopy.lastChild.remove();
      displayAreaCopy.lastChild.remove();
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
          let imgName = _self.$store.getters.getImgName;
          _self.downloadImage(dataSrc, imgName);
          displayAreaCopy.remove();
          canvas.remove();
        }).then(function(){
          _self.downloaded = true;
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
.quotes {
  font-weight: bolder;
  font-size: larger;
}
#download_link {
  display: none;
}
#finished{
  a{
    text-decoration: none;
  }
  #finished_circle{
    user-select: none;
  border-radius: 50%;
  border: 2px solid rgb(120, 82, 255);
  height: 150px;
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  span{
    font-size: 90px;
    color: rgb(56, 14, 207);
  }
}
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
  #download__uploadedImg {
    object-fit: contain;
    display: none;
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