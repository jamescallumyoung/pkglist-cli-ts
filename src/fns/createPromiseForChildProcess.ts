import {spawn} from "node:child_process";
import {cwd, env} from "node:process";

/**
 * Returns a Promise wrapped around a child process.
 *
 * The promise resolves if the child process exits with status code 0.
 * The promise rejects if the child process exits with a non-zero status code.
 */
export const createPromiseForChildProcess = async (command: string) => {
    return new Promise((resolve, reject) => {

        const [ head, ...tail] = command.split(" ");

        const child = spawn(head, tail, {
            cwd: cwd(),
            env: env,
            stdio: "inherit",
            detached: false,
            shell: true,
        });

        child.on('close', (code) => {
            if (code !== 0) {
                reject(`Child "${command}" exited with non-zero code: ${code}`);
            }
            else {
                resolve(code);
            }
        });
    });
};
