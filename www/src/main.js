import './styles/app.less';

import Vue from 'vue';
import router from './core/router';
import i18n from './core/locale';
import validator from './core/validator';
import dialog from './core/dialog';
import http from './core/http';
import directives from './core/directives';
import faComponent from './core/font-awesome';
import 'whatwg-fetch';

Vue.config.productionTip = false;
Vue.i18n = i18n;

directives.register();

const app = new Vue({
    el: '#app',
    router,
    i18n,
    validator
});

dialog.main = app;
