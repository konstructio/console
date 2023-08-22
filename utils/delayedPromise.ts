type DelayedPromiseOptions = {
  delay?: number;
  reject?: boolean;
  rejectResponse?: string;
};

export function delayedPromise<T>(
  returnVal: T,
  { delay = 3000, reject, rejectResponse = 'Failed promise' }: DelayedPromiseOptions = {},
): Promise<T> {
  return new Promise<T>((res, rej) => {
    setTimeout(() => (reject ? rej(rejectResponse) : res(returnVal)), delay);
  });
}
