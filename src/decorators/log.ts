import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { stringify } from 'querystring';
import { catcher } from './catcher';

export type SenpaiLogType = {
  destination?: string;
  condition?: boolean;
  mode?: 'w' | 'a';
  showStack?: boolean;
};

/**
 * Write the error to the console and/or to a file.
 * Only works with async functions.
 * Not compatible with SenpaiGoTo.
 * @param values Objects of type SenpaiLogType to specify the destination, condition, mode and showStack, print on console if no destination is given
 * @returns {Function}
 */
export function SenpaiLogAsync(...values: SenpaiLogType[]): Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod: Function = descriptor.value;
    console.log(originalMethod.toString());
    descriptor.value = function (...args: any[]) {

      const result = catcher(propertyKey, originalMethod,senpaiHandleLog).apply(this, args);
      return result;
  };
  return descriptor;
}
}



function senpaiHandleLog(error: Error, ...values: SenpaiLogType[]) {
  let message;

  if (error instanceof Error) {
    message = error.name + ' : ' + error.message + '\n';
  } else {
    message = error + '\n\n';
  }
  if (values.length === 0) {
    console.error(message);
  }
  for (const value of values) {
    if (value.showStack === true) {
      message += error.stack + '\n\n';
    }

    if (value.destination === undefined && value.condition !== false) {
      console.error(message);
    }

    if (value.destination !== undefined && value.condition !== false) {
      if (value.mode === undefined) {
        value.mode = 'a';
      }
      fsPromises.writeFile(join(value.destination), message, {
        flag: value.mode
      });
    }
  }
}
