import { API } from './interface/API';
import { NamespaceTranslation } from './interface/NamespaceTranslation';
import { load } from './load';
import { TFunction } from './interface/TFunction';
import { translate } from './translate';

export const i18n: API = {
  defaultNamespace: 'translation',
  language: 'en',
  changeLanguage: (language: string) => {
    i18n.language = language;
    window.dispatchEvent(new CustomEvent('languagechange', { detail: language }));
  },
  trans: {},
  t: (namespace?: string): TFunction => translate(namespace, i18n),
  load: (language: string, namespace: NamespaceTranslation) => load(language, namespace, i18n),
};
