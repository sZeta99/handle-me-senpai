import { SenpaiCatchAndLog } from "./decorators/log";


export const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error("error"));
    }, 1000);
});
export class Ca {


    @SenpaiCatchAndLog()
    async func() {
        
        await promise;
        
    }
}

//promise that throws an error after 1 second



const ciao = new Ca();

ciao.func();
