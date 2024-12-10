#!/usr/bin/env node

import type {TEntryTypePort} from "&/application/ports/TEntryTypePort.js";
import {EntryTypeAdaptor} from "&/infrastructure/adaptors/EntryTypeAdaptor.js";
import {installationService} from "&/application/installationService.js";

const port: TEntryTypePort = new EntryTypeAdaptor([ 'echo', 'echo2', 'echo3' ]);

// await port.installPackagesWithEntryType({
//     type: 'echo',
//     packages: [
//         "foo",
//         "bar",
//         "foobar",
//     ],
// });

const service = installationService(port);

await service({
    entries: [
        {
            type: 'echo2',
            package: '2foo',
        },
        {
            type: 'echo2',
            package: '2bar',
        },
        {
            type: 'echo',
            package: 'bar',
        },
        {
            type: 'echo3',
            package: '3foo',
        },
        {
            type: 'echo',
            package: 'foo',
        },
        {
            type: 'echo3',
            package: '3bar',
        },
    ],
});
