import {sortBy, sortedUniq, uniq as makeUniq} from "lodash-es";
import {exit, stderr, stdout} from "node:process";
import {exitCodes} from "../exitCodes.js";
import {getMatchingLines} from "../fns/getMatchingLines.js";
import {readFileOrStdin} from "../fns/readFileOrStdin.js";
import {isTPrefix, prefixes} from "../types/TPrefix.js";


type ParseCommandHandlerArgs = { file: string, prefix: string, sort: boolean, uniq: boolean, oneEntryPerLine: boolean };

export const parseCommandHandler = ({ file, prefix, sort, uniq, oneEntryPerLine }: ParseCommandHandlerArgs): void => {

    if (!isTPrefix(prefix)) {
        stderr.write(`Bad prefix! Must be one of: "${prefixes.join(', ')}".`.concat("\n"));
        exit(exitCodes.badPrefix);
    }

    const fileContent = readFileOrStdin(file);

    const matched = getMatchingLines(fileContent, prefix);

    const list: string[] = [];
    if (sort && uniq) {
        list.push(...sortedUniq(sortBy(matched)));
    }
    else if (sort && !uniq) {
        list.push(...sortBy(matched));
    }
    else if (!sort && uniq) {
        list.push(...makeUniq(matched));
    }
    else { // !sort && !uniq
        list.push(...matched);
    }

    if (oneEntryPerLine) {
        for (const entry of list) {
            stdout.write(entry.concat("\n"));
        }
    }
    else {
        stdout.write(list.join(" ").concat("\n"));
    }
};
