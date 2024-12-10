#!/usr/bin/env node

import {__installationService} from "&/application/installationService.js";
import {EntryTypeAdaptor} from "&/infrastructure/adaptors/EntryTypeAdaptor.js";
import {__yargsExecCommandHandler} from "&/presentation/yargsExecCommandHandler.js";

const cliSvcFn = __yargsExecCommandHandler(
    __installationService(
        new EntryTypeAdaptor([ 'echo', 'apt', 'apt-repo', 'snap', 'snap-classic', 'flatpak' ]),
    ),
);

await cliSvcFn({ dry: true, file: "/Users/jamesyoung/repos/pkglist-cli-ts/content.pkglist.json" });
