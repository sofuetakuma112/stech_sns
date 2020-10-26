<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <v-card-title>
            <span class="headline">レビュー投稿</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="book.title"
              :error-messages="errors"
              label="教材名"
              disabled
            ></v-text-field>
            <ValidationProvider
              v-slot="{ errors }"
              name="レビュー"
              rules="required"
            >
              <v-textarea
                v-model="content"
                :error-messages="errors"
                label="レビュー"
                required
              ></v-textarea>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="言語"
              rules="required"
            >
              <v-select
                v-model="lang"
                :items="langs"
                :error-messages="errors"
                label="言語"
                data-vv-name="select"
                required
              ></v-select>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="スキルレベル"
              rules="required"
            >
              <v-select
                v-model="skill"
                :items="skills"
                :error-messages="errors"
                label="スキルレベル"
                data-vv-name="select"
                required
              ></v-select>
            </ValidationProvider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
            <v-btn
              color="blue darken-1"
              :disabled="invalid"
              text
              @click="submit"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </ValidationObserver>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "@/plugins/firebase";
import { langs, skills } from "@/path/array";

export default Vue.extend({
  data: function (): {
    content: string;
    skill: string;
    lang: string;
    errors: string;
    skills: string[];
    langs: string[];
    dialog: boolean;
  } {
    return {
      content: "",
      skill: "",
      lang: "",
      errors: "",
      skills,
      langs,
      dialog: false,
    };
  },
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {
    submit() {
      const titleDoc = firebase
        .firestore()
        .collection("reviews")
        .doc(this.lang)
        .collection(String(this.skills.indexOf(this.skill)))
        .doc(this.book.title);
      titleDoc.set({
        title: this.book.title,
        imageURL: this.book.imageURL,
        caption: this.book.caption,
        isbn: this.book.isbn,
      });
      titleDoc
        .collection("book")
        .add({
          content: this.nl2br(this.content),
          // skill: this.skills.indexOf(this.skill),
          // lang: this.lang,
        })
        .then(() => {
          this.dialog = false;
          this.content = "";
          this.skill = "";
          this.lang = "";
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    nl2br(str: string) {
      return str.replace(/\n/g, "<br>");
    },
  },
});
</script>