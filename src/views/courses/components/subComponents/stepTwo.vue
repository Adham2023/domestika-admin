<template>
  <el-row
    class="step-two-body"
    style="height: 100%; overflow-y: auto; border: 0px solid red"
  >
    <el-col :span="10" :offset="7" style="margin-bottom: 1rem">
      <el-button
        icon="el-icon-plus"
        style="border: 1px solid transparent; font-weight: bold"
        @click="newCourseDialogVisible = true"
      >New chapter</el-button>
    </el-col>
    <el-col :span="10" :offset="7" style="text-align: center">
      <p
        v-if="$store.state.newCourse.chapters.length === 0"
        style="color: gray"
      >
        There is no chapter
      </p>
      <el-card
        v-for="chapter in $store.state.newCourse.chapters"
        v-else
        :key="chapter.id"
        shadow="hover"
        style="margin-bottom: 1rem"
      >
        <div slot="header" class="clearfix">
          <span style="font-size: 16; font-weight: bold">{{
            chapter.chapterTitle
          }}</span>
          <el-button
            style="float: right; padding: 3px 0; color: red"
            type="text"
            icon="el-icon-delete"
          />
          <el-button
            style="margin-right: 1rem; float: right; padding: 3px 0"
            type="text"
            icon="el-icon-edit"
            @click="editChapter(chapter.id)"
          />
        </div>
        <div class="text item">
          {{ chapter.chapterDescription }}
        </div>
      </el-card>
    </el-col>

    <!-- add new course here -->
    <el-dialog
      title="New course"
      :visible.sync="newCourseDialogVisible"
      width="40%"
      align="center"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-row style="width: 100%; height: 100%; border: 0px solid red">
        <el-col :span="24">
          <el-form ref="addFormRef" :model="newChapterForm" :rules="rules">
            <el-form-item label="Chapter title" prop="chapterTitle">
              <el-input v-model="newChapterForm.chapterTitle" />
            </el-form-item>
            <el-form-item label="Chapter description" prop="chapterDescription">
              <el-input
                v-model="newChapterForm.chapterDescription"
                type="textarea"
              />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddingNewChapter()">Cancel</el-button>
        <el-button
          type="primary"
          @click="validateAddNewChapterForm()"
        >Add</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :show-close="false"
      align="center"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="Edit Chapter"
      width="40%"
      :visible.sync="editChapterDialog"
      @open="setupDialogOptionsToEdit()"
    >
      <el-row>
        <el-form
          ref="editChapterFormRef"
          :model="editedChapterForm"
          :rules="editRules"
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
              <el-form-item
                prop="chapterDescription"
                label="Chapter description"
              >
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
        <el-button @click="cancelEdit()">Cancel</el-button>
        <el-button @click="saveEditedChapter()">Save</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { Message } from 'element-ui'

export default {
  components: {},
  data() {
    return {
      editedChapterForm: {
        chapterTitle: '',
        chapterDescription: ''
      },
      editRules: {
        chapterTitle: [
          {
            required: true,
            trigger: 'change',
            message: 'Please enter title to for chapter'
          }
        ]
      },
      editChapterDialog: false,
      newCourseDialogVisible: false,
      newChapterForm: {
        chapterTitle: '',
        chapterDescription: ''
      },
      rules: {
        chapterTitle: [
          {
            required: true,
            trigger: 'change',
            message: 'Please give a title to new chapter'
          }
        ]
      }
    }
  },
  methods: {
    saveEditedChapter() {
      this.$refs.editChapterFormRef.validate((valid) => {
        if (valid) {
          this.editedChapterForm.id = this.$store.state.newCourse.currentEditingChapterId
          this.$store.commit('newCourse/EDIT_CHAPTER', this.editedChapterForm)
          this.editChapterDialog = false
        } else {
          return false
        }
      })
    },

    setupDialogOptionsToEdit(a) {
      // currentEditingChapterId
      const indexOfChapter = this.$store.state.newCourse.chapters.findIndex(
        (chapter) =>
          chapter.id === this.$store.state.newCourse.currentEditingChapterId
      )
      const anObjectOfCurrentChapter = {}
      anObjectOfCurrentChapter.chapterTitle =
        this.$store.state.newCourse.chapters[indexOfChapter].chapterTitle + ''
      anObjectOfCurrentChapter.chapterDescription =
        this.$store.state.newCourse.chapters[indexOfChapter]
          .chapterDescription + ''
      this.editedChapterForm.chapterTitle =
        anObjectOfCurrentChapter.chapterTitle + ''
      this.editedChapterForm.chapterDescription =
        anObjectOfCurrentChapter.chapterDescription + ''
    },

    cancelEdit() {
      this.editChapterDialog = false
    },

    editChapter(id) {
      console.log('ID CHPATER: ', id)
      this.$store.commit('newCourse/SET_CURRENT_CHAPTER', id)
      this.editChapterDialog = true
    },

    validateStepTwo() {
      if (this.$store.state.newCourse.chapters.length === 0) {
        Message({
          message: 'Add at least one chapter',
          type: 'warning',
          duration: 2500
        })
      }
      return this.$store.state.newCourse.chapters.length > 0
    },
    cancelAddingNewChapter() {
      this.$refs.addFormRef.resetFields()
      this.newChapterForm = {
        chapterTitle: '',
        chapterDescription: ''
      }
      this.newCourseDialogVisible = false
    },
    addNewChapter() {
      this.$store.commit('newCourse/ADD_CHAPTER', {
        chapterTitle: this.newChapterForm.chapterTitle,
        chapterDescription: this.newChapterForm.chapterDescription
      })
      this.cancelAddingNewChapter()
    },
    validateAddNewChapterForm() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return false
        this.addNewChapter()
      })
    }
  }
}
</script>

<style>
/* .step-one-body {
  border: 1px solid red;
} */

.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>

