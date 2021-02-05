<template>
  <div class="display-container">
    <router-link to="/">
      <img src="../assets/svg/home-icon.svg" alt="home icon" />
    </router-link>
    <div
      class="display-area"
      @click="clickInput"
      @dragover.prevent
      @drop.prevent="dropImage"
    >
      <img src="" alt="" id="uploadedImage" v-if="show" />
      <form>
        <input type="file" id="upload-field" hidden @change="uploadFile" />
      </form>
      <h1 v-if="!show">
        Drag photo here <br />
        or <br />
        click to upload
      </h1>
      <p v-if="!show">(max size: 4.5 mb)</p>
    </div>
    <!-- display-area-->
    <div class="buttons" v-if="show">
      <router-link to="/filters">Filters</router-link>
      <router-link to="/form">Next</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    clickInput() {
      let uploadField = document.querySelector("#upload-field");
      uploadField.click();
    },
    dropImage($event) {
      let uploadedFile = $event.dataTransfer.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      this.show = true;

      reader.onloadend = function () {
        let src = this.result;
        let imgElement = document.querySelector("#uploadedImage");
        imgElement.src = src;
        imgElement.alt = src;
      };
    },
    uploadFile() {
      const _self = this;
      let uploadField = document.querySelector("#upload-field");
      const uploadedFile = uploadField.files[0];

      if (uploadedFile) {
        if (uploadedFile.size > 4718592) {
          alert("Uploaded file is too large");
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(uploadedFile);
          this.show = true;

          reader.onloadend = function () {
            let src = this.result;
            let imgElement = document.querySelector("#uploadedImage");
            imgElement.src = src;
            imgElement.alt = src;
            _self.$store.commit("setImg", src);
          };
        }
      }
    },
  },
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
  h1 {
    font-size: 1.5rem;
  }
  &:hover {
    cursor: pointer;
  }
  #uploadedImage {
    object-fit: cover;
    width: 250px;
    height: 400px;
    border-radius: 4px;
  }
}
</style>