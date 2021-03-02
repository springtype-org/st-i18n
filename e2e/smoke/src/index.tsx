import { tsx, render } from 'springtype';
import { Props } from 'springtype-types';
import { i18n, Trans } from '../../../dist';
import de from './de.json';
import en from './en.json';
import { NamespaceTranslation } from '../../../dist/interface/NamespaceTranslation';

i18n.load('en', en as NamespaceTranslation);
i18n.load('de', de as NamespaceTranslation);

i18n.language = 'de';

const Cool = ({ children }: Props) => <b>{children} cool!</b>;

export const TranslationCmp = () => {
  const onButtonClick = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en');
  };

  return (
    <fragment>
      <Trans tagName="h1" style={{ padding: 25 }} ns="ns" tOption={{ text: 'springtype' }}>
        <fragment>
          <b style={{ fontSize: 18 }}>
            Hello <i>dude</i>
          </b>
          <br />
          {' Say '}
          <Cool>
            <a href="https://github.com/springtype-org/" target="_blank">
              <fragment>{'{text}'}</fragment>
            </a>
          </Cool>
        </fragment>
      </Trans>
      <br />
      <button style={{ marginTop: 5 }} onClick={onButtonClick}>
        <Trans>Change language</Trans>
      </button>
    </fragment>
  );
};

render(<TranslationCmp />);
