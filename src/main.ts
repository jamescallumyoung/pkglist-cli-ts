#!/usr/bin/env node

import chalk from "chalk";
import {__installationService} from "&/application/installationService.js";
import {EntryTypeAdaptor} from "&/infrastructure/adaptors/EntryTypeAdaptor.js";
import {__yargsExecCommandHandler} from "&/presentation/yargsExecCommandHandler.js";

const cliSvcFn = __yargsExecCommandHandler(
    __installationService(
        new EntryTypeAdaptor([ 'echo', 'apt', 'apt-repo', 'snap', 'snap-classic', 'flatpak' ]),
    ),
);

console.log(chalk.bgGreen.black.bold("PARSING JSON"));
await cliSvcFn({ dry: true, file: "/Users/jamesyoung/repos/pkglist-cli-ts/content.pkglist.json" });

console.log(chalk.bgGreen.black.bold("PARSING JSON5"));
await cliSvcFn({ dry: true, file: "/Users/jamesyoung/repos/pkglist-cli-ts/content.pkglist.json5" });

console.log(chalk.bgGreen.black.bold("PARSING YAML"));
await cliSvcFn({ dry: true, file: "/Users/jamesyoung/repos/pkglist-cli-ts/content.pkglist.yaml" });
