/* eslint-disable no-console */
import { API } from './interface/API';
import { TFunction } from './interface/TFunction';

const VARIABLE_REGEX = /{([^}]*)}/g;

export const translate = (ns: string | undefined, i18n: API): TFunction => (key: string, options = {}): string => {
  const { language, trans, defaultNamespace } = i18n;
  const namespace = ns || defaultNamespace;

  const namespaces = trans[language] || {};
  if (process.env.NODE_ENV !== 'production' && typeof trans[language] === 'undefined') {
    console.warn(`(i18n) Missing language [lng=${language}]`);
  }
  const pairs = namespaces[namespace] || {};
  if (process.env.NODE_ENV !== 'production' && typeof namespaces[namespace] === 'undefined') {
    console.warn(`(i18n) Missing namespace [lng=${language} ns=${namespace}]`);
  }

  let translation = pairs[key] || key;
  if (process.env.NODE_ENV !== 'production' && typeof pairs[key] === 'undefined') {
    console.warn(`(i18n) Missing key [lng=${language} ns=${namespace} key=${key}]`);
  }

  const consumedOptions = Object.assign({}, options);
  const optionKeys = translation.match(VARIABLE_REGEX) || [];

  for (let index = 0; index < optionKeys.length; index++) {
    const optionRawKey = optionKeys[index];

    // skip duplicates
    if (optionKeys.indexOf(optionRawKey) !== index) {
      continue;
    }
    const optionKey = optionRawKey.substr(1, optionRawKey.length - 2);

    const optionValue = consumedOptions[optionKey] || '';
    if (process.env.NODE_ENV !== 'production' && typeof consumedOptions[optionKey] === 'undefined') {
      console.warn(`(i18n) Missing option [lng=${language} ns=${namespace} key=${key} opt=${optionKey}]`);
    }
    delete consumedOptions[optionKey];
    // fast replace of all duplicates
    translation = translation.split(`{${optionKey}}`).join(optionValue);
  }

  // istanbul ignore else
  if (process.env.NODE_ENV !== 'production') {
    const unusedOptions = Object.keys(consumedOptions);
    for (let index = 0; index < unusedOptions.length; index++) {
      console.info(`(i18n) Unknown option [lng=${language} ns=${namespace} key=${key}, opt=${unusedOptions[index]}]`);
    }
  }
  return translation;
};
