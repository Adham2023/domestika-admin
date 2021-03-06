<template>
  <div class="app-container">
    <el-row>
      <el-col
        :xl="{ span: 12, offset: 6 }"
        :lg="{ span: 12, offset: 6 }"
        :md="{ span: 18, offset: 3 }"
        :sm="{ span: 24, offset: 0 }"
        :xs="{ span: 24, offset: 0 }"
      >
        <h2 class="page-title">
          List of Courses <i :class="listLoading ? 'el-icon-loading' : ''" />
        </h2>
      </el-col>
      <el-col
        v-for="(i, index) in list"
        :key="i._id"
        :xl="{ span: 12, offset: 6 }"
        :lg="{ span: 14, offset: 5 }"
        :md="{ span: 18, offset: 3 }"
        :sm="{ span: 24, offset: 0 }"
        :xs="{ span: 24, offset: 0 }"
      >
        <el-card
          shadow="hover"
          class="card-body"
          :body-style="{ padding: '1em' }"
          style="margin-bottom: 1rem"
        >
          <div class="course-card">
            <div class="image-play">
              <el-image
                class="image"
                :src="getImgUrl(i.coursePreviewVideoThumbnailName)"
                fit="cover"
              />
              <el-button
                class="play-btn"
                type="text"
                :disabled="cur_vid.videoLoading && cur_vid.id === i.videoId"
                :icon="
                  cur_vid.videoLoading && cur_vid.id === i.videoId
                    ? 'el-icon-loading'
                    : 'el-icon-video-play'
                "
                @click="playPreview({ id: i.videoId, title: i.courseTitle })"
              />
            </div>
            <div class="card-content-main">
              <div class="title-and-time">
                <div class="title-and-actions">
                  <span class="title">{{ i.courseTitle }}</span>
                  <div class="actions">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="Edit course info"
                      placement="top"
                    >
                      <el-button
                        type="text"
                        icon="el-icon-edit"
                        @click="setEditCourseInfoDialog(index)"
                      />
                    </el-tooltip>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="Delete course permanently"
                      placement="top"
                    >
                      <el-button
                        type="text"
                        style="color: red"
                        icon="el-icon-delete"
                      />
                    </el-tooltip>
                  </div>
                </div>
                <time
                  class="starting-date"
                >starts at:
                  <span style="color: black">{{
                    startingDate(i.startingDate)
                  }}</span></time>
              </div>
              <div class="description">
                <p class="description-cnt">
                  {{ getDescription(i.courseDescription) }}
                  <el-button type="text">more</el-button>
                </p>
              </div>
              <div class="price-and-btn">
                <span
                  class="p-t"
                >Price: $<span class="price">
                  {{ i.coursePrice }}
                </span></span>
                <el-button
                  class="start-the-course"
                  plain
                  @click="goToCourse(i._id)"
                >Start</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <previewVideo />
    <editCourseInfo @fetchAllcourse="fetchData()" />
  </div>
</template>

