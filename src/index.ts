// Project: Handheld-Me-Senpai
// Author: Noir
// File Created: 2023-05-09 16:00:00

import { ReplaceMethodDecorator, SenpaiClass } from './decorators/TestDecoretor';

// This is not a supported library, use at your own risk
export { SenpaiLogAsync } from './decorators/log';
export { SenpaiGoToAsync } from './decorators/goTo';

//promise
const funcPromise = () => {
  return new Promise(function (resolve, reject) {
    reject(new Error('ciao'));
  });
};
@SenpaiClass
class C {
  @ReplaceMethodDecorator
  public name() {
    console.log('func');
  }
}

const c = new C();
c.name();


