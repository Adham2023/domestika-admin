<template>
  <el-dialog
    title="Vide 001"
    :visible.sync="$store.state.video.videoPreviewDialog"
    width="50%"
    :destroy-on-close="true"
  >
    <iFrame />
    <span slot="footer" class="dialog-footer">
      <el-button @click="close()">Close</el-button>
    </span>
  </el-dialog>
</template>

<script>
import iFrame from './iFrame'
export default {
  components: {
    iFrame
  },
  data() {
    return {
    }
  },
  beforeDestroy() {
    console.log('preview dialog being destriyed!')
  },
  methods: {
    close() {
      this.$store.commit('video/SET_DIALOG', false)
    }
  }
}
</script>
