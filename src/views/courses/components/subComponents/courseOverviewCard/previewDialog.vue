<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width=""
    align="left"
    :before-close="handleClose"
  >

    <template slot="title">
      <span style="color: gray">Course title: </span> {{ !!dataToSend.courseObject ? dataToSend.courseObject.courseTitle : '' }}
    </template>
    <video
      ref="videoFilePreview"
      width="100%"
      controls
      :src="!!dataToSend.courseObject ? dataToSend.courseObject.localPlayUrl : '' + ''"
      type="video/quicktime"
      style="height: 100%"
    >
      <source :src="!!dataToSend.courseObject ? dataToSend.courseObject.localPlayUrl : ''+ ''" type="video/quicktime">
      Your browser does not support HTML5 video.
    </video>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapState('newCourse', ['dataToSend'])
  },
  methods: {
    toggleDialog(flag) {
      this.dialogVisible = flag
    },
    handleClose(done) {
      this.$refs.videoFilePreview.pause()
      this.$refs.videoFilePreview.currentTime = 0
      done()
    }
  }
}
</script>

<style>

</style>
