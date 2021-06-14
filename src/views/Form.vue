<template>
  <div class="display-container">
    <router-link to="/">
      <img src="../assets/svg/home-icon.svg" alt="home icon" />
    </router-link>
    <div class="display-area">
      <form>
          <label for="artist">Artist: </label>
          <input type="text" id="artist" v-model.lazy="artist">
          <label for="song">Song name: </label>
          <input type="text" id="song" v-model.lazy="song">
          <label for="lyrics">Lyrics: </label>
          <textarea id="lyrics" cols="30" rows="10" v-model.lazy="lyrics"></textarea>
      </form>
    </div> <!-- display-area-->
    <div class="buttons">
      <router-link to="/">Change image</router-link>
      <button @click="confirmFields($event)">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      artist: '',
      song: '',
      lyrics: '',
    }
  },
  methods:{
    back(){
      history.back();
    },
    confirmFields($event){
      if (this.artist.trim() === "" && this.lyrics.trim() === "") {
        $event.preventDefault();
        alert('Fill all fields')
      }
      else if(this.artist.trim() === "" || this.lyrics.trim() === ""){
        $event.preventDefault();
        alert('Fill all fields')
      }
      else{
        this.$router.push('/download')
      }
    }
  },
  mounted(){
    if(!this.$store.getters.getImg){
      alert('You need to upload an image to continue')
      this.$router.push('/')
    }
      this.artist = this.$store.getters.getArtist
      this.song = this.$store.getters.getSong
      this.lyrics = this.$store.getters.getLyrics
  },
  watch: {
    artist: function() {
      this.$store.commit('setArtist', this.artist)
    },
    song: function() {
      this.$store.commit('setSong', this.song)
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
        display: flex;
        flex-direction: column;
        align-items: center;
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