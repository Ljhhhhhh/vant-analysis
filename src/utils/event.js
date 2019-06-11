/* eslint-disable no-empty */
/* eslint-disable getter-return */
/* eslint-disable import/no-mutable-exports */
import { isServer } from '../components/use';

export let supportsPassive = false;

if (!isServer) {
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', {
      get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    });
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

export function on(
  target,
  event,
  handler,
  passive = false
) {
  if (!isServer) {
    target.addEventListener(
      event,
      handler,
      supportsPassive ? { capture: false, passive } : false
    );
  }
}

export function off(target, event, handler) {
  if (!isServer) {
    target.removeEventListener(event, handler);
  }
}

export function stop(event) {
  event.stopPropagation();
}

export function prevent(event) {
  event.preventDefault();
}
