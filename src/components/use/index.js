import { useBEM } from './bem';
import { useSFC } from './sfc';

export function use(name) {
  name = 'van-' + name;
  return [useSFC(name), useBEM(name)];
}
