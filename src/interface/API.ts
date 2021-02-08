import { Translation } from './Translations';
import { Namespace } from './Namespace';
import { TFunction } from './TFunction';
import { APIOptions } from './APIOptions';

export interface API {
  language: string;
  option: APIOptions;
  trans: Translation;
  t: (ns?: string) => TFunction;
  load: (language: string, ns: Namespace) => API;
}
