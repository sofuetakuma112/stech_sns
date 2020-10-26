<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-toolbar-title><router-link to="/">Progrev</router-link></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon @click="changeSearchModalStatus">mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="() => {}">
            <v-list-item-title>
              <router-link to="/">HOME</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="() => {}">
            <v-list-item-title>
              <router-link to="/register">Register</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="() => {}">
            <v-list-item-title>
              <router-link to="/post-review">新規投稿</router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data: () => ({
    collapseOnScroll: true,
    searchModal: false
  }),
  methods: {
    changeSearchModalStatus() {
      this.$emit('changeStatus')
    }
  }
});
</script>