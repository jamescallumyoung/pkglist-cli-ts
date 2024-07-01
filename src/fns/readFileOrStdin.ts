import {stdin} from "node:process";
import {createInterface} from "node:readline";
import {readFileSync} from "node:fs";

/**
 * Read a file from the given path, or from stdin if the path is "-".
 *
 * @argument file is either a relative file path, or the string "-".
 */
export const readFileOrStdin = async (filePathOrDash: string): Promise<string> => {
    if (filePathOrDash === "-") {
        const rl = createInterface({
            input: process.stdin,
            // output: process.stdout
        });

        let lines: string[] = [];
        for await (const line of rl) {
            lines.push(line);
        }
        return lines.join("\n");
    }

    return readFileSync(filePathOrDash, 'utf-8');
}
