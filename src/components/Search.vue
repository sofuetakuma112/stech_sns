<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="changeSearchModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>検索</v-toolbar-title>
        </v-toolbar>
      </v-card>
      
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
  props: ["dialog"],
  methods: {
    changeSearchModal() {
      this.$emit("changeStatusFromSeach");
    },
  },
});
</script>