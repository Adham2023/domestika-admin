<template>
  <div class="chapters">
    <el-card v-for="ch in chapters" :key="ch._id" shadow="hover" class="chapter-card">
      <div slot="header" class="clearfix">
        <span class="chapterTitle">{{ ch.chapterTitle }}</span>
        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-edit" />
      </div>
      <div v-for="u in ch.units" :key="u._id" class="uits-list-item">
        <div :class="current.unitTitle === u.unitTitle ? 'active' : ''" class="unit-btn" @click="playUnit({unitDescription: u.unitDescription, chapterDescription: ch.chapterDescription, unitTitle: u.unitTitle, videoId: u.video.videoId, chapterTitle: ch.chapterTitle})">{{ u.unitTitle }} </div>
        <el-collapse class="collapse" v-if="u.unitResourcesNames.length > 0">
          <el-collapse-item title="Resources" name="1">
            <template slot="title">
              <div class="collapse-title"><i style="font-size: 14px; margin-right: .3rem" class="el-icon-collection" />Resources</div>
            </template>
            <div  v-for="(r, i) in u.unitResourcesNames" :key="i" class="resource-item">
              <el-button icon="el-icon-download" type="text" @click="donwloadFile(r)"> {{ r }} </el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import {downloadFile} from '@/api/course'
export default {
  mounted() {
    // let obj = {}
    // obj.chapterTitle = this.chapters[0].chapterTitle
    // obj.unitTitle = this.chapters[0].units[0].unitTitle;
    // obj.videoId = this.chapters[0].units[0].video.videoId;
    // this.playUnit(obj)
    // console.log('Mounted: ', this.chapters)
  },
  computed: {
    ...mapState('course', ['course']),
    ...mapState('video', ['current']),
    chapters() {
      return this.course.courseChaptersArray
    }
  },
  methods: {
    ...mapMutations('video', ['SET_CURRENT_OBJECTS']),
    playUnit(obj) {
      this.SET_CURRENT_OBJECTS(obj);
      this.$emit('playUnit');
    },
    donwloadFile(f) {
      downloadFile(f).then(res => {
        console.log(res);
        let blob = new Blob([res.data], {type: res.headers['content-type']})
        let objectURL = URL.createObjectURL(blob);
        const link = document.createElement('a');
            link.href = objectURL;
            link.setAttribute('download', f); //or any other extension
            document.body.appendChild(link);
            link.click();
      }).catch(err => {
        console.error(err);
      })
    }
  }
}
</script>

<style>

    @import url('https://fonts.googleapis.com/css2?family=PT+Sans+Caption&display=swap');
    .chapters {
        display: flex;
        flex-flow: column;
        align-items: center;
        padding: .5rem;
    }
    .chapter-card {
        width: 90%;
        margin-bottom: 1rem;
        background-color: rgb(238, 238, 238);
    }
    .chapterTitle {
        font-family: 'PT Sans Caption', sans-serif;
        text-transform: uppercase;
    }
    .unit-btn {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 2.5rem;
        padding: 0 .2rem;
        cursor: pointer;
        background-color: #fff;
        padding: 0 .5rem;
    }

    .unit-btn:hover {
        background-color: rgb(242, 242, 255);
    }
    .unit-btn.active::before {
      content: "\25b6";
      margin-right: 10px;
    }
    .resource-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 .5rem;
    }
    .resource-item:hover {
      background-color: rgb(5, 11, 63);
      color: white;
    }
    .uits-list-item {
      border-radius: 8px;
      overflow: hidden;
      /* padding: .3rem; */
      margin-bottom: .5rem;
    }

    .collapse-title {
      padding: 0 .5rem;
    }
</style>
