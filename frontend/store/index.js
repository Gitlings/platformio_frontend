import Vue from 'vue';
import Vuex from 'vuex';
import gameUi from './modules/gameUi';
import players from './modules/players';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    gameUi,
    players,
  },
});
