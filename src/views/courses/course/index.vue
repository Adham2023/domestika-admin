<template>
  <el-row :gutter="10" style="height: calc(100vh - 50px); overflow-y: auto">
    <el-col :span="24" style="height: 5rem">
      <!-- Course title -->
      <div class="title-and-tools">
        <h2 class="title">{{ course.courseTitle }}</h2>
        <div class="tools">
          <el-button style="font-size: 20px" icon="el-icon-edit" type="text" />
          <el-button style="font-size: 20px; color: red; margin-left: 2rem" icon="el-icon-delete" type="text" />
        </div>
      </div>
    </el-col>
    <el-col :span="15" class="main-part" style="height: calc(100vh - 50px - 5rem); overflow-y: auto">
      <!-- video part -->
      <mainPart ref="mainPartRef"/>
    </el-col>
    <el-col :span="9"  style="display:flex; align-item: center; flex-flow: column; height: calc(100vh - 50px - 5rem); overflow-y: auto">
      <chapters @playUnit="playCurrentUnit()"/>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import mainPart from './components/mainPart'
import chapters from './components/chapters'
export default {
  components: {
    mainPart,
    chapters
  },
  mounted() {
    this.GET_COURSE(this.$route.params.id).then(() => {
      console.log('got course', this.course)
      let chapter = this.course.courseChaptersArray[0];
      this.SET_CURRENT_OBJECTS({
        unitTitle: chapter.units[0].unitTitle,
        videoId: chapter.units[0].video.videoId,
        chapterTitle: chapter.chapterTitle,
        unitDescription: chapter.units[0].unitDescription,
        chapterDescription: chapter.chapterDescription
      })
      this.playCurrentUnit();
    }).catch(err => {
      console.error(err)
    })
  },
  computed: {
    ...mapState('course', ['course'])
  },
  methods: {
    ...mapMutations('video', ['SET_CURRENT_OBJECTS']),
    ...mapActions('course', ['GET_COURSE']),
    playCurrentUnit() {
      this.$refs.mainPartRef.playUnit();
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=PT+Sans+Caption:wght@700&display=swap');

    .title-and-tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 0px solid red;
        padding: 0 1rem;
    }
    .title {
        font-family: 'PT Sans Caption', sans-serif;
    }

    .tools {
        /* font-size: 24px !important; */
    }

    .main-part::-webkit-scrollbar {
  display: none;
}
</style>
