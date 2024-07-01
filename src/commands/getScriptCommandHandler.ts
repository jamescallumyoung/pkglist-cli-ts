import {exit, stderr, stdout} from "node:process";
import {exitCodes} from "../exitCodes.js";
import {installFns} from "../fns/installFns.js";
import {isTPrefix, prefixes} from "../types/TPrefix.js";

type GetScriptCommandHandlerArgs = { prefix: string, sudo: boolean, yes: boolean };

export const getScriptCommandHandler = ({ prefix, sudo, yes }: GetScriptCommandHandlerArgs): void => {
    if (!isTPrefix(prefix)) {
        stderr.write(`Bad prefix! Must be one of: "${prefixes.join(', ')}".`.concat("\n"));
        exit(exitCodes.badPrefix);
    }

    stdout.write(installFns[prefix](sudo, yes).concat("\n"));
};
