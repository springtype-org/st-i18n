import { API } from './interface/API';
import { Namespace } from './interface/Namespace';
import { load } from './load';
import { TFunction } from './interface/TFunction';
import { translate } from './translate';

export const i18n: API = {
  defaultNameSpace: 'translation',
  language: 'en',
  trans: {},
  t: (ns?: string): TFunction => translate(ns, i18n),
  load: (language: string, ns: Namespace) => load(language, ns, i18n),
};
