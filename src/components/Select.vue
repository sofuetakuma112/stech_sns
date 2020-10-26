<template>
  <v-col class="d-flex" cols="12" sm="6">
    <v-select
      v-model="selected"
      :items="items"
      :label="label"
      @change="passToParent"
    ></v-select>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: function () {
    return {
      selected: this.init,
    };
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    init: {
      type: String,
      required: true,
    },
  },
  methods: {
    passToParent() {
      this.$emit("passToParent", this.selected);
    },
  },
});
</script>