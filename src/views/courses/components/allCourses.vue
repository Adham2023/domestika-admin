<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12" :offset="6">
        <h2>List of Courses</h2>
      </el-col>
      <el-col v-for="i in list" :key="i._id" :span="12" :offset="6">
        <el-card :body-style="{ padding: '1em' }">
          <div style="padding: 14px">
            <span>Yummy hamburger</span>
            <div class="bottom clearfix">
              <time class="time">10/11/2020</time>
              <el-button type="text" class="button" @click="getCourse({id: i._id, title: i.courseTitle})">See all content</el-button>
              <el-button type="text" class="button" @click="watchPreview()">Watch preview</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <previewVideo />
  </div>
</template>

<script>
import { getListOfCourses } from '@/api/courses'
import previewVideo from './previewVideo'
import { Message } from 'element-ui'
export default {
  components: {
    previewVideo
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
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
      getListOfCourses().then(response => {
        this.list = response.data
        this.listLoading = false
      }).catch(err => {
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
