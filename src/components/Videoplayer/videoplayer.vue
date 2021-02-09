<template>
  <div ref="container" class="player" />
</template>

<script>
export default {
  name: 'Player',
  props: {
    otp: {
      type: String,
      required: true
    },
    playbackInfo: {
      type: String,
      required: true
    }
  },
  data: () => ({
    videoObject: null
  }),
  mounted() {
    if (window.VdoPlayer) {
      return this.loadPlayer()
    }
    const playerScript = document.createElement('script')
    playerScript.src =
      'https://player.vdocipher.com/playerAssets/1.6.10/vdo.js'
    document.body.appendChild(playerScript)
    playerScript.addEventListener('load', () => {
      return this.loadPlayer()
    })
  },
  methods: {
    loadPlayer: function() {
      window.playerContainer = this.$refs.container
      new window.VdoPlayer({
        otp: this.$props.otp,
        playbackInfo: this.$props.playbackInfo,
        theme: '9ae8bbe8dd964ddc9bdb932cca1cb59a',
        container: this.$refs.container
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player {
  height: auto;
  width: 100%;
}
</style>
