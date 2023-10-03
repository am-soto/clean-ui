type AnyFunction = (...args: never[]) => unknown;

export const debounce = <F extends AnyFunction>(
  func: F,
  delay: number = 500
): ((...args: Parameters<F>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null!;
      func.apply(context, args);
    }, delay);
  };
};
