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
                type="number"
                :min="0"
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
            <el-form-item label="Starting date" prop="startingDate">
              <el-date-picker
                v-model="stepOneForm.startingDate"
                style="width: 100%"
                placeholder="Starting date"
                value-format="timestamp"
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
                ref="uploadVideo"
                class="upload-demo"
                name="resource"
                :auto-upload="false"
                :on-remove="removingFile"
                accept="video/*"
                :before-remove="checkIfResouceCanBeDeleted"
                action="string"
                :http-request="uploadPreviewVideo"
                :file-list="fileList"
                :multiple="false"
                :on-change="fileChanged"
              >
                <el-button
                  slot="trigger"
                  size="medium"
                  type="text"
                  style="font-size: 20px; color: green"
                  icon="el-icon-video-camera-solid"
                />
                <div slot="tip" class="el-upload__tip">
                  choose your preview video for the course
                </div>
              </el-upload>
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
            <el-form-item label=" " prop="imageFile">
              <el-upload
                ref="uploadImage"
                class="upload-demo"
                name="resource"
                :auto-upload="false"
                :on-remove="removingImageFile"
                accept="image/*"
                :before-remove="checkIfImageResouceCanBeDeleted"
                action="string"
                :http-request="uploadImagePreviewVideo"
                :file-list="fileImageList"
                :multiple="false"
                :on-change="fileImageChanged"
              >
                <!-- <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                >Select thumbnail for video</el-button> -->
                <el-button
                  slot="trigger"
                  size="medium"
                  type="text"
                  style="font-size: 20px; color: green"
                  icon="el-icon-camera-solid"
                />
                <div slot="tip" class="el-upload__tip">
                  choose an image to display on preview video card
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- <el-col>
      <video
        ref="videoFile"
        width="100%"
        controls
        :src="$store.state.newCourse.courseInfo.localPlayUrl+''"
        class="myvideo"
        style="height: 100%"
      >
        <source id="video_here" src="mov_bbb.mp4">
        Your browser does not support HTML5 video.
      </video>
    </el-col> -->
  </el-row>
</template>

<script>
// import { deleteResource, uploadResource } from '@/api/courses'
import imageMixin from './mixins/imageMixin'
import videoMixin from './mixins/videoMixin'

// import axios from 'axios'
export default {
  mixins: [imageMixin, videoMixin],
  data() {
    return {
      stepOneForm: {
        courseTitle: '',
        description: '',
        file: null,
        price: null,
        localPlayUrl: null,
        videoFileName: '',
        imageFile: null,
        localImageUrl: null,
        startingDate: null
      },
      cancelTokenSource: null,
      uploadUrl: process.env.VUE_APP_BASE_API,
      fileList: [],
      fileImageList: [],
      rules: {
        startingDate: [
          {
            required: true,
            message: 'Please select starting date',
            trigger: 'change'
          }
        ],
        price: [
          {
            required: true,
            message: 'Please enter course price',
            trigger: 'change'
          }
        ],
        courseTitle: [
          { required: true, trigger: 'change', message: 'Please give a title' }
        ],
        file: [
          {
            validator: (rule, value, cb) => {
              if (value === null) {
                return cb(new Error())
              } else {
                cb()
              }
            },
            required: true,
            trigger: 'change',
            message: 'Please select preview video'
          }
        ],
        imageFile: [
          {
            validator: (rule, value, cb) => {
              if (value === null) {
                return cb(new Error())
              } else {
                cb()
              }
            },
            required: true,
            trigger: 'change',
            message: 'Please select thubmnail for preview video'
          }
        ]
      }
    }
  },
  methods: {
    getLocalUrl(file) {
      var fileUrl = window.URL.createObjectURL(file.raw)
      return fileUrl
    },
    resetFields() {
      this.$refs.stepOneFormRef.resetFields()
      this.fileList = []
      this.fileImageList = []
      this.$store.commit('newCourse/SET_COURSE_PREVIEW_VIDEO', null)
      this.$store.commit('newCourse/SET_THUMBNAIL_OF_VIDEO', null)
      this.$store.commit('newCourse/SET_COURSE_TEXT_INFO_RESET')
    },
    validateForm() {
      if (this.validateForImageForm() && this.validateForVideoForm()) {
        console.log('starting date: ', this.stepOneForm.startingDate)
        this.$store.commit('newCourse/SET_COURSE_TEXT_INFO', this.stepOneForm)
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
/* .step-one-body {
  border: 1px solid red;
} */

.progressBar {
  width: 15rem !important;
}
</style>
