import { NamespaceTranslation } from './interface/NamespaceTranslation';
import { API } from './interface/API';

export const load = (language: string, namespaceTranslation: NamespaceTranslation, api: API): API => {
  api.trans[language] = namespaceTranslation;
  return api;
};
