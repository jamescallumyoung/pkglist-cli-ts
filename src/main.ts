#!/usr/bin/env node

import {argv as processArgv} from "node:process";
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {execCommandHandler} from "./commands/execCommandHandler.js";
import {getScriptCommandHandler} from "./commands/getScriptCommandHandler.js";
import {parseCommandHandler} from "./commands/parseCommandHandler.js";

yargs(hideBin(processArgv))
    .command(
        'parse [file]',
        'Get a list of packages that can be installed with the specified package manager.'+
        '\n'+
        'This function is especially useful if you want to use your own install command, and just need the package list.',
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
    .command(
        'exec',
        'Install packages from a file, with the selected package managers.',
        (yargs) => yargs
            .positional('file', {
                describe: 'Filepath to a pkglist file. Or "-", to read from stdin.',
                type: 'string',
                default: '-',
            })
            .option('prefix', {
                alias: 'p',
                description: 'Which prefix should be selected?. Can be specified multiple times to select multiple prefixes. '+
                    'Multiple prefixes can be specified with both "--prefix foo bar" and with "--prefix foo --prefix bar".',
                type: 'string',
                array: true,
            })
            .option('yes', {
                alias: 'y',
                description: 'Reduce the need for user input by answering yes to any questions, or by using a non-interactive mode, if available.',
                type: 'boolean',
                default: false,
            })
            .option('sudo', {
                alias: 's',
                description: 'Execute all install scripts with sudo?',
                type: 'boolean',
                default: false,
            })
            .option('dry', {
                description: 'Execute a dry run and return the script that would have been executed.',
                type: 'boolean',
                default: false,
            })
            .demandOption(['prefix'])
            .version(false),
        (args) => {
            const { file, prefix, sudo, yes, dry } = args;
            void execCommandHandler({ file, prefixes: prefix, sudo, yes, dry });
        },
    )
    .strictCommands()
    .demandCommand()
    .help()
    .version(false)
    .parse();
