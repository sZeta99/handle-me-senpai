import { promises as fsPromises } from 'fs';
import { join } from 'path';
const SubMethods = Symbol('SubMethods');
type SenpaiLogType = {
  destination?: string ;
  condition?: boolean ;
  mode?: "w"| "a";
  showStack?: boolean;
};

export function SenpaiLogAsync(...values: SenpaiLogType[]) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    
    
    descriptor.value = function (...args: any[]) { 
        

        const result = originalMethod.apply(this, args).catch((error: any) => {
            senpaiHandleLog(error, ...values);
            
        });
        return result;
    }

   
           
        
    
  
  
    };
}







function senpaiHandleLog(error: Error, ...values: SenpaiLogType[])
{
    
            let message;

            if (error instanceof Error) {
                message = error.name +" : " + error.message + "\n"  ;
            } else {
                message = error + "\n\n";
            }
            if (values.length === 0) {
                console.error(message);
            }
            for (const value of values) {

                if(value.showStack === true) {
                    message += error.stack + "\n\n";
                }

                if (value.destination === undefined && value.condition !== false ) {

                    console.error(message);
                }

                if (value.destination !== undefined && value.condition !== false ) {

                    if(value.mode === undefined) {
                        value.mode = "a";
                    }
                    fsPromises.writeFile(join(value.destination), message, {
                        flag: value.mode,
                    });
                }

            }
}




export function SenpaiCatch<T extends { new(...args: any[]): {} }>(Base: T) {
console.log("SenpaiLogClass");
console.log(Base);
    return class extends Base {
         constructor(...args: any[]) {
      super(...args);
      console.log(Base.prototype)
      const subMethods = Base.prototype[SubMethods];
      console.log(subMethods);
      if (subMethods) {
        subMethods.forEach((requestName: string, method: string) => {
            console.log(requestName);
            console.log(method);

        });
      }
    }
    };
}