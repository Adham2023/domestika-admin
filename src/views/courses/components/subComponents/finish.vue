<template>
  <el-dialog
    title="Finishing Up"
    :visible.sync="finishingDialog"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="40%"
    @open="opened"
  >
    <div class="finish-body">
      <span>Files to upload: {{ counOfAllFiles }}</span>
      <span>Uploaded files: {{ countOfSendedFiles }}</span>
      <div>
        <span>Uploading...</span>
        <p>{{ currentSendingFile }}</p>
        <el-progress :percentage="percentage" />
      </div>

    </div>
    <div slot="footer">
      <!-- <el-button @click="cancel()">Cancel</el-button> -->
      <el-button @click="done()">Done</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('newCourse', ['finishingDialog',
      'counOfAllFiles',
      'countOfSendedFiles',
      'fileUploadProgress',
      'currentSendingFile',
      'percentage'])
  },
  methods: {
    done() {
      this.$store.commit('newCourse/SET_FINISHING_DIALOG', false)
      this.$emit('resetAllW')
    },
    opened() {
      this.$store.dispatch('newCourse/sendOneByOne').then(res => {
        console.log('doneeeee')
        this.$store.dispatch('newCourse/uploadNewCourse').then(res => {
          this.done()
          this.$store.commit('newCourse/RESET_ALL_DATA_')
          this.$notify({
            message: res.data.message,
            type: 'success',
            duration: 3000
          })
        }).catch(err => {
          console.dir(err)
          this.$notify({
            message: 'Error',
            type: 'error',
            duration: 3000
          })
        })
      }).catch(err => {
        console.dir(err)
        this.$notify({
          message: 'Error',
          type: 'error',
          duration: 3000
        })
      })
    }
  }
}
</script>

<style>
    .finish-body {
        width: 100%;
        border: 1px solid green;
    }
</style>
