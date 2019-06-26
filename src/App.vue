<template>
  <div id="app">
    <!-- <div class="section">
      <p>Search:</p>
      <input type="text" id="search" v-model="search">
    </div> -->
    <div class="section border">
      <router-link to="/">Home</router-link>
    </div>
    <div class="section border">
      <p>Account name: 
        <input type="text" id="searchAddress" v-model="searchAddress">
      </p>
    </div>
    <witnesses class="section border"/>
    <router-view :key="$route.fullPath" class="section border"/>
  </div>
</template>

<script>
  import Witnesses from './components/Witnesses.vue'

  export default {
    name: 'App',
    data() {
      return {
        search: '',
        searchAddress: '',
      }
    },
    components: {
      Witnesses
    },
    watch: {
      searchAddress: debounce(function(val) {
        this.$router.push({name: 'account', params: {name: val}})
      }, 500)
    }
}

// TODO lodash?
function debounce(func, wait) {
  let timeout
  return function() {
    const context = this, args = arguments
    const later = () => timeout = null
    clearTimeout(timeout)
    console.log('debounced')
    timeout = setTimeout(later, wait)
    func.apply(context, args)
  }
}

window.onload = () => {
  document.getElementById('searchAddress').focus()
}
</script>

<style>
html {
  height: 100%;
  line-height: 1.4;
}
body {
  height: 100%;
  margin: 10px 0 0;
}

/* * */
input[type="text"] {
  background-color: #EEE;
}
p {
  margin: 2px 0;
}
hr {
  margin-bottom: 10px;
}

#app {
  padding: 10px;
}

/* * */
.border {
    border: 1px solid black;
    border-radius: 2px;
  }
.section {
  padding: 15px;
  margin: 20px auto;
}
.subsection {
  margin: 20px auto;
  padding: 10px 15px;
}
.indent {
  border-left: 1px solid black;
  padding-left: 15px;
  margin-left: 10px;
}
.long-key {
  word-break: break-word;
  vertical-align: top;
}

/* * */
#log {
  background-color: rgb(45, 47, 48);
  font-family: "Courier New", serif;

  max-height: 50%;

  word-break: break-all;
  overflow-y: auto;
  padding: 10px;
}
.log-item {
  white-space: pre-wrap;
}
.log-indented {
  padding-left: 40px;
}

/* * * provisional dark style */
body {
  background-color: rgb(34, 36, 37);
  color: rgb(209, 203, 199);
}

* {
  border-color: rgb(123, 107, 101) !important;
}

a {
  color: rgb(144, 196, 238);
}
a:visited {
  color: rgb(160, 117, 234);
}
</style>
