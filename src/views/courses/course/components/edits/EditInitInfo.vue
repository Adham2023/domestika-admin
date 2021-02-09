<template>
  <el-dialog
    title="Edit course info"
    :visible.sync="editCourseInfoDialog"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="600px"
    top="15px"
    align="center"
    @open="courseInfoEditOpened()"
    @close="courseInfoEditClose()"
  >
    <!-- Here can be changed preview video -->
    <el-select
      v-model="formFields"
      multiple
      collapse-tags
      style="width: 100%"
      placeholder="Select fields to edit"
    >
      <el-option
        v-for="item in formOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-form
      ref="courseInfoEditRef"
      :rules="editCourseInfoRules"
      :model="courseEditForm"
    >
      <el-form-item
        v-if="formFields.includes('courseTitle')"
        prop="courseTitle"
        label="Course title"
      >
        <el-input v-model="courseEditForm.courseTitle" />
      </el-form-item>
      <el-form-item
        v-if="formFields.includes('coursePrice')"
        prop="coursePrice"
        label="Course price"
      >
        <el-input-number
          v-model="courseEditForm.coursePrice"
          style="width: 100%"
          placeholder="course price"
        />
      </el-form-item>
      <el-form-item
        v-if="formFields.includes('courseDescription')"
        prop="courseDescription"
        label="Course description"
      >
        <el-input v-model="courseEditForm.courseDescription" />
      </el-form-item>
      <el-form-item
        v-if="formFields.includes('startingDate')"
        label="Starting date"
        prop="startingDate"
      >
        <el-date-picker
          v-model="courseEditForm.startingDate"
          style="width: 100%"
          placeholder="Starting date"
          value-format="timestamp"
        />
      </el-form-item>
    </el-form>
    <div class="chamgeButtons">
      <el-upload
        v-if="formFields.includes('video')"
        ref="uploadVideo"
        class="upload-demo"
        action=""
        accept="video/*"
        :multiple="false"
        :file-list="videoFileList"
        :auto-upload="false"
        :on-remove="videoRemoved"
        :on-change="previewVideoChange"
      >
        <el-tooltip
          slot="trigger"
          class="item"
          effect="dark"
          content="Change preview video"
          placement="top"
        >
          <el-button
            icon="el-icon-edit"
          ><i class="el-icon-video-camera-solid" /></el-button>
        </el-tooltip>
      </el-upload>
      <el-upload
        v-if="formFields.includes('coursePreviewVideoThumbnailName')"
        ref="uploadImage"
        class="upload-demo"
        action=""
        accept="image/*"
        :multiple="false"
        :file-list="imageFileList"
        :auto-upload="false"
        :on-remove="imageRemoved"
        :on-change="previewImageChange"
      >
        <el-tooltip
          slot="trigger"
          class="item"
          effect="dark"
          content="Change preview video image"
          placement="top"
        >
          <el-button
            icon="el-icon-edit"
          ><i class="el-icon-camera-solid" /></el-button>
        </el-tooltip>
      </el-upload>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Cancel()">Cancel</el-button>
      <el-button
        type="primary"
        :disabled="formFields.length === 0"
        @click="Save()"
      >Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { uploadResource, editCourseInfo } from '@/api/courses'
