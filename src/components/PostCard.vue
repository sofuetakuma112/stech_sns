<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="250" :src="this.review.imageURL"></v-img>

    <v-card-title>{{ this.review.title }}</v-card-title>

    <v-card-text>
      <!-- <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row> -->

      <div class="my-4 subtitle-1">{{ this.lang }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>読者のレベル感</v-card-title>

    <v-card-text>
      <v-chip class="ma-2" v-if="skills.indexOf(this.skill) === 0">
        {{ this.skill }}
      </v-chip>
      <v-chip class="ma-2" color="cyan" v-if="skills.indexOf(this.skill) === 1">
        {{ this.skill }}
      </v-chip>
      <v-chip class="ma-2" color="primary" v-if="skills.indexOf(this.skill) === 2">
        {{ this.skill }}
      </v-chip>
      <v-chip class="ma-2" color="green" v-if="skills.indexOf(this.skill) === 3">
        {{ this.skill }}
      </v-chip>
    </v-card-text>

    <v-card-actions>
      <router-link
        :to="`/${this.lang}/${this.skills.indexOf(this.skill)}/${encode(
          this.review.title
        )}`"
        >詳細</router-link
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { skills } from "@/path/array";
import encoding from "encoding-japanese";

export default Vue.extend({
  data: () => ({
    loading: false,
    selection: 1,
    reviews: [],
    skills,
  }),
  props: {
    review: {
      type: Object,
      required: true,
    },
    skill: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
  },
  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    encode(keyword: string) {
      if (!keyword) return "";
      const unicodeArray = [];
      for (let i = 0; i < keyword.length; i++) {
        unicodeArray.push(keyword.charCodeAt(i));
      }
      const sjisArray = encoding.convert(unicodeArray, {
        to: "SJIS",
        from: "UNICODE",
      });
      return encoding.urlEncode(sjisArray);
    },
  },
});
</script>