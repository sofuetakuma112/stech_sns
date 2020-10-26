<template>
  <v-app>
    <NavBar @changeStatus="searchModal = !searchModal" />
    <router-view></router-view>
    <Search :dialog="searchModal" @changeStatusFromSeach="searchModal = !searchModal" />
    <Footer />
  </v-app>
</template>

<script lang="ts">
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import Search from './components/Search.vue'
import Vue from "vue"

export default Vue.extend({
  name: 'App',

  components: {
    NavBar,
    Footer,
    Search
  },

  data: () => ({
    searchModal: false
  }),
});
</script>
