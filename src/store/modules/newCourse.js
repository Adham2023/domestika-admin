import { uploadResource, uploadNewCourse } from '@/api/courses'

const state = {
  courseInfo: {
    courseTitle: '',
    courseDescription: '',
    coursePreviewVideo: null,
    coursePrice: null,
    localPlayUrl: '',
    startingDate: null, 
  },
  chapters: [],
  fileUploadProgress: 0,
  editChapterDialog: false,
  editUnitDialog: false,
  currentEditingChapterId: '',
  currentEditingUnitId: '',
  currentChapterId: '',
  currentUnitId: '',
  percentage: 0,
  dataToSend: {},
  isShowingCourseOverview: true,

  allResouces: [],
  counOfAllFiles: 0,
  countOfSendedFiles: 0,
  currentSendingFile: '',
  finishingDialog: false
}

const mutations = {
  RESET_ALL_DATA_(state) {
    state = {
      courseInfo: {
        courseTitle: '',
        courseDescription: '',
        coursePreviewVideo: null,
        coursePrice: null,
        localPlayUrl: '',
        startingDate: null
      },
      chapters: [],
      fileUploadProgress: 0,
      editChapterDialog: false,
      editUnitDialog: false,
      currentEditingChapterId: '',
      currentEditingUnitId: '',
      currentChapterId: '',
      currentUnitId: '',
      percentage: 0,
      dataToSend: {},
      isShowingCourseOverview: true,

      allResouces: [],
      counOfAllFiles: 0,
      countOfSendedFiles: 0,
      currentSendingFile: '',
      finishingDialog: false
    }
  },
  SET_FINISHING_DIALOG(state, trigger) {
    state.finishingDialog = trigger
  },
  TOGLLE_PREVIEWMODE(state, toggle) { state.isShowingCourseOverview = toggle },
  set_precentage(state, percentage) {
    state.percentage = percentage
  },
  SET_CURRENT_CHAPTER_E(state, id) {
    state.currentChapterId = id
  },
  SET_CURRENT_UNIT_E(state, id) {
    state.currentUnitId = id
  },
  SET_CURRENT_CHAPTER(state, id) {
    state.currentEditingChapterId = id
  },
  SET_DIALOG_TRIGGER(state, triggerObj) {
    state[triggerObj.name] = triggerObj.value
  },
  SET_UPLOAD_PROGRESS(state, progress) {
    state.fileUploadProgress = progress
  },
  ADD_RESOURCE(state, fileName) {
    state.allResources[fileName] = fileName
  },
  REMOVE_RESOURCE(state, fileName) {
    state.allResources[fileName] = undefined
  },
  RESET_CHAPTERS(state) {
    state.chapters = []
  },
  ADD_CHAPTER(state, newChapter) {
    console.log('new Chapter', newChapter)
    if (state.chapters.length > 0) {
      let id = state.chapters[state.chapters.length - 1].id // to get latest id and add 1
      id++
      newChapter.id = id
      newChapter.units = []
      state.chapters.push(newChapter)
    } else {
      newChapter.id = 0
      newChapter.units = []
      state.chapters.push(newChapter)
    }
  },
  ADD_UNIT(state, newUnit) {
    console.log('ch id: ', newUnit.chapterId)
    const units = state.chapters.find(chapter => chapter.id === newUnit.chapterId).units
    if (units.length > 0) {
      let id = units[units.length - 1].id // to get latest id and add 1
      id++
      newUnit.id = id
      units.push(newUnit)
    } else {
      newUnit.id = 0
      units.push(newUnit)
    }
  },
  EDIT_CHAPTER(state, updatedChapter) {
    const indexOfChapter = state.chapters.findIndex(chapter => chapter.id === updatedChapter.id)
    state.chapters[indexOfChapter].chapterTitle = updatedChapter.chapterTitle
    state.chapters[indexOfChapter].chapterDescription = updatedChapter.chapterDescription
  },
  EDIT_UNIT(state, unitEditObj) {
    state
      .chapters[unitEditObj
        .chapterIndex]
      .units[unitEditObj.unitIndex].unitTitle = unitEditObj.unitTitle
    state
      .chapters[unitEditObj
        .chapterIndex]
      .units[unitEditObj.unitIndex].unitDescription = unitEditObj.unitDescription
    state
      .chapters[unitEditObj
        .chapterIndex]
      .units[unitEditObj.unitIndex].unitResourcesNames = unitEditObj.unitResourcesNames
    state
      .chapters[unitEditObj
        .chapterIndex]
      .units[unitEditObj.unitIndex].unitResources = unitEditObj.unitResources

    state
      .chapters[unitEditObj
        .chapterIndex]
      .units[unitEditObj.unitIndex].unitVideo = unitEditObj.unitVideo
    state
      .chapters[unitEditObj
        .chapterIndex]
      .units[unitEditObj.unitIndex].videoFileName = unitEditObj.videoFileName
    state
      .chapters[unitEditObj
        .chapterIndex]
      .units[unitEditObj.unitIndex].localPlayUrl = unitEditObj.localPlayUrl
  },
  SET_COURSE_PREVIEW_VIDEO(state, video) {
    state.courseInfo.coursePreviewVideo = video
  },
  SET_THUMBNAIL_OF_VIDEO(state, image) {
    if (image) {
      state.courseInfo.coursePreviewVideoThumbnailName = image.name
      state.courseInfo.coursePreviewVideoThumbnail = image
    }
  },
  SET_COURSE_TEXT_INFO_RESET(state) {
    state.courseInfo = {
      courseTitle: '',
      courseDescription: '',
      coursePreviewVideo: null,
      coursePrice: null,
      localPlayUrl: '',
      startingDate: null, 
    }
  },
  SET_COURSE_TEXT_INFO(state, info) {
    // alert(info.localImageUrl)
    state.courseInfo.courseTitle = info.courseTitle
    state.courseInfo.courseDescription = info.description
    state.courseInfo.coursePrice = info.price
    state.courseInfo.localPlayUrl = info.localPlayUrl
    state.courseInfo.videoFileName = info.videoFileName
    state.courseInfo.localImageUrl = info.localImageUrl
    state.courseInfo.startingDate = info.startingDate
    // alert(info.localPlayUrl);
  },
  prepareData(state) {
    // 1 set up Course object
    const courseObject = {}
    courseObject.coursePreviewVideo = state.courseInfo.coursePreviewVideo.name
    courseObject.coursePreviewVideoThumbnailName = state.courseInfo.coursePreviewVideoThumbnailName
    courseObject.coursePrice = state.courseInfo.coursePrice
    courseObject.courseTitle = state.courseInfo.courseTitle
    courseObject.courseDescription = state.courseInfo.courseDescription
    courseObject.localPlayUrl = state.courseInfo.localPlayUrl
    courseObject.localImageUrl = state.courseInfo.localImageUrl
    courseObject.startingDate = state.courseInfo.startingDate

    // done with course info placement
    const courseChaptersArray = []
    let chapterUnitsArray = []
    let courseChapterObject = {}
    let unitObject = {}
    state.chapters.forEach(chapter => {
      courseChapterObject = {}
      chapterUnitsArray = []
      courseChapterObject.chapterTitle = chapter.chapterTitle
      courseChapterObject.id = chapter.id
      courseChapterObject.chapterDescription = chapter.chapterDescription
      chapter.units.forEach(unit => {
        unitObject = {}
        unitObject.unitTitle = unit.unitTitle
        unitObject.chapterId = unit.chapterId
        unitObject.id = unit.id
        unitObject.unitDescription = unit.unitDescription
        unitObject.videoFileName = unit.videoFileName
        unitObject.localPlayUrl = unit.localPlayUrl
        unitObject.unitResourcesNames = unit.unitResourcesNames
        chapterUnitsArray.push(unitObject)
      })
      courseChapterObject.units = chapterUnitsArray
      courseChaptersArray.push(courseChapterObject)
    })
    state.dataToSend = {
      courseObject,
      courseChaptersArray
    }
  },
  SET_ALL_RESOURCES(state) {
    state.allResouces = []
    state.allResouces.push(state.courseInfo.coursePreviewVideoThumbnail) // push preview image
    state.allResouces.push(state.courseInfo.coursePreviewVideo) // push preview video
    state.chapters.forEach(chapter => {
      chapter.units.forEach(unit => {
        state.allResouces.push(unit.unitVideo)
        unit.unitResources.forEach(resource => {
          state.allResouces.push(resource)
        })
      })
    })
    console.log(state.allResouces)
    state.counOfAllFiles = state.allResouces.length
  },
  SET_CURRENT_SENDING_FILE(state, fileName) {
    state.currentSendingFile = fileName
  },
  INCREMENT_COUNTER_SENDED_FILES(state) {
    state.countOfSendedFiles++
  }
}

const actions = {
  fileSender({ commit }, file) {
    return new Promise((resolve, reject) => {
      const uploadData = new FormData()
      commit('SET_CURRENT_SENDING_FILE', file.name)
      uploadData.append('resource', file.raw)
      uploadResource({
        formData: uploadData
      })
        .then((res) => {
          commit('INCREMENT_COUNTER_SENDED_FILES')
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  async sendOneByOne({ commit, state, dispatch }) {
    for (let i = 0; i < state.counOfAllFiles; i++) {
      commit('SET_CURRENT_SENDING_FILE', state.allResouces[i].name)
      await dispatch('fileSender', state.allResouces[i])
    }
    return Promise.resolve(true)
  },
  uploadNewCourse({ state }) {
    return new Promise((resolve, reject) => {
      uploadNewCourse(state.dataToSend).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
const getters = {
  units: state => chapterId => {
    if (state.chapters.length > 0) {
      return state.chapters.find(chapter => chapter.id === chapterId).units
    }
    return []
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

