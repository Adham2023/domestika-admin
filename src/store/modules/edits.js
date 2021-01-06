const state  = {
    editCourseInfoDialog: false,
    currentCourse: {}, 
    newCoursePreviewVideo: null, 
}

const mutations = {
    SET_NEW_COURSE_PREVIEW_VIDEO(state, newVideoFile) {
        state.newCoursePreviewVideo = newVideoFile
    },
    SET_DIALOGS(state, dialogObj) {
        state[dialogObj.name] = dialogObj.value
    },
    SET_CURRENT_COURSE(state, course) {
        let {   courseDescription, 
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

