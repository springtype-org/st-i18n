import { API } from './interface/API';
import { Namespace } from './interface/Namespace';
import { load } from './load';
import { TFunction } from './interface/TFunction';
import { translate } from './translate';

export const i18n: API = {
  option: {
    defaults: {
      namespace: 'translation',
    },
    logger: {
      missingKey: true,
      missingLanguage: true,
      missingNamespace: true,
      missingOption: true,
      unknownOption: true,
    },
  },
  language: 'en',
  trans: {},
  t: (ns?: string): TFunction => translate(ns, i18n),
  load: (language: string, ns: Namespace) => load(language, ns, i18n),
};
