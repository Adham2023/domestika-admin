import axios from 'axios'
import { deleteResource, uploadResource } from '@/api/courses'

export default {
  methods: {
    uploadImagePreviewVideo(param) {
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
    checkIfImageResouceCanBeDeleted(file, fileImageList) {
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
    removingImageFile(file, fileImageList) {
      this.cancelTokenSource.cancel()
      this.stepOneForm.imageFile = null
      this.stepOneForm.localImageUrl = null
      this.fileImageList = []
    },
    fileImageChanged(file, fileImageList) {
      if (file.status === 'ready') {
        this.stepOneForm.localImageUrl = this.getLocalUrl(file)
        console.log('local image url: ', this.stepOneForm.localImageUrl)
        this.stepOneForm.imageFile = file
        console.log('file: ', file)
        this.fileImageList.push(file)
        if (this.fileImageList.length > 1) {
          const a = this.fileImageList.shift()
          deleteResource(a.name)
            .then((res) => {
              console.log(res.data)
            })
            .catch((err) => console.error(err))
        }
        this.$store.commit('newCourse/SET_THUMBNAIL_OF_VIDEO', file)
      }
      // set preview video of course
    },
    validateForImageForm() {
      let validVal = false
      this.$refs.stepOneFormRef.validate((valid) => {
        validVal = valid && this.fileImageList.length > 0
        console.log(this.fileImageList.length > 0)
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
