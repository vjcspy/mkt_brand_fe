import { defaultsDeep, first, get, isEmpty, map, reduce, cloneDeep, find, isNil, isObject, forEach } from "lodash";
import { Headers, Pages, DynamicFooters } from "../sections";
import { DefaultTheme } from "../styles/theme";
import defaultTranslation from "../translations";
/// Frontend

/**
 * Get Browser storage by Key
 * @param {String} key
 */
export const getStorage = (key) => {
  if (localStorage && localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key)) || null;
  }

  if (sessionStorage && sessionStorage.getItem(key)) {
    return JSON.parse(sessionStorage.getItem(key)) || null;
  }

  return null;
};

export const setStorage = (value, key, isLocalStorage) => {
  if (isEmpty(value)) {
    return localStorage.removeItem(key);
  }

  if (isLocalStorage && localStorage) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  if (sessionStorage) {
    return sessionStorage.setItem(key, JSON.stringify(value));
  }

  return null;
};

export const capitalize = (strInput, lower) => {
  if (!strInput) {
    return "";
  }
  return (lower ? strInput.toLowerCase() : strInput).replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
};

export const mergeObject = (a, b) => {
  if (isNil(b)) {
    return a;
  }
  if (isNil(a)) {
    return b;
  }
  var c = {};
  map(a, (valueA, k) => {
    let valueB = b[k];
    if (k === "defaultConfig") {
      c[k] = valueA;
    } else if (!valueB) {
      c[k] = valueA;
    } else if (Array.isArray(valueA)) {
      var defaultConfig = {};
      if (k === "value") {
        defaultConfig = a.defaultConfig;
      }
      c[k] = mergeArray(valueA, valueB, defaultConfig);
    } else if (isObject(valueA)) {
      c[k] = mergeObject(valueA, valueB);
    } else if (typeof valueA === typeof valueB) {
      c[k] = valueB;
    } else {
      c[k] = valueA;
    }
  });
  // map(b, (valueB, k) => {
  //   if (!a[k]) {
  //     c[k] = valueB;
  //   }
  // });
  return c;
};

export const mergeArray = (a, b, defaultConfig) => {
  if (isNil(a)) {
    return b;
  }
  if (isNil(b)) {
    return a;
  }
  var c = [];
  forEach(b, (valueB, k) => {
    let valueA = a[k];
    if (!valueA && isObject(valueB)) {
      c.push(mergeObject(defaultConfig, valueB));
    } else if (!valueA) {
      c.push(valueB);
    } else if (Array.isArray(valueB)) {
      c.push(mergeArray(valueA, valueB));
    } else if (isObject(valueB)) {
      c.push(mergeObject(valueA, valueB));
    } else if (typeof valueA === typeof valueB) {
      c.push(valueB);
    } else {
      c.push(valueA);
    }
  });

  return c;
};

export const mergeConfig = (defaultConfig, config) => {
  let a = cloneDeep(defaultConfig);
  if (!config) {
    return a;
  }
  return mergeObject(a, config);

  // let { components: dComponent, ...dRest } = cloneDeep(defaultConfig);
  // let { components: cComponent, ...cRest } = config;
  // let components = {};
  // Object.keys(dComponent).map((key) => {
  //   let value = cloneDeep(dComponent[key].value);
  //   components[key] = {
  //     ...dComponent[key],
  //     value: isObject(dComponent[key]?.value)
  //       ? defaultsDeep(cComponent[key]?.value ?? value, value)
  //       : cComponent[key]?.value,
  //   };
  // });
  // return {
  //   ...dRest,
  //   ...cRest,
  //   components,
  // };
};

export const formatConfig = (config) => {
  const header = config?.header;
  const dynamicFooters = config?.footer;
  const theme = config?.theme;
  const menus = config?.menus ?? [];
  const translation = config?.translation;
  let headerConfig = (Headers[header?.name] ?? first(map(Headers))).defaultConfig;
  let footerConfig = (DynamicFooters[dynamicFooters?.name] ?? first(map(DynamicFooters))).defaultConfig;

  const modifiedConfig = {
    header: mergeConfig(headerConfig, header),
    footer: mergeConfig(footerConfig, dynamicFooters),
    pages: reduce(
      Pages,
      (pages, page, pageName) => ({
        ...pages,
        [pageName]: {
          ...page,
          sections: map(page.sections, (section) =>
            mergeConfig(
              section,
              find(get(config, ["pages", pageName, "sections"]), (s) => s.name == section.name)
            )
          ),
        },
      }),
      {}
    ),
    theme: defaultsDeep(theme, DefaultTheme),
    menus: menus,
    translation: defaultsDeep(translation, defaultTranslation),
  };

  return modifiedConfig;
};

export const shadeColor = (color, percent) => {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
};

export const getBrowserLink = (edit, link) => {
  if (process.browser && new RegExp(`^/${edit}`).test(location.pathname)) {
    return `/${edit}${link}`;
  }
  return link;
};

export const themeColor = function () {
  return ({ theme }) => get(theme, ["color", ...arguments]);
};

export const toMoney = (num) => {
  return typeof num === "number"
    ? Math.round(num)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    : "0";
};

export const isLocalhost = () => {
  return Boolean(
    window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.0/8 are considered localhost for IPv4.
      window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );
};
