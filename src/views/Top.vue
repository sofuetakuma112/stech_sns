<template>
  <div>
    <v-container
      v-for="align in alignments"
      :key="align"
      class="grey lighten-5 mb-4"
    >
      <v-container fluid>
        <v-row>
          <Select
            :items="langs"
            :label="'言語'"
            :init="lang"
            @passToParent="changeLang"
          />
          <Select
            :items="skills"
            :label="'スキルレベル'"
            :init="skill"
            @passToParent="changeSkill"
          />
        </v-row>
      </v-container>

      <v-row :align="align" no-gutters>
        <v-col v-for="review in reviews" :key="review.name">
          <PostCard :review="review" :skill="skill" :lang="lang" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "@/plugins/firebase";
import PostCard from "@/components/PostCard.vue";
import Select from "@/components/Select.vue";
import { langs, skills } from "@/path/array";

export default Vue.extend({
  data: (): {
    alignments: string[];
    reviews: object[];
    langs: string[];
    skills: string[];
    lang: string;
    skill: string;
  } => ({
    alignments: ["start"],
    reviews: [],
    langs,
    skills,
    lang: "Javascript",
    skill: "個人開発したことがある",
  }),
  created() {
    firebase
      .firestore()
      .collection("reviews")
      .doc(this.lang)
      .collection(String(this.skills.indexOf(this.skill)))
      .get()
      .then((res) => {
        res.forEach((doc) => {
          this.reviews.push(doc.data());
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  },
  components: {
    PostCard,
    Select,
  },
  methods: {
    changeLang(lang: string) {
      this.lang = lang;
      this.fetchReview();
    },
    changeSkill(skill: string) {
      this.skill = skill;
      this.fetchReview();
    },
    fetchReview() {
      this.reviews = [];
      firebase
        .firestore()
        .collection("reviews")
        .doc(this.lang)
        .collection(String(this.skills.indexOf(this.skill)))
        .get()
        .then((res) => {
          res.forEach((doc) => {
            this.reviews.push(doc.data());
          });
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
  },
});
</script>