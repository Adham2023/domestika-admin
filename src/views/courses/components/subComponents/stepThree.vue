<template>
  <el-row>
    <!-- chapter select and add unit button are here -->
    <el-col :span="12" :offset="6">
      <el-select v-model="currentChapterID" placeholder="Chapters">
        <el-option
          v-for="chapter in chapters"
          :key="chapter.id"
          :label="chapter.chapterTitle"
          :value="chapter.id"
        />
      </el-select>

      <el-tooltip
        class="item"
        effect="dark"
        content="Add new unit"
        placement="top"
        style="margin-left: 1rem"
      >
        <el-button
          :disabled="currentChapterID == null"
          style="border: 1px solid transparent"
          icon="el-icon-plus"
          @click="addUnitDialog = true"
        />
      </el-tooltip>
      <div style="display: block">
        <span style="color: gray"> Current chapter: </span>
        <h3 style="display: inline">{{ currentChapterTitle }}</h3>
      </div>
    </el-col>
    <el-col :span="24"><el-divider /></el-col>
    <el-col :span="12" :offset="6">
      <p v-if="currentUnits.length == 0" style="color: gray">
        There is no unit
      </p>
      <el-card
        v-for="unit in currentUnits"
        v-else
        :key="unit.id"
        shadow="hover"
        style="margin-bottom: 1rem"
      >
        <div slot="header" class="clearfix">
          <span style="font-size: 16; font-weight: bold">{{
            unit.unitTitle
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
          />
        </div>
        <div class="text item">
          {{ unit.unitDescription }}
        </div>
        <div class="text item">
          <span>Video: </span>{{ unit.unitVideo.name }}
        </div>
        <div class="text item">
          <span>Resources: </span>
          <div v-for="(resource, index) in unit.unitResources" :key="index">
            {{ resource.name }}
          </div>
        </div>
      </el-card>
    </el-col>

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
                    ref="upload"
                    style="
                      text-align: center;
                      padding: 1rem;
                      border: 1px solid #dadada;
                      border-radius: 8px;
                    "
                    class="upload-demo"
                    name="coursePreview"
                    :auto-upload="false"
                    action=""
                    :on-remove="fileRemoved"
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
                    action=""
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
  </el-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      currentChapterID: null,
      addUnitDialog: false,
      newUnit: {
        unitTitle: '',
        unitDescription: '',
        unitResources: [],
        unitVideo: null
      },
      fileList: [],
      resourceFileList: [],
      rules: {
        unitVideo: [
          {
            validator: (rule, value, cb) => {
              if (value === null) {
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
    ...mapState('newCourse', ['chapters']),
    ...mapGetters('newCourse', ['units']),
    currentChapterTitle() {
      if (this.currentChapterID !== null) {
        return this.chapters.find(
          (chapter) => chapter.id === this.currentChapterID
        ).chapterTitle
      }
      return ''
    },
    currentUnits() {
      if (this.currentChapterID !== null) { return this.units(this.currentChapterID) }
      return []
    }
  },
  methods: {
    resourceSelected(file, fileList) {
      this.resourceFileList = fileList
    },
    resFileRemoved(file, fileList) {
      this.resourceFileList = fileList
    },
    fileRemoved(file, fileList) {
      this.newUnit.unitVideo = null
      this.$refs.addUnitFormRef.validate((valid) => {
        if (!valid) return false
        // this.addUnit();
      })
    },
    fileChanged(file, fileList) {
      this.newUnit.unitVideo = file.raw
      console.log('unit video: ', this.newUnit.unitVideo)
      this.fileList.push(file)
      if (this.fileList.length > 1) {
        this.fileList.shift()
      }
      this.$refs.addUnitFormRef.validate((valid) => {
        if (!valid) return false
        // this.addUnit();
      })
    },
    chapterChanged(chapter) {},
    addUnit() {
      console.log('resources: ')
      this.resourceFileList.forEach((item) => {
        console.dir(item)
        this.newUnit.unitResources.push(item.raw)
      })
      const newUnitObj = {
        chapterId: this.currentChapterID,
        unitTitle: this.newUnit.unitTitle,
        unitDescription: this.newUnit.unitDescription,
        unitResources: this.newUnit.unitResources,
        unitVideo: this.newUnit.unitVideo
      }
      console.log('newUnitObj: ', newUnitObj)
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
        unitVideo: null
      }
      this.fileList = []
      this.resourceFileList = []
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