<script>
import { getListOfCourses } from '@/api/courses'
import previewVideo from './previewVideo'
import { Message } from 'element-ui'
import moment from 'moment'
import { mapActions, mapMutations } from 'vuex'
import editCourseInfo from '../course/components/edits/EditInitInfo'
export default {
  name: 'AllCourses',
  components: {
    previewVideo,
    editCourseInfo
  },
  data() {
    return {
      list: null,
      listLoading: false,
      cur_vid: {
        id: '',
        videoLoading: false
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    setEditCourseInfoDialog(courseIndex) {
      this.$store.commit('edits/SET_CURRENT_COURSE', this.list[courseIndex])
      this.$store.commit('edits/SET_DIALOGS', {
        name: 'editCourseInfoDialog',
        value: true
      })
    },
    goToCourse(id) {
      this.$router.push('/courses/course/' + id)
    },
    ...mapActions('video', ['getVideoCredentials']),
    ...mapMutations('video', [
      'SET_DIALOG',
      'SET_VIDEO_CREDENTIALS',
      'SET_VIDEO_TITLE'
    ]),
    playPreview(video) {
      console.log('Video: ', video)
      this.SET_VIDEO_TITLE(video.title)
      this.cur_vid.id = video.id

      this.cur_vid.videoLoading = true
      this.SET_VIDEO_CREDENTIALS({ otp: '', playbackIno: '' })
      this.getVideoCredentials(video.id)
        .then(() => {
          this.SET_DIALOG(true)
          this.cur_vid.videoLoading = false
        })
        .catch((err) => {
          console.log(err)
          this.cur_vid.videoLoading = false
        })
    },
    getDescription(d) {
      let dCount = d.split(' ')
      if (dCount.length > 18) {
        dCount = dCount.splice(0, 19)
        return dCount.join(' ') + '... '
      } else {
        return d
      }
    },
    getImgUrl(name) {
      return process.env.VUE_APP_BASE_API + '/uploads/' + name
    },
    startingDate(t) {
      console.log(t)
      return moment(t).format('DD.MM.YYYY')
      // return moment.unix(t).format("MM/DD/YYYY");
    },
    watchPreview() {
      this.$store.commit('video/SET_DIALOG', true)
    },
    getCourse({ id, title }) {
      console.log('get course', id, title)
      this.$router.push({
        path: '/courses/course',
        query: { courseId: id, title }
      })
    },
    fetchData() {
      this.listLoading = true
      getListOfCourses()
        .then((response) => {
          this.list = response.data
          this.listLoading = false
        })
        .catch((err) => {
          this.listLoading = false
          Message({
            type: 'error',
            message: err.response.data,
            duration: 3000
          })
        })
    }
  }
}
</script>

<style >
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@600&wght@200display=swap");
@import url("https://fonts.googleapis.com/css2?family=Mukta:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap");

.page-title {
  font-family: "Mukta", sans-serif;
}

.course-card {
  /* border: 1px solid red; */
  display: flex;
  flex-flow: row;
}

.title-and-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-body {
  border-radius: 8px;
}

.card-content-main {
  padding-left: 0.5rem;
  flex: 1;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.description {
  flex: 1;
  font-family: "Nunito", sans-serif;
  font-weight: 200;
  /* border: 1px solid green; */
}
.description-cnt {
}

.title {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  color: rgb(2, 8, 90);
  font-family: "Nunito", sans-serif;
}

.starting-date {
  font-size: 0.8rem;
  color: gray;
}

.price-and-btn {
  display: flex;
  justify-content: space-between;
}
.p-t {
  display: flex;
  align-items: center;
  color: gray;
}
.price {
  /* background-color: rgb(246, 254, 255); */
  color: rgb(39, 39, 39);
  display: flex;
  align-items: center;
  padding: 0.4rem;
  /* border: 1px solid black; */
  border-radius: 5px;
  font-family: "Merriweather", serif;
}

.start-the-course {
  font-weight: bold;
}
.image-play {
  /* height: 250px;
    width: 250px; */
  display: grid;
  border: 0px solid green;
  grid-template-rows: 1fr 2.5rem 1fr;
  grid-template-columns: 1fr 2.5rem 1fr;
  border-radius: 8px;
  overflow: hidden;
}

.image {
  object-fit: cover;
  grid-row: 1 / 4;
  grid-column: 1/ 4;
  width: 250px;
  height: 200px;
}

.play-btn {
  padding: 0;
  font-size: 2.5rem;
  color: white;
  grid-row: 2 / 3;
  grid-column: 2 /3;
  background-color: rgb(32, 1, 1);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

@media only screen and (max-width: 767px) {
  /** xs */
  .course-card {
    /* border: 1px solid red; */
    display: flex;
    flex-flow: column;
  }
  .image {
    object-fit: cover;
    grid-row: 1 / 4;
    grid-column: 1/ 4;
    width: 100%;
    height: 200px;
  }
}

@media only screen and (max-width: 767px) {
  /** sm */
}

@media only screen and (max-width: 767px) {
  /** md */
}

@media only screen and (max-width: 767px) {
  /** lg */
}

@media only screen and (max-width: 767px) {
  /** xl */
}
</style>
