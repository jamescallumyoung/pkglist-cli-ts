import {sortBy, sortedUniq, uniq as makeUniq} from "lodash-es";
import {readFileSync} from "node:fs";
import {exit, stderr, stdin, stdout} from "node:process";
import {exitCodes} from "../exitCodes.js";
import {isTPrefix, prefixes} from "../types/TPrefix.js";

type ParseCommandHandlerArgs = { file: string, prefix: string, sort: boolean, uniq: boolean };

export const parseCommandHandler = ({ file, prefix, sort, uniq }: ParseCommandHandlerArgs): void => {

    if (!isTPrefix(prefix)) {
        stderr.write(`Bad prefix! Must be one of: "${prefixes.join(', ')}".`.concat("\n"));
        exit(exitCodes.badPrefix);
    }

    const inputFile = (file === '-') ? stdin.fd : file;

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
};
