<template>
  <div class="progress-tracker" :style="{top: index * 90 + 10 + 'px'}">
    <div class="title-and-close">
      <div class="title-of-uploading-file">File name</div>
      <el-button icon="el-icon-close" type="text" />
    </div>
    <el-progress :percentage="$store.state.newCourse.percentage" />
  </div>
</template>

<script>
export default {
  name: 'Progress',
  props: {
    index: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
    .progress-tracker {
        display: none;
        position: absolute;
        z-index: 999999;
        width: 20%;
        /* display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center; */
        height: 70px;
        right: 10px;
        border: 1px solid rgb(206, 206, 206);
        background-color: rgb(255, 255, 255);
        padding: 10px;
        border-radius: 8px;
    }
    .title-and-close {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: flex-start;
    }
</style>
