import Vue from 'vue'
import { useBEM } from './bem';
import { useSFC } from './sfc';

export function use(name) {
  name = 'van-' + name;
  return [useSFC(name), useBEM(name)];
}

export function isDef(value) {
  return value !== undefined && value !== null;
}

export function isObj(x) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export const isServer = Vue.prototype.$isServer;

export function isInDocument(element) {
  return document.body.contains(element);
}