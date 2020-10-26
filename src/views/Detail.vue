<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12 book-pic">
          <v-img :src="book.imageURL" max-height="480" contain></v-img>
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12">
          <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>
          <div class="pl-6">
            <p class="display-1 mb-0">{{ book.title }}</p>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-rating
                v-model="rating"
                class=""
                background-color="warning lighten-3"
                color="warning"
                dense
              ></v-rating>
              <span class="body-2 font-weight-thin"> 25 REVIEWS</span>
            </v-card-actions>
            <p class="subtitle-1 font-weight-thin">
              {{ book.caption }}
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-xs-12 col-md-12">
          <v-tabs>
            <v-tab>REVIEWS</v-tab>
            <v-tab-item>
              <v-list :three-line="true" :avatar="true">
                <v-list-item-group color="primary">
                  <v-list-item
                    v-for="(review, i) in reviews"
                    :key="i"
                    :inactive="true"
                  >
                    <v-list-item-avatar>
                      <v-img :src="review.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="review.title"></v-list-item-title
                      ><v-rating
                        v-model="rating"
                        class=""
                        background-color="warning lighten-3"
                        color="warning"
                        dense
                      ></v-rating>
                      <p
                        v-html="review.subtitle"
                      ></p>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-tab-item>
          </v-tabs>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "@/plugins/firebase";
import { skills } from "@/path/array";
import encoding from "encoding-japanese";

export default Vue.extend({
  data: function (): {
    reviews: object[];
    skills: string[];
    book: object;
    rating: number;
    breadcrums: object[];
    item: number;
  } {
    return {
      reviews: [],
      skills,
      book: {},
      rating: 4.5,
      breadcrums: [
        {
          text: this.$route.params.lang,
          disabled: false,
          href: "/",
        },
        {
          text: skills[Number(this.$route.params.skill)],
          disabled: true,
          href: "/",
        },
      ],
      item: 5,
    };
  },
  created() {
    const bookDoc = firebase
      .firestore()
      .collection("reviews")
      .doc(this.$route.params.lang)
      .collection(this.$route.params.skill)
      .doc(this.$route.params.id);

    bookDoc.get().then((doc) => {
      this.book = doc.data() as object;
    });

    bookDoc
      .collection("book")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.reviews.push({
            avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
            title: "test",
            subtitle: doc.data().content,
          });
        });
      });
  },
  methods: {
    decode() {
      const array = encoding.urlDecode(this.$route.params.id);
      const utf16beArray = encoding.convert(array, {
        to: "UNICODE",
        from: "SJIS",
      });
      return encoding.codeToString(utf16beArray);
    },
  },
});
</script>

<style scoped>
</style>