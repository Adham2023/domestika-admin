<template>
  <div class="mainPart">
    <div class="chapter-and-unit">
      <span class="ch-title">{{ current.chapterTitle }}</span>
      <el-divider direction="vertical" />
      <span class="u-title">{{ current.unitTitle }}</span>
    </div>
    <div id="videoBox" ref="videoBox" style="max-width: 100%; height: 400px" />
    <div class="descriptions">
      <el-collapse>
        <el-collapse-item title="Unit: " name="1">
          <div>
            {{ current.unitDescription }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="Chapter: " name="2">
          <div>
            {{ current.chapterDescription }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('video', ['current'])
  },
  beforeDestroy() {
    console.log('Before destroy main')
    this.ifPlayingPause()
  },
  methods: {
    ...mapActions('video', ['getVideoCredentials']),
    ifPlayingPause() {
      const videos = vdo.getObjects()
      if (videos.length > 0) {
        const video = videos[videos.length - 1]
        video.pause()
        video.currentTime = 0
      }
    },
    playUnit() {
      this.ifPlayingPause()
      this.getVideoCredentials(this.current.videoId)
        .then(() => {
          vdo.add({
            otp: this.$store.state.video.otp,
            playbackInfo: this.$store.state.video.playbackInfo,
            theme: '013dbcec32f0460dbd9667febfa46158',
            container: document.querySelector('#videoBox')
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap");

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
  font-family: "Nunito", sans-serif;
  color: rgb(6, 41, 97);
}
.u-title {
  font-family: "Nunito", sans-serif;
  color: rgb(2, 49, 124);
}
</style>
