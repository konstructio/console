export const transformObjectToStringKey = (obj: never) => {
  function walk(into: never, obj: never, prefix = []) {
    Object.entries(obj).forEach(([key, val]) => {
      if (typeof val === 'object' && !Array.isArray(val)) {
        walk(into, val as never, [...prefix, key] as never);
      } else {
        const objectKey = [...prefix, key].join('.');
        into[objectKey as string] = val as never;
      }
    });
  }
  const out = {} as never;
  walk(out, obj);
  return out;
};
