<template>
  <el-dialog
  :title="dataToSend.courseObject.courseTitle + ' > preview video' "
  :visible.sync="dialogVisible"
  width=""
  align="center"
  :before-close="handleClose"
  >
  <video
                ref="videoFilePreview"
                width="100%"
                controls
                :src="dataToSend.courseObject.localPlayUrl + ''"
                type="video/quicktime"
                style="height: 100%"
              >
                <source :src="dataToSend.courseObject.localPlayUrl + ''" type="video/quicktime">
                Your browser does not support HTML5 video.
              </video>
  <!-- <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
  </span> -->
</el-dialog>
</template>

<script>
import {mapState} from  'vuex';
export default {
    data() {return {
        dialogVisible: false
    }},
    computed: {
        ...mapState('newCourse', ['dataToSend'])
    },
    methods: {
        toggleDialog(flag) {
            alert('toggle')
            this.dialogVisible  = flag;
        },
        handleClose(done) {
            this.$refs.videoFilePreview.pause();
            this.$refs.videoFilePreview.currentTime = 0;
            done();
        }
    }
}
</script>

<style>

</style>