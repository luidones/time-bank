import Vue from 'vue';

export function I18NFilter (value) {
    return Vue.i18n.t(value);
}
