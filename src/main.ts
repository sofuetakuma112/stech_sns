import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify';
import router from "@/router"
import "@/plugins/firebase"

import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import ja from "vee-validate/dist/locale/ja.json";
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
for (const rule in rules) {
  extend(rule, rules[rule]);
}
localize("ja", ja);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
