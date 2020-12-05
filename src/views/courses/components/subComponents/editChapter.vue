<template>
  <el-dialog
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    title="Edit Chapter"
    width="40%"
    visible.sync="$store.state.newCourse.editChapterDialog"
    @open="setupDialogOptions"
  >
    <el-row>
      <el-form
        ref="editChapterFormRef"
        :model="editedChapterForm"
        :rules="rules"
      >
        <el-form-item>
          <el-col :span="24">
            <el-form-item prop="chapterTitle" label="Chapter title">
              <el-input
                v-model="editedChapterForm.chapterTitle"
                placeholder="Chapter title"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="24">
            <el-form-item prop="chapterDescription" label="Chapter description">
              <el-input
                v-model="editedChapterForm.chapterDescription"
                placeholder="Chapter description"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">Cancel</el-button>
      <el-button>Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      editedChapterForm: {
        chapterTitle: '',
        chapterDescription: ''
      },
      rules: {
        chapterTitle: [
          {
            required: true,
            trigger: 'change',
            message: 'Please enter title to for chapter'
          }
        ]
      }
    }
  },
  methods: {
    setupDialogOptions(a) {
      // this.
    },
    cancel() {
      this.$store.commit('newCourse/SET_DIALOG_TRIGGER', {
        name: 'editChapterDialog',
        value: false
      })
    }
  }
}
</script>

<style>
</style>
