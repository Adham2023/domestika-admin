<template>
  <div class="chapters">
    <div class="add-button">
      <el-tooltip class="item" effect="dark" content="Add new chapter" placement="top">
        <el-button icon="el-icon-plus" />
      </el-tooltip>
    </div>
    <el-card v-for="(ch, ch_i) in chapters" :key="ch._id" shadow="hover" class="chapter-card">
      <div slot="header" class="clearfix chapter-header">
        <div class="chapter-text">
          <span>{{ ch_i+1 }}. </span>
          <span class="chapterTitle">{{ ch.chapterTitle }}</span>
        </div>
        <div class="chapter-btns">
          <el-tooltip style="margin-right: .5rem" class="item" effect="dark" content="Add new unit" placement="top">
            <el-button icon="el-icon-plus" type="text" @click="addUnit(ch._id)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Edit chapter" placement="top">
            <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-edit" @click="setupChapter(ch)" />
          </el-tooltip>
        </div>
      </div>
      <div v-for="u in ch.units" :key="u._id" class="uits-list-item">
        <div :class="current.unitTitle === u.unitTitle ? 'active' : ''" class="unit-btn" @click="playUnit({unitDescription: u.unitDescription, chapterDescription: ch.chapterDescription, unitTitle: u.unitTitle, videoId: u.videoId, chapterTitle: ch.chapterTitle})">
          {{ u.unitTitle }}
          <el-tooltip class="item" effect="dark" content="Edit unit" placement="top">
            <el-button type="text" icon="el-icon-edit" />
          </el-tooltip>
        </div>
        <el-collapse v-if="u.unitResourcesNames.length > 0" class="collapse">
          <el-collapse-item title="Resources" name="1">
            <template slot="title">
              <div class="collapse-title"><i style="font-size: 14px; margin-right: .3rem" class="el-icon-collection" />Resources</div>
            </template>
            <div v-for="(r, i) in u.unitResourcesNames" :key="i" class="resource-item">
              <el-button icon="el-icon-download" type="text" @click="donwloadFile(r)"> {{ r }} </el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
    <EditChapter />
    <addUnitDialog />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { downloadFile } from '@/api/course'
import EditChapter from './edits/EditChapter'
import addUnitDialog from './edits/addUnit'
export default {
  components: {
    EditChapter,
    addUnitDialog
  },
  computed: {
    ...mapState('course', ['course']),
    ...mapState('video', ['current']),
    chapters() {
      return this.course.courseChaptersArray
    }
  },
  methods: {
    addUnit(chapter_id) {
      this.SET_DIALOGS({ name: 'addUnitDialog', value: true })
      this.SET_CURRENT_CHAPTER_ID(chapter_id)
    },
    setupChapter(ch) {
      const { _id, chapterTitle, chapterDescription } = ch
      this.SET_CURRENT_CHAPTER({ _id, chapterTitle, chapterDescription })
      this.SET_DIALOGS({ name: 'editChapterDialog', value: true })
    },
    ...mapMutations('video', ['SET_CURRENT_OBJECTS']),
    ...mapMutations('edits', ['SET_DIALOGS', 'SET_CURRENT_CHAPTER', 'SET_CURRENT_CHAPTER_ID']),
    playUnit(obj) {
      this.SET_CURRENT_OBJECTS(obj)
      this.$emit('playUnit')
    },
    donwloadFile(f) {
      downloadFile(f).then(res => {
        console.log(res)
        const blob = new Blob([res.data], { type: res.headers['content-type'] })
        const objectURL = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = objectURL
        link.setAttribute('download', f) // or any other extension
        document.body.appendChild(link)
        link.click()
      }).catch(err => {
        console.error(err)
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
        border: 0px solid red;
    }
    .chapter-card {
        width: 90%;
        margin-bottom: 1rem;
        background-color: rgb(255, 255, 255);
    }
    .chapterTitle {
        font-family: 'PT Sans Caption', sans-serif;
        text-transform: uppercase;
    }
    .unit-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
      background-color: rgba(212, 212, 212, 0.267);
      color: black !important;
    }

    .uits-list-item {
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: .5rem;
    }

    .collapse-title {
      padding: 0 .5rem;
    }
    .add-button {
      display: flex;
      width: 100%;
      padding: 0 1.5rem;
      margin-bottom: 1rem;
      justify-content: flex-end;
      align-items: center;
    }

    .add-button > .el-button {
      border: 1px solid transparent;
    }

    .chapter-text  {
      flex: 1;
    }
    .chapter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chapter-btns {
      display: flex;
      align-items: center;
    }

</style>
