import { JSONObject } from '../types';

export const transformObjectToStringKey = (obj: JSONObject) => {
  function walk(into: JSONObject, obj: JSONObject, prefix: string[]) {
    Object.entries(obj).forEach(([key, val]) => {
      if (typeof val === 'object' && !Array.isArray(val)) {
        walk(into, val, [...prefix, key]);
      } else {
        const objectKey = [...prefix, key].join('.');
        into[objectKey] = val;
      }
    });
  }
  const out: JSONObject = {};
  walk(out, obj, []);
  return out;
};
