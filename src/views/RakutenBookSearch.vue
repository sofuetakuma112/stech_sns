<template>
  <div>
    <ValidationObserver ref="observer">
      <v-card-title>
        <span class="headline">レビュー投稿</span>
      </v-card-title>
      <ValidationProvider
        v-slot="{ errors }"
        name="書籍名"
        rules="required|max:20"
      >
        <v-card-text>
          <v-text-field
            v-model="search"
            label="Search"
            :error-messages="errors"
            single-line
            hide-details
            ><template v-slot:append-outer>
              <v-btn color="primary" @click="searchBook">検索</v-btn>
            </template></v-text-field
          >
        </v-card-text>
      </ValidationProvider>
    </ValidationObserver>
    <template v-for="result in searchResults">
      <SearchCard
        :key="result.title"
        :result="result"
        @passToParent="openForm"
      />
    </template>
    <Form :book="selectedBook" ref="childDialog" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import SearchCard from "@/components/SearchCard.vue";
import Form from "@/components/Form.vue";

export default Vue.extend({
  components: {
    SearchCard,
    Form,
  },
  data: (): {
    search: string;
    dialog: boolean;
    searchResults: object[];
    selectedBook: object;
  } => ({
    search: "",
    dialog: false,
    searchResults: [],
    selectedBook: {},
  }),
  methods: {
    searchBook() {
      this.searchResults = [];
      axios
        .get(
          `https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&keyword=${this.search}&applicationId=${process.env.VUE_APP_RAKUTEN_APP}`
        )
        .then((res) => {
          res.data.Items.forEach(
            (book: {
              Item: {
                title?: string;
                itemCaption?: string;
                largeImageUrl?: string;
                isbn?: string;
              };
            }) => {
              if (book.Item.isbn) {
                this.searchResults.push({
                  title: book.Item.title,
                  caption: book.Item.itemCaption,
                  imageURL: book.Item.largeImageUrl,
                  isbn: book.Item.isbn,
                });
              }
            }
          );
        });
    },
    openForm(result: object) {
      this.selectedBook = result;
      const refs: any = this.$refs;
      refs.childDialog.open();
    },
  },
});
</script>