<template>
  <el-row class="step-one-body" style="height: 100%; overflow-y: auto">
    <el-col :span="14" :offset="4" style="border: 1px solid red">
      <el-form ref="stepOneFormRef" :rules="rules" :model="stepOneForm">
        <el-form-item>
          <el-col :span="12" :offset="6">
            <el-form-item label="Course title" prop="courseTitle">
              <el-input
                v-model="stepOneForm.courseTitle"
                placeholder="Some title ..."
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12" :offset="6">
            <el-form-item label="Course description" prop="description">
              <el-input
                v-model="stepOneForm.description"
                type="textarea"
                :rows="2"
                placeholder="Short abput course"
              />
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12" :offset="6">
            <el-form-item prop="description">
              <el-upload
                ref="upload"
                class="upload-demo"
                name="coursePreview"
                :auto-upload="false"
                action=""
                :multiple="false"
                :on-change="fileChanged"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                >Select preview video</el-button>
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
export default {
  data() {
    return {
      stepOneForm: {
        courseTitle: '',
        description: ''
      },
      rules: {
        courseTitle: [
          { required: true, trigger: 'change', message: 'Please give a title' }
        ]
      }
    }
  },
  methods: {
    fileChanged(file, fileList) {
      console.log('single file: ', file)
      console.log('list of files: ', fileList)
    }
  }
}
</script>

<style>
.step-one-body {
  border: 1px solid red;
}
</style>
