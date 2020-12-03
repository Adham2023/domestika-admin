const state = {
  courseInfo: {
    courseTitle: '',
    courseDescription: '',
    coursePreviewVideo: null
  },
  chapters: []
}


const mutations = {
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

