import {uniq as makeUniq} from "lodash-es";
import {execSync} from "node:child_process";
import {exit, stderr, stdout} from "node:process";
import {exitCodes} from "../exitCodes.js";
import {getMatchingLines} from "../fns/getMatchingLines.js";
import {installFns} from "../fns/installFns.js";
import {readFileOrStdin} from "../fns/readFileOrStdin.js";
import {packageManagerAcceptsMany} from "../packageManagerAcceptsMany.js";
import {isTPrefix, prefixes as supportedPrefixes} from "../types/TPrefix.js";


type ExecCommandHandlerArgs = { file: string, prefixes: string[], yes: boolean, sudo: boolean, dry: boolean };

export const execCommandHandler = ({ file, prefixes, yes, sudo, dry }: ExecCommandHandlerArgs): void => {

    if (!prefixes.every(isTPrefix)) {
        stderr.write(`Bad prefix! Got: "${prefixes.join(', ')}". Must be one of: "${supportedPrefixes.join(', ')}".`.concat("\n"));
        exit(exitCodes.badPrefix);
    }

    const fileContent = readFileOrStdin(file);

    const commands: string[] = [];
    for (const prefix of prefixes) {
        const matchedUniq = makeUniq(getMatchingLines(fileContent, prefix));

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

    if (dry) {
        stdout.write(commands.join("; ").concat("\n"));
    }
    else {
        execSync(commands.join("; "));
    }
};
