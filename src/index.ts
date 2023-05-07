import { SenpaiCatch,  SenpaiLogAsync} from "./decorators/log";


export function createPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("error1"));
    }, 1000);
  });
}

// export const promise2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject(new Error("error2"));
//     }, 2000);
// });
@SenpaiCatch
export class Ca {


    @SenpaiLogAsync()
    public async func1() {
        console.log("func1");
        await  createPromise();
        
    }

  @SenpaiLogAsync()
    public func2() {
     
    }

    

    
}


const ciao = new Ca();

ciao.func1();
//ciao.func2();
