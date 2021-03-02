import { IVirtualChild, IVirtualChildren, IVirtualNode } from 'springtype-types/vdom/interface/ivirtual-node';
import { Ref } from 'springtype-types';
import { API } from './interface/API';
import { i18n as i18nInstance } from './i18n';
import { Option } from './interface/Option';

const JSX_REGEX = /<([^>]*)>/g;

const createKey = (
  children: any,
  jsxMap: { [key: string]: IVirtualNode },
  counter: { [key: string]: number } = {},
): string => {
  if (children === null || children === undefined) {
    return '';
  }
  if (children.type) {
    const child: IVirtualNode = children;
    const index = typeof counter[child.type] === 'undefined' ? 0 : counter[child.type] + 1;
    counter[child.type] = index;
    const id = `${child.type}${index > 0 ? index : ''}`;
    jsxMap[id] = {
      type: child.type,
      attributes: child.attributes,
      children: [],
    };
    return `<${id}>${createKey(children.children, jsxMap, counter)}</${id}>`;
  }
  return Array.isArray(children) ? children.map((child) => createKey(child, jsxMap, counter)).join('') : children;
};

const getTopLevelKeys = (xOptionkeys: Array<string>): Array<string> => {
  const topLevelKeys = [];
  let topLevelKey: string = '';
  let nextIsTopLevelKey = true;
  for (let i = 0; i < xOptionkeys.length; i++) {
    if (nextIsTopLevelKey) {
      topLevelKey = xOptionkeys[i];
      nextIsTopLevelKey = false;
      topLevelKeys.push(topLevelKey);
    }
    if (`</${topLevelKey.substr(1)}` === xOptionkeys[i]) {
      nextIsTopLevelKey = true;
    }
  }
  return topLevelKeys;
};

const createJSXFromKey = (
  key: string,
  jsxMap: { [key: string]: IVirtualNode },
): Array<IVirtualNode | IVirtualChild> => {
  const jsx: Array<IVirtualNode | IVirtualChild> = [];
  const xOptionKeys = key.match(JSX_REGEX) || [];
  const topLevelKeys = getTopLevelKeys(xOptionKeys);
  let startIndex = 0;
  for (let index = 0; index < topLevelKeys.length; index++) {
    const topLevelKey = topLevelKeys[index];
    const topLevelKeyClose = `</${topLevelKey.substr(1)}`;

    const openStartIndex = key.indexOf(topLevelKey);
    const openEndIndex = openStartIndex + topLevelKey.length;

    const closeStartIndex = key.indexOf(topLevelKeyClose);
    const closeEndIndex = closeStartIndex + topLevelKeyClose.length;
    const jsxElKey = topLevelKey.substr(1, topLevelKey.length - 2);

    const jsxEl: IVirtualNode = jsxMap[jsxElKey];
    if (startIndex !== openStartIndex) {
      jsx.push(key.substr(startIndex, openStartIndex - startIndex));
    }
    jsx.push({
      type: jsxEl.type,
      attributes: jsxEl.attributes,
      children: createJSXFromKey(key.substr(openEndIndex, closeStartIndex - openEndIndex), jsxMap),
    });
    startIndex = closeEndIndex;
  }
  if (startIndex !== key.length - 1) {
    jsx.push(key.substr(startIndex, key.length - startIndex));
  }
  return jsx;
};

export interface TransProps extends Partial<Omit<JSX.HTMLAttributes, 'ref' | 'onMount'>> {
  tOption?: Option;
  tagName?: string;
  ns?: string;
  i18n?: API;
}

export const Trans = ({
  tOption,
  ns,
  tagName = 'div',
  i18n = i18nInstance,
  children,
  ...other
}: TransProps): IVirtualNode => {
  const ref: Ref = {};
  const namespace = ns || i18n.defaultNamespace;
  const jsxMap: { [key: string]: IVirtualNode } = {};
  const rawKey: string = createKey(children, jsxMap);

  const renderChildren = (): IVirtualChildren => createJSXFromKey(i18n.t(namespace)(rawKey, tOption), jsxMap);
  window.addEventListener('languagechange', () => {
    const { current } = ref;
    if (current && current.$st) {
      current.innerHTML = '';
      current.$st.render(renderChildren(), current);
    }
  });

  return {
    type: tagName,
    attributes: {
      ...other,
      ref,
    },
    children: renderChildren(),
  };
};
