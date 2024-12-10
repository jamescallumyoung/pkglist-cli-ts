import {argv as processArgv} from "node:process";
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {__yargsExecCommandHandler} from "./yargsExecCommandHandler.js";

export const cli = async (yargsExecCommandHandler: ReturnType<typeof __yargsExecCommandHandler>): Promise<void> => {
    yargs(hideBin(processArgv))
        .command(
            'exec [file]',
            'Install the packages specified in a .pkglist.json file.',
            (yargs) => yargs
                .positional('file', {
                    describe: 'Filepath to a pkglist file. Or "-", to read from stdin.',
                    type: 'string',
                    default: '-',
                })
                .option('dry', {
                    description: 'Execute a dry run and return the script that would have been executed.',
                    type: 'boolean',
                    default: false,
                })
                // option: run in order
                // option: run only selected targets
                .version(false),
            (args) => yargsExecCommandHandler(args),
        )
        .strictCommands()
        .demandCommand()
        .help()
        .version(false)
        .parse();
}
