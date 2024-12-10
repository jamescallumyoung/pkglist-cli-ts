#!/usr/bin/env node

import {__installationService} from "&/application/installationService.js";
import {EntryTypeAdaptor} from "&/infrastructure/adaptors/EntryTypeAdaptor.js";
import {cli} from "&/presentation/cli.js";
import {__yargsExecCommandHandler} from "&/presentation/yargsExecCommandHandler.js";

await cli(__yargsExecCommandHandler(
    __installationService(
        new EntryTypeAdaptor([ 'echo', 'apt', 'apt-repo', 'snap', 'snap-classic', 'flatpak' ]),
    ),
));
