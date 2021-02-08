<h1 align="center">SpringType: st-i18n</h1>

<p align="center">
  Nano library for client-side translation
</p>

[![Gitter](https://badges.gitter.im/springtype-official/springtype.svg)](https://gitter.im/springtype-official/springtype?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

<h2 align="center">Purpose</h2>

This is an exremely tiny, yet powerful library for translation. `st-i18n` does also handle string interpolation for advanced translation needs.

<h2 align="center">Features</h2>

- ✅ Implements a simple, i18next-like API including string interpolation 
- ✅ Comes with namespace support
- ✅ Tiny: `441 bytes` (best, brotli) - `599 bytes` (worst, umd, gz)
- ✅ Zero dependencies
- ✅ First class TypeScript support
- ✅ 100% Unit Test coverage

<h2 align="center">How to</h2>

This is how using `st-i18n` looks like:

```tsx
import { tsx, render, Ref } from 'springtype';
import { $ } from 'st-query';
import { i18n } from 'st-i18n';

// example with local translation source
import de from './assets/translation/de.json'; 
import en from './assets/translation/en.json';

const t = i18n.t(/* optional: provide a namespace name here */);

/**
 * de.json:
 * e.g.:
 * {
 *   "translation": {
 *     "Hello world, {name}": "Hallo {name}, Welt!"
 *   }
 * }
 */
i18n.load('de', de);
i18n.load('en', en);

i18n.language = 'de';

// prints:  Hallo Jack, Welt!
t('Hello world', {
  name: 'Jack'
});
```

<h2 align="center">API</h2>

The following contract is made between the webapp and `st-i18n`:

```typescript
export interface API {
  language: string;
  defaultNamespace: string;
  trans: Translation;
  t: (ns?: string) => TFunction;
  load: (language: string, ns: Namespace) => API;
}
```

<h2 align="center">Backers</h2>

Thank you so much for supporting us financially! 🙏🏻😎🥳👍

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/17221813?v=4&s=150">
        </br>
        <a href="https://github.com/jsdevtom">Tom</a>
      </td>
    </tr>
  <tbody>
</table>

<h2 align="center">Maintainers</h2>

`st-i18n` is brought to you by:

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/12079044?s=150&v=4">
        </br>
        <a href="https://github.com/mansi1">Michael Mannseicher</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/454817?v=4&s=150">
        </br>
        <a href="https://github.com/kyr0">Aron Homberg</a>
      </td>
    </tr>
  <tbody>
</table>

<h2 align="center">Contributing</h2>

Please help out to make this project even better and see your name added to the list of our
[CONTRIBUTORS.md](./CONTRIBUTORS.md) :tada:
