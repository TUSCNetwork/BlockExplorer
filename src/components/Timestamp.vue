<template>
  <span class="timestamp">
    {{ displayString }}
  </span>
</template>

<script>
export default {
  name: 'Timestamp',
  props: ['timeString'],
  data() {
    return {
      offset: null,
      showUTC: false
    }
  },
  created() {
    this.offset = new Date().getTimezoneOffset()
  },
  mounted() {
    this.$el.addEventListener('click', this.clickHandler)
  },
  computed: {
    time() {
      return new Date(this.timeString + 'Z') // the chain gives us UTC times, which Z represents
    },
    displayString() {
      return this.showUTC ? this.UTCMessage : this.localMessage
    },
    /* */
    localTimezone() {
      let timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone
      return timeZoneName || this.time.toString().split(' ')[5]
    },
    localMessage() {
      let message = `${this.time.toLocaleTimeString()}, ${this.time.toLocaleDateString()}`
      if(this.localTimezone)
        message += ` in ${this.localTimezone}`
      return message
    },
    /* */
    UTCMessage() {
      let timeUTC = new Date(this.time.getTime() + this.offset * 60000)
      return `${timeUTC.toLocaleTimeString()}, ${timeUTC.toLocaleDateString()} in UTC`
    }
  },
  methods: {
    clickHandler() {
      this.showUTC ^= 1
    }
  }
}
</script>

<style scoped>
.timestamp {
  border-bottom: 1px dotted #FFF;
  cursor: pointer;
}
</style>
