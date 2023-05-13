import { type } from 'os';

export type CatcherObject = {
  await: boolean;
  tryAndCatch: boolean;
  thenAndCatch: boolean;
};
export type argsForCatcher = {
  originalMethod: any[];
  handler: any[];
};

export function catcher(originalMethod: Function, handler: Function, ...args: any) {
  // let result = ingectInAsync(originalMethod, handler);
  // result  = ingectInSync(result, handler, ...args);
  // console.log(result.toString());
  // return result;
}

function ifAsync(fun: Function) {
  return fun.toString().includes('async');
}

export function ingectInSync(fun: Function, errorFunc: Function): string {
  const stringFun = fun.toString();
  // Define a regular expression that matches `.then()` method calls

  // Define regular expressions that match `.then()` and `.catch()` method calls
  const thenRegex = /\.then\([^)]*\)/g;
  const catchRegex = /\.catch\([^)]*\)/g;

  // Replace all `.then()` method calls that don't already have a `.catch()` call with `.then(...).catch((error) => { console.log(error); })`
  let modifiedCode = stringFun.replace(thenRegex, (match) => {
    if (catchRegex.test(match)) {
      return match;
    } else {
      return `${match}.catch((error) => { console.log("error"); })`;
    }
  });
  return modifiedCode;
  //Find all the then that don't have a catch
}

function ingectInAsync(fun: Function, errorFunc: Function): Function {
  try {
    return fun().catch((error: any) => {
      errorFunc(error);
    });
  } catch (error: any) {
    return fun;
  }
}
