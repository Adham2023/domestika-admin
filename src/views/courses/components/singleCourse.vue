<template>
  <div>
    {{ $attrs }}
  </div>
</template>

<script>
import { getACourse } from '@/api/courses'
export default {
  data() {
    return {
      course: null
    }
  },
  created() {
    this.getACourse()
  },
  methods: {
    getACourse() {
      console.log('current route: ', this.$route)
      getACourse(this.$attrs.courseId)
        .then((res) => {
          this.course = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>
