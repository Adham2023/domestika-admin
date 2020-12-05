<template>
  <el-row class="step-one-body" style="height: 100%; overflow-y: auto">
    <el-col
      :xs="{ span: 24, offset: 0 }"
      :sm="{ span: 24, offset: 0 }"
      :md="{ span: 18, offset: 3 }"
      :lg="{ span: 14, offset: 5 }"
      style="border: 0px solid red"
    >
      <el-form ref="stepOneFormRef" :rules="rules" :model="stepOneForm">
        <el-form-item>
          <el-col
            :sm="{ span: 18, offset: 3 }"
            :xs="{ span: 24, offset: 0 }"
            :md="{ span: 20, offset: 2 }"
            :lg="{ span: 14, offset: 5 }"
          >
            <el-form-item label="Course title" prop="courseTitle">
              <el-input
                v-model="stepOneForm.courseTitle"
                placeholder="Some title ..."
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col
            :sm="{ span: 18, offset: 3 }"
            :xs="{ span: 24, offset: 0 }"
            :md="{ span: 20, offset: 2 }"
            :lg="{ span: 14, offset: 5 }"
          >
            <el-form-item label="Course price" prop="price">
              <el-input
                v-model="stepOneForm.price"
                placeholder="Course price"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col
            :sm="{ span: 18, offset: 3 }"
            :xs="{ span: 24, offset: 0 }"
            :md="{ span: 20, offset: 2 }"
            :lg="{ span: 14, offset: 5 }"
          >
            <el-form-item label="Course description" prop="description">
              <el-input
                v-model="stepOneForm.description"
                type="textarea"
                :rows="2"
                placeholder="Short about course"
              />
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col
            :sm="{ span: 18, offset: 3 }"
            :xs="{ span: 24, offset: 0 }"
            :md="{ span: 20, offset: 2 }"
            :lg="{ span: 14, offset: 5 }"
          >
            <el-form-item label=" " prop="file">
              <el-upload
                ref="upload"
                class="upload-demo"
                name="resource"
                :auto-upload="true"
                :on-remove="removingFile"
                accept="video/*"
                :before-remove="checkIfResouceCanBeDeleted"
                action="http://192.168.0.133:3001/course/uploadResource"
                :file-list="fileList"
                :multiple="false"
                :on-change="fileChanged"
              >
                <el-button slot="trigger" size="small" type="primary"
                  >Select preview video</el-button
                >
                <div slot="tip" class="el-upload__tip">
                  choose your preview video for the course
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { deleteResource } from "@/api/courses";
export default {
  data() {
    return {
      stepOneForm: {
        courseTitle: "",
        description: "",
        file: null,
        price: "",
      },
      fileList: [],
      rules: {
        price: [
          {
            required: true,
            message: "Please enter course price",
            trigger: "change",
          },
        ],
        courseTitle: [
          { required: true, trigger: "change", message: "Please give a title" },
        ],
        file: [
          {
            validator: (rule, value, cb) => {
              if (value == null) {
                return cb(new Error());
              } else {
                cb();
              }
            },
            required: true,
            trigger: "change",
            message: "Please select preview video",
          },
        ],
      },
    };
  },
  methods: {
    
    resetFields() {
      this.$refs.stepOneFormRef.resetFields();
      this.fileList = [];
      this.$store.commit("newCourse/SET_COURSE_PREVIEW_VIDEO", null);
      this.$store.commit("newCourse/SET_COURSE_TEXT_INFO", {
        courseTitle: "",
        description: "",
      });
    },
    checkIfResouceCanBeDeleted(file, fileList) {
      return new Promise((resolve, reject) => {
        deleteResource(file.name)
          .then((res) => {
            console.log(res.data);
            resolve(true);
          })
          .catch((err) => {
            reject(false);
          });
      });
    },
    removingFile(file, fileList) {
      this.stepOneForm.file = null;
      console.log(file.name);
      console.log(fileList.length);
    },
    fileChanged(file, fileList) {
      this.stepOneForm.file = file.name;
      console.log("file: ", file);
      this.fileList.push(file);
      if (this.fileList.length > 1) {
        this.fileList.shift();
      }
      this.$store.commit("newCourse/SET_COURSE_PREVIEW_VIDEO", file.name); // set preview video of course
    },
    setInfoToState() {
      this.$store.commit("newCourse/SET_COURSE_TEXT_INFO", this.stepOneForm);
    },
    validateForm() {
      let validVal = false;
      this.$refs.stepOneFormRef.validate((valid) => {
        validVal = valid && this.fileList.length > 0;
        console.log(this.fileList.length > 0);
        if (!valid) {
          return false;
        } else {
          this.setInfoToState();
        }
      });
      return validVal;
    },
  },
};
</script>

<style>
/* .step-one-body {
  border: 1px solid red;
} */
</style>
