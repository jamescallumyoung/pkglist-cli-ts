#!/usr/bin/env node

import type {THandlerPort} from "./v2/application/ports/THandlerPort.js";
import {HandlerAdaptor} from "./v2/infrastructure/adaptors/HandlerAdaptor.js";

const port: THandlerPort = new HandlerAdaptor([ 'echo' ]);

await port.installPackage({
    type: 'echo',
    packages: [
        "foo",
        "bar",
        "foobar",
    ],
});
