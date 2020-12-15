<template>
  <el-row
    style="
      border: 0px solid orange;
      height: 100%;
      overflow-y: scroll;
      padding: 5rem 0;
    "
  >
    <el-col
      :xs="{ span: 24, offset: 0 }"
      :sm="{ span: 20, offset: 2 }"
      :lg="{ span: 18, offset: 3 }"
      :xl="{ span: 16, offset: 4 }"
      style=""
    >
      <el-col
        v-if="isShowingCourseOverview"
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 20, offset: 2 }"
        :lg="{ span: 20, offset: 2 }"
        :xl="{ span: 18, offset: 3 }"
        style=" "
      >
        <h3 style="text-align: center">This is course preview card</h3>
        <courseOverviewCard />
      </el-col>
      <!-- course overview -->

      <el-col
        v-if="!isShowingCourseOverview"
        class="backButton"
        :span="24"
        style="height: 2rem; border: 0px solid green"
      >
        <el-button
          type="text"
          icon="el-icon-arrow-left"
          @click="$store.commit('newCourse/TOGLLE_PREVIEWMODE', true)"
        >
          Course card
        </el-button>
      </el-col>

      <el-col
        v-if="!isShowingCourseOverview"
        :span="14"
        class="main-part"
        style="
          border: 0px solid green;
          height: calc(100% - 2rem);
          overflow-y: auto;
        "
      >
        <div class="video-and-description">
          <div class="video">
            <el-col>
              <video
                ref="videoFile"
                width="100%"
                controls
                class="myvideo"
                :src="currentVideoUrl + ''"
                type="video/quicktime"
                style="height: 100%"
              >
                <source :src="currentVideoUrl + ''" type="video/quicktime">
                <!-- <source :src="currentVideoUrl + ''"  /> -->
                Your browser does not support HTML5 video.
              </video>
            </el-col>
          </div>
          <div class="descriotions">
            chapter descr: {{ currentChapter.chapterDescription }}
          </div>
          <div class="descriotions">
            unit descr: {{ currentUnitDescription }}
          </div>
        </div>
      </el-col>
      <el-col
        v-if="!isShowingCourseOverview"
        :span="10"
        style="
          border: 0px solid black;
          height: calc(100% - 2rem);
          overflow-y: auto;
        "
      >
        <ul style="list-style: none">
          <li v-for="(chapter, ch_index) in chapters" :key="chapter.id">
            <p
              style="font-weight: bold"
              :class="
                currentChapterId === chapter.id
                  ? 'active-chapter'
                  : 'not-active-chapter'
              "
            >
              {{ chapter.chapterTitle }}
            </p>
            <ul style="list-style: none">
              <li
                v-for="(unit, u_index) in chapter.units"
                :key="unit.id"
                style="border-bottom: 0px solid gray"
                :class="
                  currentUnitId === unit.id &&
                    currentChapterId === unit.chapterId
                    ? 'list-active'
                    : 'list'
                "
                @click="
                  setCurrentVideo({
                    descr: unit.unitDescription,
                    url: unit.localPlayUrl,
                    id: unit.id,
                    chapterId: unit.chapterId,
                    uTitle: unit.unitTitle,
                    chTitle: chapter.chapterTitle
                  })
                "
              >
                <p style="font-weight: bolder; width: 100%">
                  {{ unit.unitTitle }}
                </p>
                <el-collapse
                  v-if="unit.unitResourcesNames.length > 0"
                  :key="unit.id"
                  v-model="activeName"
                  style="width: 95%; background-color: rgb(230, 253, 255)"
                  @change="resourceHandle"
                >
                  <el-collapse-item :name="ch_index + '-' + u_index">
                    <template slot="title">
                      <div class="resouce-and-icon">
                        Resouces <i :class="activeName.includes(ch_index + '-' + u_index)? 'el-icon-folder-opened' : 'el-icon-folder' " />
                      </div>
                    </template>
                    <li
                      v-for="(resource, index) in unit.unitResourcesNames"
                      :key="index"
                    >
                      {{ resource }}
                    </li>
                  </el-collapse-item>
                </el-collapse>
              </li>
            </ul>
          </li>
        </ul>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import courseOverviewCard from './courseOverviewCard/index'
export default {
  components: {
    courseOverviewCard
  },
  data() {
    return {
      currentVideoUrl: '',
      currentChapterId: 0,
      currentUnitId: 0,
      currentUnitDescription: '',
      currentChapterTitle: '',
      currentUnitTitle: '',
      actName: '',
      activeName: [],
      i: 0
      // isShowingCourseOverview: true
    }
  },
  computed: {
    ...mapState('newCourse', ['dataToSend', 'isShowingCourseOverview']),
    chapters() {
      return this.dataToSend.courseChaptersArray
    },
    currentChapter() {
      if (this.dataToSend.courseChaptersArray !== undefined) {
        const index = this.dataToSend.courseChaptersArray.findIndex(
          (chapter) => chapter.id === this.currentChapterId
        )
        if (index !== -1) return this.chapters[index]
        else return {}
      } else {
        return {}
      }
    }
  },
  methods: {
    resourceHandle(r) {
      if (r.length > 0) {
        this.activeName = r[r.length - 1]
      }
      // this.activeName = [this.currentChapterTitle +'-'+this.currentUnitTitle];
    },
    setCurrentVideo(param) {
      this.currentVideoUrl = param.url
      this.currentChapterId = param.chapterId
      this.currentUnitId = param.id
      this.currentUnitDescription = param.descr
      this.currentChapterTitle = param.chTitle
      this.currentUnitTitle = param.uTitle
    }
  }
}
</script>

<style>
.main-part::-webkit-scrollbar {
  display: none;
}

.backButton {
  display: flex;
  align-items: center;
  /* color: #f0f0f0; */
}

.list {
  color: gray;
}

.list-active {
  /* position: relative; */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: rgb(7, 65, 33);
  /* background-color: rgb(230, 253, 255); */
}

.list-active > p::before {
  /* position: absolute; */
  content: "\25b6";
  /* height: 10px; */
  /* width: 10px; */
  font-size: 12px;
  margin-right: 10px;
}

.not-active-chapter {
  background-color: rgb(216, 216, 216);
  color: black;
  padding: 0.2rem;
}

.active-chapter {
  background-color: rgb(39, 51, 77);
  color: white;
  padding: 0.2rem;
}

.resouce-and-icon {
  display: flex;
  align-items: center;
}

.resouce-and-icon > i {
  font-weight: bold;
  font-size: 14px;
  margin-left: 0.2rem;
}
</style>

