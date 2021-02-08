/* eslint-disable no-console */
import { i18n } from '../i18n';

import de from './de.json';
import en from './en.json';

describe('i18n in english', () => {
  it('is defined', () => {
    expect(i18n).toBeDefined();
    expect(i18n.language).toBeDefined();
    expect(i18n.language).toEqual('en');
    expect(i18n.t).toBeInstanceOf(Function);
    expect(i18n.load).toBeInstanceOf(Function);
  });

  it('translate test', () => {
    const t = i18n.t();

    const tNs = i18n.t('ns');

    i18n.load('en', en);
    i18n.load('de', de);

    i18n.language = 'en';

    expect(t('Hello world')).toEqual('Hello world');
    expect(tNs('Max length {length}', { length: '10' })).toEqual('Max length 10');

    expect(
      tNs('I drove about {km} km per {period} with an {carType}.', { km: '10', period: 'week', carType: 'BMW' }),
    ).toEqual('I drove about 10 km per week with an BMW.');

    i18n.language = 'de';

    expect(t('Hello world')).toEqual('Hello Welt');
    expect(tNs('Max length {length}', { length: '10' })).toEqual('Maximale länge 10');

    expect(
      tNs('I drove about {km} km per {period} with an {carType}.', {
        km: '10',
        period: 'Woche',
        carType: 'BMW',
      }),
    ).toEqual('I bin pro Woche ca 10 km mit einem BMW gefahren.');
  });

  it('missing language', () => {
    i18n.language = 'fr';

    console.warn = jest.fn();
    console.info = jest.fn();

    const t = i18n.t('unknow');
    expect(t('In french {traduire}{traduire}', { param: 'unkown' })).toEqual('In french ');
    expect(console.warn).toHaveBeenCalledWith('(i18n) Missing language [lng=fr]');
    expect(console.warn).toHaveBeenCalledWith('(i18n) Missing namespace [lng=fr ns=unknow]');
    expect(console.warn).toHaveBeenCalledWith(
      '(i18n) Missing key [lng=fr ns=unknow key=In french {traduire}{traduire}]',
    );
    expect(console.warn).toHaveBeenCalledWith(
      '(i18n) Missing option [lng=fr ns=unknow key=In french {traduire}{traduire} opt=traduire]',
    );

    expect(console.info).toHaveBeenCalledWith(
      '(i18n) Unknown option [lng=fr ns=unknow key=In french {traduire}{traduire}, opt=param]',
    );
  });
});
