const state = {
  courseInfo: {
    courseTitle: '',
    courseDescription: '',
    coursePreviewVideo: null,
    coursePrice: null 
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
  percentage: 0
}

const mutations = {
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
      .units[unitEditObj.unitIndex].unitResources = unitEditObj.unitResources
    state
      .chapters[unitEditObj
        .chapterIndex]
      .units[unitEditObj.unitIndex].unitVideo = unitEditObj.unitVideo
  },
  SET_COURSE_PREVIEW_VIDEO(state, video) {
    state.courseInfo.coursePreviewVideo = video
  },
  SET_COURSE_TEXT_INFO(state, info) {
    state.courseInfo.courseTitle = info.courseTitle
    state.courseInfo.courseDescription = info.description
    state.courseInfo.coursePrice = info.price
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

