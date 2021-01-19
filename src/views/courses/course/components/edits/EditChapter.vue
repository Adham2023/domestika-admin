<template>
  <el-dialog
    title="Edit course info"
    :visible.sync="editChapterDialog"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="600px"
    top="15px"
    align="center"
    @open="chapterEditOpened()"
    @close="chapterEditClose()"
  >
    <!-- Here can be changed preview video -->
    <el-form
      ref="chapterEditRef"
      :rules="editChapterRules"
      :model="chapterEditForm"
    >
      <el-form-item
        prop="chapterTitle"
        label="Course title"
      >
        <el-input v-model="chapterEditForm.chapterTitle" />
      </el-form-item>

      <el-form-item
        prop="chapterDescription"
        label="Course description"
      >
        <el-input v-model="chapterEditForm.chapterDescription" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Cancel()">Cancel</el-button>
      <el-button
        type="primary"
        :loading="saving"
        @click="Save()"
      >Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { editChapter } from '@/api/courses'
export default {
  data() {
    return {
      chapterEditForm: {
        _id: '',
        chapterDescription: '',
        chapterTitle: ''
      },
      saving: false,
      editChapterRules: {
        chapterTitle: [
          {
            required: true,
            message: 'Course title is required',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('edits', ['editChapterDialog', 'currentChapter'])
  },

  methods: {
    chapterEditClose() {

    },

    Cancel() {
      this.$store.commit('edits/SET_DIALOGS', {
        name: 'editChapterDialog',
        value: false
      })
      this.$refs.chapterEditRef.resetFields()
    },
    Save() {
      this.$refs.chapterEditRef.validate((valid) => {
        if (valid) {
          this.initUpload()
        } else {
          return false
        }
      })
    },
    chapterEditOpened() {
      this.chapterEditForm.chapterTitle = this.currentChapter.chapterTitle + ''
      this.chapterEditForm.chapterDescription = this.currentChapter.chapterDescription + ''
      this.chapterEditForm._id = this.currentChapter._id
    },
    initUpload() {
      this.saving = true
      editChapter(this.chapterEditForm).then(res => {
        console.log(res.data)
        this.saving = false
        this.Cancel()
        this.$notify({
          message: 'Chapter edited.',
          duration: 3500,
          type: 'success'
        })
      }).catch(err => {
        this.saving = false
        this.$notify({
          message: err.response.data,
          duration: 3500,
          type: 'error'
        })
      })
    }
  }
}
</script>

<style>
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
