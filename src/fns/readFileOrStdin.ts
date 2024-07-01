import {stdin} from "node:process";
import {readFileSync} from "node:fs";

/**
 * Read a file from the given path, or from stdin if the path is "-".
 *
 * @argument file is either a relative file path, or the string "-".
 */
export const readFileOrStdin = (filePathOrDash: string): string => {
    const inputFile = (filePathOrDash === '-') ? stdin.fd : filePathOrDash;

    return readFileSync(inputFile, 'utf-8');
}
