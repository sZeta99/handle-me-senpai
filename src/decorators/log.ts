import { promises as fsPromises } from 'fs';
import { join } from 'path';

type SenpaiCatchAndLogType = {
  destination?: string ;
  condition?: boolean ;
  mode?: "w"| "a";
  showStack?: boolean;
};

export function SenpaiCatchAndLog(...values: SenpaiCatchAndLogType[]) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {

          
            const result = originalMethod.apply(this, args).catch((error:any) => {

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
            
        });
        return result;
    }
}
}