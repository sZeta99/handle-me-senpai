import { Ca } from '..';

export function DecoretorClass(target: Function) {
  console.log('DecoretorClass');
}

export function DecoretorProperty(target: any, propertyKey: string) {
  console.log('DecoretorProperty');
}

export function DecoretorAccessor(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('DecoretorAccessor');
}

export function DecoretorParameter(target: any, propertyKey: string, parameterIndex: number) {
  console.log('DecoretorParameter');
}

export function DecoretorFactory(newParameter: string) {
  console.log('DecoretorFactory');
  return function (target: Function & typeof Ca) {
    target.prototype.newParameter = newParameter;
    console.log('DecoretorFactory target');
  };
}
// -------/
