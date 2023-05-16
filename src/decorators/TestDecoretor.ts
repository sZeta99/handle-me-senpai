
import 'reflect-metadata';
export function ReplaceMethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // Add metadata to the method
  Reflect.defineMetadata('replaceMethod', true, target, propertyKey);
}

// Your custom method implementation
function customMethod(fun: Function) {
  const originalMethod: Function = fun;
  const modifiedMethod = Function(`return function name() {
        funcPromise().then().catch((err) => {
      console.log(err.name);
    });
        console.log('func');
    }`)();
    return modifiedMethod;

}

export function SenpaiClass<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      
   
      // Access the class prototype
      const prototype = constructor.prototype;

      // Get the property names of the class prototype
      const propertyNames = Object.getOwnPropertyNames(prototype);

      // Iterate over the properties
      for (const propertyName of propertyNames) {
        // Check if the method has the ReplaceMethodDecorator applied
        if (Reflect.hasMetadata('replaceMethod', prototype, propertyName)) {
          // Replace the method implementation
          console.log(`${ prototype }`);
           const modifiedMethod: Function = Function(`${ prototype[propertyName] } => {
        funcPromise().then().catch((err) => {
      console.log(err.name);
    });
    }`);
          prototype[propertyName] = modifiedMethod;
          console.log(prototype[propertyName].toString());
        }
      }
    }
  };
}
