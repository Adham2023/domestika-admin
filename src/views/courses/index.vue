<template>
  <div class="app-container">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  created() {
    const vdocipher = document.createElement('script')
    vdocipher.setAttribute('src', 'https://dev.vdocipher.com/playerAssets/1.6.10/vdo.js')
    document.head.appendChild(vdocipher)
  },
  methods: {
  }
}
</script>
