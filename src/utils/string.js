const camelizeRE = /-(\w)/g;

export function camelize(str) {
  return str.replace(camelizeRE, (_, c) => {
    return c.toUpperCase()
  });
}

export function padZero(num) {
  return (num < 10 ? '0' : '') + num;
}

/**
 * Is image source
 */
export function isSrc(url) {
  return /^(https?:)?\/\/|data:image/.test(url);
}