export default {
  data() {
    return {
      formOptions: [
        {
          value: 'courseTitle',
          label: 'Course title'
        },
        {
          value: 'courseDescription',
          label: 'Course description'
        },
        {
          value: 'coursePrice',
          label: 'Course price'
        },
        {
          value: 'startingDate',
          label: 'Course starting date'
        },
        {
          value: 'video',
          label: 'New preview video'
        },
        {
          value: 'coursePreviewVideoThumbnailName',
          label: 'New preview image'
        }
      ],
      formFields: [],
      changePreviewVideoDialog: false,
      videoFileList: [],
      imageFileList: [],
      courseEditForm: {
        _id: '',
        courseDescription: '',
        coursePreviewVideoThumbnailName: null,
        courseTitle: '',
        coursePrice: '',
        startingDate: '',
        video: null
      },
      editCourseInfoRules: {
        courseTitle: [
          {
            required: true,
            message: 'Course title is required',
            trigger: 'change'
          }
        ],
        coursePrice: [
          {
            validator: (rule, value, cb) => {
              console.log(value)
              if (value < 0.0 || value === undefined) {
                cb(new Error())
              } else {
                cb()
              }
            },
            required: true,
            message: 'Course price is required and at least 0.0',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('edits', ['editCourseInfoDialog', 'currentCourse'])
  },

  methods: {
    videoRemoved(file, fileList) {
      this.courseEditForm.video = null
    },
    imageRemoved(file, fileList) {
      this.courseEditForm.coursePreviewVideoThumbnailName = null
    },
    courseInfoEditClose() {
      this.videoFileList = []
      this.imageFileList = []
      this.formFields = []
    },
    previewVideoChange(file, fileList) {
      this.videoFileList = [file]
      console.log('change: ', file)
      this.courseEditForm.video = file.name
    },
    previewImageChange(file, fileList) {
      this.imageFileList = [file]
      this.courseEditForm.coursePreviewVideoThumbnailName = file.name
    },
    Cancel() {
      this.$store.commit('edits/SET_DIALOGS', {
        name: 'editCourseInfoDialog',
        value: false
      })
      this.$refs.courseInfoEditRef.resetFields()
    },
    Save() {
      this.$refs.courseInfoEditRef.validate((valid) => {
        if (valid) {
          this.initUpload()
        } else {
          return false
        }
      })
    },
    courseInfoEditOpened() {
      this.courseEditForm.courseTitle = this.currentCourse.courseTitle + ''
      this.courseEditForm.courseDescription =
        this.currentCourse.courseDescription + ''
      this.courseEditForm.coursePrice = this.currentCourse.coursePrice
      this.courseEditForm.startingDate = new Date(
        this.currentCourse.startingDate
      ).getTime()
      this.courseEditForm._id = this.currentCourse._id
    },
    initUpload() {
      // upload video or image to server first
      if (
        this.formFields.includes('video') &&
        this.courseEditForm.video !== null
      ) {
        this.uploadVideoFile(this.videoFileList[0])
          .then(() => {
            alert('aa')
            editObject._id = this.courseEditForm._id
            editCourseInfo(editObject)
              .then((res) => {
                this.courseInfoEditClose()
                this.Cancel()
                this.$emit('fetchAllcourse')
                this.$notify({
                  message: 'Course updated successfully',
                  duration: 3500,
                  type: 'success'
                })
              })
              .catch((err) => {
                this.$notify({
                  message: err.response.data,
                  duration: 3500,
                  type: 'error'
                })
              })
          })
          .catch((err) => {
            this.$notify({
              message: err.response.data,
              duration: 3500,
              type: 'error'
            })
          })
      }

      if (
        this.formFields.includes('coursePreviewVideoThumbnailName') &&
        this.courseEditForm.coursePreviewVideoThumbnailName !== null
      ) {
        this.uploadFile(this.imageFileList[0])
      }
      const editObject = {}
      for (let i = 0; i < this.formFields.length; i++) {
        if (this.courseEditForm[this.formFields[i]] !== null) {
          editObject[this.formFields[i]] = this.courseEditForm[
            this.formFields[i]
          ]
        }
      }

      if (!this.formFields.includes('video')) {
        editObject._id = this.courseEditForm._id
        editCourseInfo(editObject)
          .then((res) => {
            this.courseInfoEditClose()
            this.Cancel()
            this.$emit('fetchAllcourse')
            this.$notify({
              message: 'Course updated successfully',
              duration: 3500,
              type: 'success'
            })
          })
          .catch((err) => {
            this.$notify({
              message: err.response.data,
              duration: 3500,
              type: 'error'
            })
          })
      }

      // upload text info
    },
    uploadVideoFile(file) {
      return new Promise((resolve, reject) => {
        const uploadData = new FormData()
        uploadData.append('resource', file.raw)
        uploadResource({
          formData: uploadData
        })
          .then((res) => {
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    uploadFile(file) {
      const uploadData = new FormData()
      uploadData.append('resource', file.raw)
      uploadResource({
        formData: uploadData
      })
        .then((res) => {
          this.$notify({
            message: 'File uploaded',
            duration: 3500,
            type: 'success'
          })
        })
        .catch((err) => {
          this.$notify({
            message: 'File upload error' + err.response.data,
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
.upload-demo {
  margin: 2rem 0;
}
</style>
