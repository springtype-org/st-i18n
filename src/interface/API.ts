import { Translations } from './Translations';
import { NamespaceTranslation } from './NamespaceTranslation';
import { TFunction } from './TFunction';

export interface API {
  language: string;
  changeLanguage: (language: string) => void;
  defaultNamespace: string;
  trans: Translations;
  t: (namespace?: string) => TFunction;
  load: (language: string, translations: NamespaceTranslation) => API;
}
