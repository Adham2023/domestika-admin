<template>
  <el-dialog
    :title="'Course: ' + $store.state.video.Title"
    :visible.sync="$store.state.video.videoPreviewDialog"
    width="50%"
    :destroy-on-close="false"
    @close="close"
    @opened="opened"
  >
    <div id="embedBox" ref="videoBox" style="width:1280px; max-width:100%;height:400px;" />
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="close()">Close</el-button> -->
    </span>
  </el-dialog>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      video: null
    }
  },
  beforeDestroy() {
    console.log('preview dialog being destriyed!')
  },
  methods: {
    close() {
      this.$store.commit('video/SET_DIALOG', false)
      var videos = vdo.getObjects()
      var video = videos[videos.length - 1]
      video.pause()
    },
    opened() {
      // console.dir(window);
      vdo.add({
        otp: this.$store.state.video.otp,
        playbackInfo: this.$store.state.video.playbackInfo,
        theme: '9ae8bbe8dd964ddc9bdb932cca1cb59a',
        container: document.querySelector('#embedBox')
      })
    //   this.video = new VdoPlayer({
    //     otp: this.$store.state.video.otp,
    //     playbackInfo: this.$store.state.video.playbackInfo,
    //     theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
    //     // the container can be any DOM element on website
    //     container: document.querySelector( "#embedBox" ),
    //   });
    //   this.video.addEventListener(`load`, () => {
    //   // this.video.play(); // this will auto-start the video
    //   this.video.getObjects();
    //   console.log('loaded');
    // });
    }
  }
}
</script>
