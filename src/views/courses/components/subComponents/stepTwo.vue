<template>
  <el-row
    class="step-two-body"
    style="height: 100%; overflow-y: auto; border: 0px solid red"
  >
    <el-col :span="10" :offset="7" style="margin-bottom: 1rem">
      <el-button
        @click="newCourseDialogVisible = true"
        icon="el-icon-plus"
        style="border: 1px solid transparent; font-weight: bold"
        >New chapter</el-button
      >
    </el-col>
    <el-col :span="10" :offset="7" style="text-align: center">
      <p style="color: gray" v-if="$store.state.newCourse.chapters.length == 0">
        There is no chapter
      </p>
      <el-card
        v-else
        v-for="chapter in $store.state.newCourse.chapters"
        :key="chapter.id"
        shadow="hover"
        style="margin-bottom: 1rem"
      >
        <div slot="header" class="clearfix">
          <span style="font-size: 16; font-weight: bold">{{ chapter.chapterTitle }}</span>
          <el-button
            style="float: right; padding: 3px 0; color: red"
            type="text"
            icon="el-icon-delete"
          ></el-button>
          <el-button
            style="margin-right: 1rem; float: right; padding: 3px 0"
            type="text"
            icon="el-icon-edit"
          ></el-button>
        </div>
        <div  class="text item">
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
          <el-form :model="newChapterForm" :rules="rules" ref="addFormRef">
            <el-form-item label="Chapter title" prop="chapterTitle">
              <el-input v-model="newChapterForm.chapterTitle"></el-input>
            </el-form-item>
            <el-form-item label="Chapter description" prop="chapterDescription">
              <el-input
                type="textarea"
                v-model="newChapterForm.chapterDescription"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddingNewChapter()">Cancel</el-button>
        <el-button type="primary" @click="validateAddNewChapterForm()"
          >Add</el-button
        >
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { title } from "@/settings";
import { Message } from 'element-ui';
export default {
  data() {
    return {
      newCourseDialogVisible: false,
      newChapterForm: {
        chapterTitle: "",
        chapterDescription: "",
      },
      rules: {
        chapterTitle: [
          {
            required: true,
            trigger: "change",
            message: "Please give a title to new chapter",
          },
        ],
      },
    };
  },
  methods: {
    validateStepTwo() {
      if(this.$store.state.newCourse.chapters.length == 0) {
        Message({
          message: "Add at least one chapter",
          type: 'warning',
          duration: 2500
        })
      }
      return this.$store.state.newCourse.chapters.length > 0;
    },
    cancelAddingNewChapter() {
      this.$refs.addFormRef.resetFields();
      this.newChapterForm = {
        chapterTitle: "",
        chapterDescription: "",
      };
      this.newCourseDialogVisible = false;
    },
    addNewChapter() {
      this.$store.commit("newCourse/ADD_CHAPTER", {
        chapterTitle: this.newChapterForm.chapterTitle,
        chapterDescription: this.newChapterForm.chapterDescription,
      });
      this.cancelAddingNewChapter();
    },
    validateAddNewChapterForm() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return false;
        this.addNewChapter();
      });
    },
  },
};
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

