/**
 * In case on error go to funtione given in roger passing the error and the args of the function
 * Not compatible with SenpaiLogAsync.
 * @param values  Functions to go to in case of error
 * @returns {Function}
 */
export function SenpaiGoTo(...values: Function[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args).catch((error: any) => {
        for (const value of values) {
          if (value !== undefined) {
            value.apply(error, args);
          }
        }
      });
      return result;
    };
  };
}
