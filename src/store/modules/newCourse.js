
const getDefaultState = () => {
  return {
    courseInfo: {
        courseTitle: '',
        courseDescription: '',
        coursePreviewVideo: null,
    },
    chapters: []
    // chapters: [{
    //     id: 0,
    //     chapterTitle: '',
    //     chapterDescription: '',
    //     units: [{
    //         id: 0,
    //         unitTitle: '',
    //         unitResourses: null, 
    //         unitVideo: null
    //     }]
    // }]
  }
}

const state = getDefaultState()

const mutations = {
    ADD_CHAPTER(state, newChapter) {
        console.log('new Chapter', newChapter)
        if(state.chapters.length > 0) {
            let id = state.chapters[state.chapters.length - 1].id; // to get latest id and add 1
            id++;
            newChapter.id = id;
            newChapter.units = []
            state.chapters.push(newChapter);
        } else {
            newChapter.id = 0;
            newChapter.units = []
            state.chapters.push(newChapter);
        }
    },
    EDIT_CHAPTER(state, updatedChapter) {
        let indexOfChapter = state.chapters.findIndex(chapter => chapter.id == updatedChapter.id)
        state.chapters[indexOfChapter].chapterTitle = updatedChapter.chapterTitle;
        state.chapters[indexOfChapter].chapterDescription = updatedChapter.chapterDescription;
    },
    SET_COURSE_PREVIEW_VIDEO(state, video) {
        state.courseInfo.coursePreviewVideo = video;
    },
    SET_COURSE_TEXT_INFO(state, info) {
        state.courseInfo.courseTitle = info.courseTitle;
        state.courseInfo.courseDescription = info.description;
    }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

