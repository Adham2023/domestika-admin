import axios from 'axios'
import { deleteResource, uploadResource } from '@/api/courses'

export default {
  methods: {
    uploadPreviewVideo(param) {
      this.cancelTokenSource = axios.CancelToken.source()
      const uploadData = new FormData()
      uploadData.append('resource', param.file)
      console.log('this is upload data: ', uploadData)
      uploadResource({
        cancelTokenSource: this.cancelTokenSource,
        formData: uploadData
      })
        .then((res) => {
          console.log(res.data)
          param.onSuccess()
        })
        .catch((err) => {
          param.onError(err)
        })
    },
    checkIfResouceCanBeDeleted(file, fileList) {
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
    removingFile(file, fileList) {
      this.cancelTokenSource.cancel()
      this.stepOneForm.file = null
      this.stepOneForm.videoFileName = ''
      this.fileList = []
    },
    fileChanged(file, fileList) {
      if (file.status === 'ready') {
        this.stepOneForm.localPlayUrl = this.getLocalUrl(file)
        this.stepOneForm.videoFileName = file.name
        this.stepOneForm.file = file
        console.log('file: ', file)
        this.fileList.push(file)
        if (this.fileList.length > 1) {
          const a = this.fileList.shift()
          deleteResource(a.name)
            .then((res) => {
              console.log(res.data)
            })
            .catch((err) => console.error(err))
        }
        this.$store.commit('newCourse/SET_COURSE_PREVIEW_VIDEO', file)
      }
      // set preview video of course
    },

    validateForVideoForm() {
      let validVal = false
      this.$refs.stepOneFormRef.validate((valid) => {
        validVal = valid && this.fileList.length > 0
        console.log(this.fileList.length > 0)
        if (!valid) {
          return false
        } else {
          return true
        }
      })
      return validVal
    }
  }
}
