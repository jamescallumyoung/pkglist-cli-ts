import {uniq as makeUniq} from "lodash-es";
import {exit, stderr, stdout} from "node:process";
import {exitCodes} from "../exitCodes.js";
import {createPromiseForChildProcess} from "../fns/createPromiseForChildProcess.js";
import {getMatchingLines} from "../fns/getMatchingLines.js";
import {installFns} from "../fns/installFns.js";
import {readFileOrStdin} from "../fns/readFileOrStdin.js";
import {packageManagerAcceptsMany} from "../packageManagerAcceptsMany.js";
import {isTPrefix, prefixes as supportedPrefixes} from "../types/TPrefix.js";

type ExecCommandHandlerArgs = { file: string, prefixes: string[], yes: boolean, sudo: boolean, dry: boolean };

export const execCommandHandler = async ({ file, prefixes, yes, sudo, dry }: ExecCommandHandlerArgs) => {

    if (!prefixes.every(isTPrefix)) {
        stderr.write(`Bad prefix! Got: "${prefixes.join(', ')}". Must be one of: "${supportedPrefixes.join(', ')}".`.concat("\n"));
        exit(exitCodes.badPrefix);
    }

    const fileContent = await readFileOrStdin(file);

    const commands: string[] = [];
    for (const prefix of prefixes) {
        const matchedUniq = makeUniq(getMatchingLines(fileContent, prefix));

        if (matchedUniq.length === 0) {
            break;
        }

        if (packageManagerAcceptsMany[prefix]) {
            const script = installFns[prefix](sudo, yes).concat(" ").concat(matchedUniq.join(" "));
            commands.push(script);
        }
        else { // each package needs its own install command
            for (const pkg of matchedUniq) {
                const script = installFns[prefix](sudo, yes).concat(" ").concat(pkg);
                commands.push(script);
            }
        }
    }

    stdout.write((dry)
        ? "This is a dry run. The following commands would have been executed:\n"
        : "The following commands will now be executed:\n",
    );
    stdout.write(commands.join("; ").concat("\n"));

    if (!dry) {
        for (const command of commands) {
            stdout.write(`Executing: "${command}"`.concat("\n"));
            await createPromiseForChildProcess(command)
                .catch((errorMsg: string) => {
                    stderr.write(errorMsg.concat("\n"));
                });
        }
        stdout.write("...done!\n");
    }
};
