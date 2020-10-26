<template>
  <span class="fakeLink" @click="passToParent">
    <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <v-img :src="result.imageURL" height="160px" />
      </v-col>
      <v-col cols="12" sm="8">
        <v-layout column justify-space-between style="padding: 0.8em 1.3em">
          <div>
            <h3 class="name">{{ result.title }}</h3>
          </div>
          <div>
            <p class="desc">{{ result.caption | truncate }}</p>
          </div>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    show: false,
  }),
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  filters: {
    truncate: function (value: string) {
      const length = 50;
      const ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
  },
  methods: {
    passToParent() {
      this.$emit("passToParent", this.result)
    }
  }
});
</script>

<style scoped>
.fakeLink {
  cursor: pointer;
  user-select: none;
}
.fakeLink:hover {
  opacity: 0.6;
}
</style>
