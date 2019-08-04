<template>
  <div id="app">
    <div class="section border">
      <chain-overview/>
    </div>
    <div class="section border">
      <p>Account name: <input type="text" id="searchAddress" v-model="searchAddress"></p>
    </div>
    <router-view :key="$route.fullPath" class="section border"/> 
    <!-- <witnesses class="section border"/> -->
  </div>
</template>

<script>
  import Witnesses from './components/Witnesses.vue'
  import ChainOverview from './components/ChainOverview'

  export default {
    name: 'App',
    data() {
      return {
        search: '',
        searchAddress: '',
      }
    },
    components: {
      Witnesses,
      ChainOverview
    },
    watch: {
      searchAddress: debounce(function(val) {
        this.$router.push({name: 'account', params: {name: val}})
      }, 500)
    },
    mounted() {
      document.getElementById('searchAddress').focus()
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
  background-color: #3B3F3F;
}
.section {
  padding: 15px;
  margin: 10px auto;
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

/* * * provisional dark style */
body {
  background-color: rgb(34, 36, 37);
  color: rgb(209, 203, 199);
}

* {
  border-color: rgb(123, 107, 101);
}

a {
  color: rgb(144, 196, 238);
}
a:visited {
  color: rgb(160, 117, 234);
}

/* * * tabs component */
.tabs-component {
  margin: 0 0;
}
.tabs-component-tabs {
  /*border: solid 1px #ddd;*/
  /*border-radius: 10px;*/
  /*margin-bottom: 5px;*/
}
@media (min-width: 700px) {
  .tabs-component-tabs {
    border: 0;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
    margin-bottom: -1px;
  }
}
.tabs-component-tab {
  font-size: 14px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
}
.tabs-component-tab:not(:last-child) {
  /*border-bottom: dotted 1px #ddd;*/
}
.tabs-component-tab:hover {
  color: #666;
  /* TODO */
}
.tabs-component-tab.is-active {
  color: #000;
  /* TODO */
}
.tabs-component-tab.is-active a {
  text-decoration: underline;
}
.tabs-component-tab.is-disabled * {
  /*color: #cdcdcd;*/
  cursor: not-allowed !important;
}
@media (min-width: 700px) {
  .tabs-component-tab {
    border: solid 1px #ddd;
    border-bottom-style: none;
    border-radius: 3px 3px 0 0;
    margin-right: .5em;
    transform: translateY(2px);
    transition: transform .3s ease;
  }
  .tabs-component-tab.is-active {
    z-index: 2;
    transform: translateY(0);
  }
}
.tabs-component-tab-a {
  align-items: center;
  display: flex;
  padding: .75em 1em;
  text-decoration: none;
}
.tabs-component-panels {
  padding: 4em 0;

  height: 500px;
  overflow-y: auto;

  z-index: -100;
}
@media (min-width: 700px) {
  .tabs-component-panels {
    border-top-left-radius: 0;
    border: solid 1px #ddd;
    border-radius: 0 6px 6px 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .05);
    /*margin-top: 2px;*/
    padding: 2em 1em;
  }
}

/* */
.tabs-component-tabs {
  /*overlfow: scroll;*/
  margin-bottom: 1px;
}

</style>
