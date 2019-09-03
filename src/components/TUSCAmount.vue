<template>
  <span>
    {{ adjusted }} TUSC
    <img class="tiny-icon" src="@/assets/TUSC-icon-tiny.png" />
  </span>
</template>

<script>
export default {
  name: 'TUSCAmount',
  props: ['amount'],
  data() {
  	return {
  	  ADJUSTMENT_FACTOR: Math.pow(10, 8)
  	}
  },
  computed: {
  	adjusted() {
  		return this.amount / this.ADJUSTMENT_FACTOR
  	}
  }
}
</script>

<style scoped>
.tiny-icon {
  height: 0.9em;
  vertical-align: -2px;
}
</style>