const state = {
  editCourseInfoDialog: false,
  editChapterDialog: false,
  addUnitDialog: false,
  currentCourse: {},
  currentChapter: {},
  currentChapter_id: null, // current chapter id to add unit to it
  newCoursePreviewVideo: null
}

const mutations = {
  SET_CURRENT_CHAPTER_ID(state, id) {
    state.currentChapter_id = id
  },
  SET_NEW_COURSE_PREVIEW_VIDEO(state, newVideoFile) {
    state.newCoursePreviewVideo = newVideoFile
  },
  SET_DIALOGS(state, dialogObj) {
    state[dialogObj.name] = dialogObj.value
  },
  SET_CURRENT_COURSE(state, course) {
    const { courseDescription,
      coursePreviewVideoThumbnailName,
      courseTitle,
      coursePrice,
      startingDate,
      videoId,
      _id } = course
    state.currentCourse.courseDescription = courseDescription + ''
    state.currentCourse.coursePreviewVideoThumbnailName = coursePreviewVideoThumbnailName + ''
    state.currentCourse.courseTitle = courseTitle + ''
    state.currentCourse.coursePrice = parseFloat(coursePrice + '')
    state.currentCourse.startingDate = startingDate + ''
    state.currentCourse.videoId = videoId + ''
    state.currentCourse._id = _id + ''
  },
  SET_CURRENT_CHAPTER(state, chapter) {
    state.currentChapter._id = chapter._id
    state.currentChapter.chapterTitle = chapter.chapterTitle
    state.currentChapter.chapterDescription = chapter.chapterDescription
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

