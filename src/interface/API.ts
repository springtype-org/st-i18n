import { Translation } from './Translations';
import { Namespace } from './Namespace';
import { TFunction } from './TFunction';

export interface API {
  language: string;
  defaultNameSpace: string;
  trans: Translation;
  t: (ns?: string) => TFunction;
  load: (language: string, ns: Namespace) => API;
}
