<template>
  <span>
    {{ amount.amount }} units of asset <router-link to="TODO">{{ amount.asset_id }}</router-link>
  </span>
</template>

<script>
export default {
  name: 'AssetAmmount',
  props: ['amount']
}
</script>

<style scoped>
</style>
