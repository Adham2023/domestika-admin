<template>
  <div class="overview-card">
    <el-card style="width: 450px; border: 0px solid red" :body-style="{padding: '0px'}">
      <div class="image-and-play-btn">
        <img width="450" height="350" :src="dataToSend.courseObject.localImageUrl" class="image">
        <el-button class="btn-on-image" type="text" icon="el-icon-video-play" @click="openDialog" />

      </div>
      <div>
        <h3 class="course-title">{{ dataToSend.courseObject.courseTitle }}</h3>
        <div class="staring-date">
          <span>Starting at: </span>
          <time class="time">{{ currentDate }}</time>
        </div>
        <div class="about">
          <!-- <span style="color: gray; font-weight: bold; display: block; margin-bottom: .4rem">About the course </span> -->
          {{ dataToSend.courseObject.courseDescription }}
        </div>
        <div class="price-and-start-btn">
          <span class="price-chip"><span style="font-weight: bold">Price:</span> {{ dataToSend.courseObject.coursePrice }} sum</span>
          <el-button class="start-btn" @click="start()">Start</el-button>
        </div>
      </div>
    </el-card>
    <previewDialog ref="previewDialog"></previewDialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import previewDialog from './previewDialog'
export default {
    components: {
        previewDialog
    },
  data() {
    return {
      currentDate: new Date().toLocaleDateString('en-US')
    }
  },
  computed: {
    ...mapState('newCourse', ['dataToSend'])
  },
  methods: {
    start() {
      this.$store.commit('newCourse/TOGLLE_PREVIEWMODE', false)
     
    },
    openDialog() {
         this.$refs.previewDialog.toggleDialog(true);
    }   
  }
}
</script>

<style>
.overview-card {
    border: 0px solid green;
    display: flex;
    justify-content: center;

}
.time {
    font-size: 13px;
    color: rgb(0, 0, 0);
}

.image-and-play-btn {
    width: 450px;
    height: 350px;
    /* text-align: center; */
    display: grid;
    border: 0px solid green;
    grid-template-rows: 1fr 5rem 1fr;
    grid-template-columns: 1fr 5rem 1fr;
}

.about {
    padding: 1rem;
}

.price-and-start-btn {
    padding: 0 1rem 1rem  1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.price-chip {
    background-color: rgb(1, 70, 1);
    color: white;
    padding: 10px;
    border-radius: 8px;
    overflow: hidden;
}

.start-btn {
    background-color:white;
    color: black;
}
.start-btn:hover {
    background-color: white;
    color: black;
    transform: scale(1.1);
}
.course-title {
    padding: 1rem;
}
.staring-date {
    padding:  0 1rem;
}

.staring-date >span {
    font-weight: bold;
    color: gray;
}

.btn-on-image {
    font-size: 5rem ;
    color: white;
    grid-row: 2 / 3;
     grid-column: 2 /3;
}
.image {
    object-fit:cover;
    grid-row: 1 / 4;
    grid-column: 1/ 4;
}

.bottom {
    padding: 0;
    float: right;
}

.clearfix::before, .clearfix::after {
    display: table;
    content: "";
}

.clearfix::after {
    clear: both;
}
</style>
