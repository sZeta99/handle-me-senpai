import { DecoretorClass, DecoretorFactory, CatchAndLog } from "./decorators/dec";

@DecoretorFactory("newParameter")
export class Ca {
    newParameter: any;

    constructor() {
        console.log("constructor");
    }

    @CatchAndLog
    func() {
        console.log("func");
        throw new Error("Error in func");
    }
}

const ciao = new Ca();

ciao.func();
if(ciao.newParameter !== undefined) {
    console.log(ciao.newParameter);
}