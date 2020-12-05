<template>
  <div>
    <el-dialog
      title="Tips"
      :visible.sync="$store.state.newCourse.editUnitDialog"
      width="30%"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    openDialog() {
      this.$store.commit('newCourse/SET_DIALOG_TRIGGER', {name: 'editUnitDialog', value: true})
    },
    handleClose(done) {
      this.$confirm("Are you sure to close this dialog?")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>