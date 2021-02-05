<template>
  <div class="display-container">
    <router-link to="/">
      <img src="../assets/svg/home-icon.svg" alt="home icon" />
    </router-link>
    <div class="display-area">
      <form>
          <label for="artist">Artist: </label>
          <input type="text" id="artist" v-model="artist">
          <label for="lyrics">Lyrics: </label>
          <textarea id="lyrics" cols="30" rows="10" v-model="lyrics"></textarea>
      </form>
    </div> <!-- display-area-->
    <div class="buttons">
      <router-link to="/">Back</router-link>
      <router-link to="/download" @click="confirmFields($event)">Next</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      artist: '',
      lyrics: '',
    }
  },
  methods:{
    confirmFields($event){
      if (this.artist.trim() === "" && this.lyrics.trim() === "") {
        $event.preventDefault();
        alert('Fill all fields')
      }
      else if(this.artist.trim() === "" || this.lyrics.trim() === ""){
        $event.preventDefault();
        alert('Fill all fields')
      }
    }
  },
  mounted(){
      this.artist = this.$store.getters.getArtist
      this.lyrics = this.$store.getters.getLyrics
  },
  watch: {
    artist: function() {
      this.$store.commit('setArtist', this.artist)
    },
    lyrics: function() {
      this.$store.commit('setLyrics', this.lyrics)
    },
  }
};
</script>
<style lang="scss">
.display-area{
    form{
        text-align: left;
        font-weight: bold;
        @include flexbox;
        @include flex-direction(column);
        @include align-items(center);
        label{
            width: 94%;
            line-height: 2rem;
        }
        input, textarea{
            margin: 0px 0px 4px 0px;
            padding: 4px;
            min-width: 90%;
            max-width: 90%;
        }
        textarea{
            min-height: 220px;
            max-height: 220px;
        }
    }
}
</style>