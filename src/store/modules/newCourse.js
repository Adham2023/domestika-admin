const state = {
  courseInfo: {
    courseTitle: '',
    courseDescription: '',
    coursePreviewVideo: null,
    coursePrice: null,
    localPlayUrl: ''
  },
  chapters: [],
  allResources: {},
  fileUploadProgress: 0,
  editChapterDialog: false,
  editUnitDialog: false,
  currentEditingChapterId: '',
  currentEditingUnitId: '',
  currentChapterId: '',
  currentUnitId: '',
  percentage: 0,
  dataToSend: {},
  isShowingCourseOverview: true
}

const mutations = {
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
    state.courseInfo.coursePreviewVideoThumbnail = image.name
  },
  SET_COURSE_TEXT_INFO(state, info) {
    alert(info.localImgUrl)
    state.courseInfo.courseTitle = info.courseTitle
    state.courseInfo.courseDescription = info.description
    state.courseInfo.coursePrice = info.price
    state.courseInfo.localPlayUrl = info.localPlayUrl
    state.courseInfo.videoFileName = info.videoFileName
    state.courseInfo.localImageUrl = info.localImgUrl
    // alert(info.localPlayUrl);
  },
  prepareData(state) {
    // 1 set up Course object
    const courseObject = {}
    courseObject.coursePreviewVideo = state.courseInfo.coursePreviewVideo.name
    courseObject.coursePreviewVideoThumbnail = state.courseInfo.coursePreviewVideoThumbnail
    courseObject.coursePrice = state.courseInfo.coursePrice
    courseObject.courseTitle = state.courseInfo.courseTitle
    courseObject.courseDescription = state.courseInfo.courseDescription
    courseObject.localPlayUrl = state.courseInfo.localPlayUrl
    courseObject.localImageUrl = state.courseInfo.localImageUrl
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
  }
}

const actions = {}
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

