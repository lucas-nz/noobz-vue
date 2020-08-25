import Vue from "vue";
import Vuex from  "vuex";

import getters from "@/store/getter"

Vue.use(Vuex);
const store = new Vuex.Store({
    getters
});

export default store