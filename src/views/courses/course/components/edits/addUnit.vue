<template>
  <el-dialog
    title="New unit"
    top="30px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    align=""
    :visible.sync="addUnitDialog"
    width="40%"
  >
    <el-row style="width: 100%; height: 100%; border: 0px solid red">
      <el-col :span="24">
        <el-form ref="addUnitFormRef" :model="newUnit" :rules="rules">
          <el-form-item label="Unit title" prop="unitTitle">
            <el-input v-model="newUnit.unitTitle" />
          </el-form-item>
          <el-form-item>
            <el-col :span="24">
              <el-form-item label=" " prop="unitVideo">
                <span style="font-weight: bolder">Video</span>
                <el-upload
                  ref="uploadStepThree"
                  style="
                      text-align: center;
                      padding: 1rem;
                      border: 1px solid #dadada;
                      border-radius: 8px;
                    "
                  class="upload-demo"
                  name="resource"
                  :auto-upload="false"
                  :http-request="uploadResouces"
                  :on-remove="removingUnitVideo"
                  accept="video/*"
                  action="string"
                  :file-list="fileList"
                  :multiple="false"
                  :on-change="fileChanged"
                >
                  <el-button
                    slot="trigger"
                    size="small"
                    type="primary"
                  >Video</el-button>
                  <div slot="tip" class="el-upload__tip">
                    Choose unit video
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-col :span="24">
              <el-form-item label="" prop="file">
                <span style="font-weight: bolder">Resources</span>
                <el-upload
                  ref="upload"
                  style="
                      text-align: center;
                      padding: 1rem;
                      border: 1px solid #dadada;
                      border-radius: 8px;
                    "
                  class="upload-demo"
                  :auto-upload="false"
                  :multiple="true"
                  name="resource"
                  action="string"
                  :http-request="uploadResouces"
                  :on-change="resourceSelected"
                  :on-remove="resFileRemoved"
                  :file-list="resourceFileList"
                >
                  <el-button
                    slot="trigger"
                    size="small"
                    type="primary"
                  >Add resources</el-button>
                  <div slot="tip" class="el-upload__tip">
                    These resources will be attached to current unit
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Unit description" prop="unitDescription">
            <el-input v-model="newUnit.unitDescription" type="textarea" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelAddingUnit()">Cancel</el-button>
      <el-button
        type="primary"
        @click="confirmUnitAddForm()"
      >Add unit</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      newUnit: {
        unitTitle: '',
        unitDescription: '',
        unitResources: [],
        unitResourcesNames: [],
        unitVideo: '',
        localPlayUrl: '',
        videoFileName: ''
      },
      cancelTokenSource: {},
      fileList: [],
      resourceFileList: [],
      rules: {
        unitVideo: [
          {
            validator: (rule, value, cb) => {
              if (value === '') {
                return cb(new Error())
              } else {
                return cb()
              }
            },
            trigger: 'change',
            required: true,
            message: 'Please select unit video'
          }
        ],
        unitTitle: [
          {
            required: true,
            message: 'Please give title to new unit',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('edits', ['addUnitDialog'])
  },
  methods: {
    uploadResouces(param) {
      const uploadData = new FormData()
      uploadData.append('resource', param.file)
      console.log('this is upload data: ', uploadData)
      // uploadResource({
      //   formData: uploadData
      // })
      //   .then((res) => {
      //     console.log(res.data)
      //     param.onSuccess()
      //   })
      //   .catch((err) => {
      //     param.onError(err)
      //   })
    },
    openEditUnitDialog(id) {
      console.log('Current unit id: ', id)
      this.$store.commit('newCourse/SET_DIALOG_TRIGGER', {
        name: 'editUnitDialog',
        value: true
      })
      this.$store.commit(
        'newCourse/SET_CURRENT_CHAPTER_E',
        this.currentChapterID
      )
      this.$store.commit('newCourse/SET_CURRENT_UNIT_E', id)
    },
    resourceSelected(file, fileList) {
      this.resourceFileList = fileList
    },
    resFileRemoved(file, fileList) {
      this.cancelTokenSource[file.name].cancel()
      this.resourceFileList = fileList
      this.deleteFile(file.name)
    },
    removingUnitVideo(file, fileList) {
      this.cancelTokenSource[file.name].cancel()
      this.newUnit.unitVideo = null
      this.newUnit.videoFileName = ''
      this.newUnit.localPlayUrl = ''
      this.fileList = []
      this.deleteFile(file.name)
      this.$refs.addUnitFormRef.validate((valid) => {
        if (!valid) return false
        // this.addUnit();
      })
    },
    deleteFile(name) {
      // deleteResource(name)
      //   .then((res) => {
      //     this.$notify({
      //       title: 'Success',
      //       message: res.data.message,
      //       type: 'success'
      //     })
      //   })
      //   .catch((err) => {
      //     this.$notify({
      //       title: 'Error',
      //       message: err.response.data,
      //       type: 'error'
      //     })
      //   })
    },
    getLocalUrl(file) {
      var fileUrl = window.URL.createObjectURL(file.raw)
      return fileUrl
    },
    fileChanged(file, fileList) {
      if (file.status === 'ready') {
        this.newUnit.unitVideo = file
        this.newUnit.localPlayUrl = this.getLocalUrl(file)
        this.newUnit.videoFileName = file.name
        this.fileList.push(file)
        if (this.fileList.length > 1) {
          const a = this.fileList.shift()
          console.log('shifted data: ', a)
          this.deleteFile(a.name)
        }
        console.log('after length: ', this.fileList.length)

        this.$refs.addUnitFormRef.validate((valid) => {
          if (!valid) return false
        })
      }
    },
    chapterChanged(chapter) {},
    addUnit() {
      console.log('resources: ')
      this.resourceFileList.forEach((item) => {
        this.newUnit.unitResources.push(item)
        this.newUnit.unitResourcesNames.push(item.name)
      })
      const newUnitObj = {
        chapterId: this.currentChapterID,
        unitTitle: this.newUnit.unitTitle,
        unitDescription: this.newUnit.unitDescription,
        unitResources: this.newUnit.unitResources,
        unitResourcesNames: this.newUnit.unitResourcesNames,
        unitVideo: this.newUnit.unitVideo,
        localPlayUrl: this.newUnit.localPlayUrl,
        videoFileName: this.newUnit.videoFileName
      }
      this.$store.commit('newCourse/ADD_UNIT', newUnitObj)
      this.cancelAddingUnit()
    },
    cancelAddingUnit() {
      this.addUnitDialog = false
      this.$refs.addUnitFormRef.resetFields()
      this.newUnit = {
        unitTitle: '',
        unitDescription: '',
        unitResources: [],
        unitVideo: null,
        videoFileName: '',
        localPlayUrl: '',
        unitResourcesNames: []
      }
      this.fileList = []
      this.resourceFileList = []
      this.$store.commit('edits/SET_DIALOGS', { name: 'addUnitDialog', value: false })
    },
    confirmUnitAddForm() {
      this.$refs.addUnitFormRef.validate((valid) => {
        console.log('is unit valid: ', valid)
        if (!valid) return false
        this.addUnit()
      })
    }
  }
}
</script>

<style>

</style>
