/**
 * Vue Router support
 */

export function route(router, config) {
  const { to, url, replace } = config;
  if (to && router) {
    router[replace ? 'replace' : 'push'](to);
  } else if (url) {
    replace ? location.replace(url) : (location.href = url);
  }
}

export function functionalRoute(context) {
  route(context.parent && context.parent.$router, context.props);
}

export const routeProps = {
  url: String,
  replace: Boolean,
  to: [String, Object]
};
