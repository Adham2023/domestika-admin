<template>
  <div class="mainPart">
    <div class="chapter-and-unit">
      <span class="ch-title">{{current.chapterTitle}}</span> 
      <el-divider direction="vertical"></el-divider> 
      <span class="u-title">{{current.unitTitle}}</span>
    </div>
    <div
      id="videoBox"
      ref="videoBox"
      style=" max-width: 90%; height: 400px"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  beforeDestroy() {
    console.log('Before destroy main');
    this.ifPlayingPause();
  },
  computed: {
    ...mapState("video", ["current"]),
  },
  methods: {
    ...mapActions("video", ["getVideoCredentials"]),
    ifPlayingPause() {
      let videos = vdo.getObjects();
      if (videos.length > 0) {
        let video = videos[videos.length - 1];
        video.pause();
        video.currentTime = 0;
      }
    },
    playUnit() {
      this.ifPlayingPause();
      this.getVideoCredentials(this.current.videoId)
        .then(() => {
          vdo.add({
            otp: this.$store.state.video.otp,
            playbackInfo: this.$store.state.video.playbackInfo,
            theme: "013dbcec32f0460dbd9667febfa46158",
            container: document.querySelector("#videoBox"),
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');

  .mainPart {
    padding: 1rem;
  }
  #videoBox {
    aspect-ratio: 16 / 9;
  }


  .chapter-and-unit {
    margin-bottom: 1rem;
  }

  .ch-title {
    font-family: 'Nunito', sans-serif;
    color: rgb(6, 41, 97);
  }
  .u-title {
    font-family: 'Nunito', sans-serif;
    color: rgb(2, 49, 124);

  }
</style>
