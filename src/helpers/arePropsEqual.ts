import get from 'lodash.get';
import isEqual from 'lodash.isequal';

export function arePropsEqual<Prop>(keys: string[]): (prev: Prop, next: Prop) => boolean {
  return (prev, next) => keys.every((key) => get(prev, key) === get(next, key));
}

export function arePropsStrictlyEqual<Prop>(keys: string[]): (prev: Prop, next: Prop) => boolean {
  return (prev, next) => keys.every((key) => isEqual(get(prev, key), get(next, key)));
}
