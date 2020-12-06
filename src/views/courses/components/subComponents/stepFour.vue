<template>
  <div>
    <el-button @click="prepareAll()">prepare</el-button>
    <vueJsonPretty
      :show-line="true"
      :path="'res'"
      :data="[$store.state.newCourse.dataToSend]"
    />
  </div>
</template>

<script>
import vueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
export default {
  components: {
    vueJsonPretty
  },
  methods: {
    prepareAll() {
      this.$store.commit('newCourse/prepareData')
    }
  }
}
</script>

<style>

</style>
