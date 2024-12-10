#!/usr/bin/env node

import type {TEntryTypePort} from "&/application/ports/TEntryTypePort.js";
import {EntryTypeAdaptor} from "&/infrastructure/adaptors/EntryTypeAdaptor.js";

const port: TEntryTypePort = new EntryTypeAdaptor([ 'echo' ]);

await port.installPackage({
    type: 'echo',
    packages: [
        "foo",
        "bar",
        "foobar",
    ],
});
