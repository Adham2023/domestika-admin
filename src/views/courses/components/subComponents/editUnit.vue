<template>
  <el-dialog
    title="Edit unit"
    top="30px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    align=""
    :visible.sync="$store.state.newCourse.editUnitDialog"
    width="40%"
    @open="editUnitDialogOpened"
  >
    <el-row style="width: 100%; height: 100%; border: 0px solid red">
      <el-col :span="24">
        <el-form ref="E_addUnitFormRef" :model="E_newUnit" :rules="E_rules">
          <el-form-item label="Unit title" prop="unitTitle">
            <el-input v-model="E_newUnit.unitTitle" />
          </el-form-item>
          <el-form-item>
            <el-col :span="24">
              <el-form-item label=" " prop="unitVideo">
                <span style="font-weight: bolder">Video</span>
                <el-upload
                  ref="_uploadStepThree"
                  style="
                    text-align: center;
                    padding: 1rem;
                    border: 1px solid #dadada;
                    border-radius: 8px;
                  "
                  class="upload-demo"
                  name="resource"
                  :auto-upload="true"
                  :before-remove="E_checkIfResouceCanBeDeleted"
                  :on-remove="E_removingUnitVideo"
                  accept="video/*"
                  :action="uploadUrl + '/course/uploadResource'"
                  :file-list="E_fileList"
                  :multiple="false"
                  :on-change="E_fileChanged"
                >
                  <el-button
                    slot="trigger"
                    size="small"
                    type="primary"
                  >Video</el-button>
                  <div slot="tip" class="el-upload__tip">Choose unit video</div>
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
                  :auto-upload="true"
                  :multiple="true"
                  name="resource"
                  :action="uploadUrl + '/course/uploadResource'"
                  :on-change="E_resourceSelected"
                  :on-remove="E_resFileRemoved"
                  :file-list="E_resource_FileList"
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
            <el-input v-model="E_newUnit.unitDescription" type="textarea" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelEditingUnit()">Cancel</el-button>
      <el-button
        type="primary"
        @click="confirmUnitEditForm()"
      >Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { deleteResource } from '@/api/courses'
export default {
  data() {
    return {
      currentChapterID: null,
      addUnitDialog: false,
      currentChapterIndex: 0,
      currentUnitIndex: 0,
      uploadUrl: process.env.VUE_APP_BASE_API,
      E_newUnit: {
        unitTitle: '',
        unitDescription: '',
        unitResources: [],
        unitVideo: ''
      },
      E_fileList: [],
      E_resource_FileList: [],
      E_rules: {
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
    ...mapGetters('newCourse', ['units']),
    currentUnits() {
      if (this.currentChapterID !== null) {
        return this.units(this.currentChapterID)
      }
      return []
    }
  },
  methods: {
    editUnitDialogOpened() {
      const indexOfchapterIs = this.$store
        .state
        .newCourse
        .chapters.findIndex(chapter =>
          chapter.id ===
                                                    this.$store.state.newCourse.currentChapterId)

      const units = this.$store.state.newCourse.chapters[indexOfchapterIs].units
      const indexOfUnitIs = units.findIndex(unit => unit.id === this.$store.state.newCourse.currentUnitId)
      const thisUnitIs = units[indexOfUnitIs]
      const objectForEditUnit = {}
      objectForEditUnit.unitTitle = thisUnitIs.unitTitle + ''
      objectForEditUnit.unitDescription = thisUnitIs.unitDescription + ''
      objectForEditUnit.unitResources = thisUnitIs.unitResources
      objectForEditUnit.unitVideo = thisUnitIs.unitVideo
      this.E_fileList = [thisUnitIs.unitVideo]
      this.E_resource_FileList = [...thisUnitIs.unitResources]
      this.E_newUnit = { ...objectForEditUnit }
      this.currentUnitIndex = indexOfUnitIs
      this.currentChapterIndex = indexOfchapterIs
    },
    E_checkIfResouceCanBeDeleted(file, E_fileList) {
      return new Promise((resolve, reject) => {
        deleteResource(file.name)
          .then((res) => {
            console.log(res.data)
            resolve(true)
          })
          .catch((err) => {
            console.error(err)
            reject(false)
          })
      })
    },
    E_resourceSelected(file, E_fileList) {
      this.E_resource_FileList = E_fileList
    },
    E_resFileRemoved(file, E_fileList) {
      this.E_resource_FileList = E_fileList
      deleteResource(file.name)
        .then((res) => {
          this.$notify({
            title: 'Success',
            message: res.data,
            type: 'success'
          })
        })
        .catch((err) => {
          this.$notify({
            title: 'Error',
            message: err.response.data,
            type: 'error'
          })
        })
    },
    E_removingUnitVideo(file, E_fileList) {
      this.E_newUnit.unitVideo = null
      this.E_fileList = []
      this.$refs.E_addUnitFormRef.validate((valid) => {
        if (!valid) return false
        // this.addUnit();
      })
    },
    E_fileChanged(file, E_fileList) {
      if (file.status === 'success') {
        this.E_newUnit.unitVideo = file
        this.E_fileList.push(file)
        if (this.E_fileList.length > 1) {
          const a = this.E_fileList.shift()
          console.log('shifted data: ', a)
          deleteResource(a.name)
            .then((res) => {
              console.log(res.data)
            })
            .catch((err) => console.error(err))
        }
        console.log('after length: ', this.E_fileList.length)

        this.$refs.E_addUnitFormRef.validate((valid) => {
          if (!valid) return false
        })
      }
    },
    chapterChanged(chapter) {},
    saveEdits() {
      this.E_newUnit.unitResources = []
      console.log('resources: ')
      this.E_resource_FileList.forEach((item) => {
        console.dir(item)
        this.E_newUnit.unitResources.push(item)
      })
      const E_newUnitObj = {
        unitTitle: this.E_newUnit.unitTitle,
        unitDescription: this.E_newUnit.unitDescription,
        unitResources: this.E_newUnit.unitResources,
        unitVideo: this.E_newUnit.unitVideo,
        chapterIndex: this.currentChapterIndex,
        unitIndex: this.currentUnitIndex
      }
      console.log('E_newUnitObj: ', E_newUnitObj)
      this.$store.commit('newCourse/EDIT_UNIT', E_newUnitObj)
      this.cancelEditingUnit()
    },
    cancelEditingUnit() {
      this.$store.commit('newCourse/SET_DIALOG_TRIGGER', { name: 'editUnitDialog', value: false })
      this.$refs.E_addUnitFormRef.resetFields()
      this.E_newUnit = {
        unitTitle: '',
        unitDescription: '',
        unitResources: [],
        unitVideo: null
      }
      this.E_fileList = []
      this.E_resource_FileList = []
    },
    confirmUnitEditForm() {
      this.$refs.E_addUnitFormRef.validate((valid) => {
        console.log('is unit valid: ', valid)
        if (!valid) return false
        this.saveEdits()
      })
    }
  }
}
</script>

<style>
</style>
