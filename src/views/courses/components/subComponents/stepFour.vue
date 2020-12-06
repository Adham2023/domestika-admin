<template>
  <div>
    <vueJsonPretty
    :showLine="true"
    :path="'res'"
      :data="[$store.state.newCourse.courseInfo, $store.state.newCourse.chapters]"
    />
  </div>
</template>

<script>
import vueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
export default {
  components: {
    vueJsonPretty
  }
}
</script>

<style>

</style>
