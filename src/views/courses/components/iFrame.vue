<template>
  <iframe
    src="https://player.vdocipher.com/playerAssets/1.x/vdo/embed/index.html#otp=20160313versASE323NhqVKxEdtT7amcXraxEBRwWvLaQyHyVW0KrgEPBK6q9Go0&playbackInfo=eyJ2aWRlb0lkIjoiZWI0ZWQ3ZTYzYWIxNDk1NTk4MjVhZDIyMGMzODRiYjIifQ==="
    style="border:0;height:360px;width:640px;max-width:100%"
    allowFullScreen="true"
    allow="encrypted-media"
  />
</template>

<script>
export default {
  beforeDestroy() {
    console.log('destroying iframe component')
  }
}
</script>

<style>

</style>
