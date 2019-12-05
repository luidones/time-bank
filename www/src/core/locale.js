import Vue from 'vue';
import VueI18n from 'vue-i18n';

import errors from '@/assets/locales/errors.json';
import formats from '@/assets/locales/formats.json';

const messages = {};
for (let lang in errors)
    messages[lang] = {
        ...errors[lang],
        ...formats[lang]
    };

Vue.use(VueI18n);

const LOCALE_KEY = 'timebank.locale';

export function GetLocale() {
    return localStorage.getItem(LOCALE_KEY) || 'pt-BR';
}

export const INITIAL_LOCALE = GetLocale();

export const NUMERIC_SETTINGS = {
    precision: 2,
    decimal: formats[INITIAL_LOCALE].formats.money.decimal,
    thousands: formats[INITIAL_LOCALE].formats.money.thousands
};

const subscriptions = [];
export const Notifier = {
    subscribe: function(f) {
        subscriptions.push(f);
        return f;
    },
    unsubscribe: function(f) {
        const index = subscriptions.indexOf(f);
        if (index >= 0) subscriptions.splice(index, 1);
    },
    propagate: function() {
        for (let i=0; i < subscriptions.length; i++)
            subscriptions[i](NUMERIC_SETTINGS);
    }
}

export function UpdateLocale(locale, root) {
    root.$i18n.locale = locale;
    root.$validator.localize(locale);

    NUMERIC_SETTINGS.decimal = root.$i18n.t('formats.money.decimal');
    NUMERIC_SETTINGS.thousands = root.$i18n.t('formats.money.thousands');

    localStorage.setItem(LOCALE_KEY, locale);
    Notifier.propagate();
}

export default new VueI18n({
    locale: INITIAL_LOCALE,
    silentTranslationWarn: true,
    messages
});
