#!/usr/bin/env node

import {argv as processArgv} from "node:process";
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {getScriptCommandHandler} from "./commands/getScriptCommandHandler.js";
import {parseCommandHandler} from "./commands/parseCommandHandler.js";

yargs(hideBin(processArgv))
    .command(
        'parse [file]',
        'Get a list of packages that can be installed with the specified package manager.',
        (yargs) => yargs
            .positional('file', {
                describe: 'Filepath to a pkglist file. Or "-", to read from stdin.',
                type: 'string',
                default: '-',
            })
            .option('prefix', {
                alias: 'p',
                description: 'Which prefix should be selected?.',
                type: 'string',
            })
            .option('sort', {
                alias: 'S',
                description: 'Sort output.',
                type: 'boolean',
                default: false,
            })
            .option('uniq', {
                alias: ['U', 'unique'],
                description: 'Make output unique.',
                type: 'boolean',
                default: false,
            })
            .demandOption(['prefix'])
            .version(false),
        (args) => {
            const { file, prefix, sort, uniq } = args;
            void parseCommandHandler({ file, prefix, sort, uniq });
        },
    )
    .command(
        'get-script',
        'Get a script to invoke the selected package manager\'s install command.',
        (yargs) => yargs
            .option('prefix', {
                alias: 'p',
                description: 'Which prefix should be selected?',
                type: 'string',
            })
            .option('yes', {
                alias: 'y',
                description: 'Reduce the need for user input by answering yes to any questions, or by using a non-interactive mode, if available.',
                type: 'boolean',
                default: false,
            })
            .option('sudo', {
                alias: 's',
                description: 'Prefix the output script with "sudo"',
                type: 'boolean',
                default: false,
            })
            .demandOption(['prefix'])
            .version(false),
        (args) => {
            const { prefix, sudo, yes } = args;
            void getScriptCommandHandler({ prefix, sudo, yes });
        },
    )
    .strictCommands()
    .demandCommand()
    .help()
    .version(false)
    .parse();
