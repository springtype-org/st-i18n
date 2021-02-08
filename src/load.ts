import { Namespace } from './interface/Namespace';
import { API } from './interface/API';

export const load = (language: string, namespace: Namespace, api: API): API => {
  api.trans[language] = namespace;
  return api;
};
