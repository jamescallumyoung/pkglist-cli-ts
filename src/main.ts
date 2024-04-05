#!/usr/bin/env node

import { sortBy, sortedUniq, uniq as makeUniq } from "lodash-es";
import { readFileSync } from "node:fs";
import { argv as processArgv, exit, stderr, stdin, stdout } from "node:process";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const supportedPrefixes = [
    "apt",
    "flatpak",
    "snap",
    "snap-classic",
];

const exitCodes = {
    badPrefix: 1000,
};

yargs(hideBin(processArgv))
    .command(
        'parse [file]',
        'Parse a pkglist file for the selected package manager.',
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
            .demandOption(['prefix']),
        (args) => {
            const { file, prefix, sort, uniq } = args;

            if (!supportedPrefixes.includes(prefix)) {
                stderr.write(`Bad prefix! Must be one of: "${supportedPrefixes.join(', ')}".`.concat("\n"));
                exit(exitCodes.badPrefix);
            }

            const inputFile = (args.file === '-') ? stdin.fd : args.file;

            const fileContent = readFileSync(inputFile, 'utf-8');

            const matched = fileContent.split('\n')
                .filter(line => line.startsWith(`${prefix} `))
                .map(line => line.substring(prefix.length+1));

            let out = "";
            if (sort && uniq) {
                out = sortedUniq(sortBy(matched)).join(' ');
            }
            else if (sort && !uniq) {
                out = sortBy(matched).join(' ');
            }
            else if (!sort && uniq) {
                out = makeUniq(matched).join(' ');
            }
            else { // !sort && !uniq
                out = matched.join(' ');
            }

            stdout.write(out.concat("\n"));
        },
    )
    .strictCommands()
    .demandCommand()
    .help()
    .parse();
