import Vue from 'vue';
import VueI18n from 'vue-i18n';
import moment from 'moment';

import 'moment/locale/de';

import en from '@/assets/i18n/en.json';
import de from '@/assets/i18n/de.json';

Vue.use(VueI18n);

export const DEFAULT_LANGUAGE = process.env.VUE_APP_I18N_LOCALE || 'en';

const i18n = new VueI18n({
  locale: DEFAULT_LANGUAGE,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: {
    en,
    de,
  },
});

moment.locale(DEFAULT_LANGUAGE);

export function setLang(lang) {
  const language = localStorage.getItem('lang') || lang;
  i18n.locale = i18n.messages[language] !== undefined ? language : DEFAULT_LANGUAGE;
  moment.locale(i18n.locale);
}

export default i18n;
