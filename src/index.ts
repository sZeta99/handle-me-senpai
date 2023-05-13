// Project: Handheld-Me-Senpai
// Author: Noir
// File Created: 2023-05-09 16:00:00

import { SenpaiLogAsync } from './decorators/log';

// This is not a supported library, use at your own risk
export { SenpaiLogAsync } from './decorators/log';
export { SenpaiGoToAsync } from './decorators/goTo';

//promise
const funcPromise = () => {
  return new Promise(function (resolve, reject) {
    reject(new Error('ciao'));
  });
};
class C {
  @SenpaiLogAsync({ destination: 'File.txt' })
  public  name(a? : string) {

    funcPromise().then();
    console.log('func');
    
  }

}

const c = new C();
c.name();
console.log(c.name.toString());



