interface UnionBuilder<T = never> {
  add: <K>() => UnionBuilder<T | K>;
  value: T;
}

declare const builder: UnionBuilder;

export { builder };
