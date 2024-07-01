import {exit, stderr, stdout} from "node:process";
import {exitCodes} from "../exitCodes.js";
import {isTPrefix, prefixes} from "../types/TPrefix.js";

type GetScriptCommandHandlerArgs = { prefix: string, sudo: boolean, yes: boolean };

export const getScriptCommandHandler = ({ prefix, sudo, yes }: GetScriptCommandHandlerArgs): void => {
    if (!isTPrefix(prefix)) {
        stderr.write(`Bad prefix! Must be one of: "${prefixes.join(', ')}".`.concat("\n"));
        exit(exitCodes.badPrefix);
    }

    const sudoCmd = sudo ? 'sudo ' : '';

    switch (prefix) {
        case "apt":
            stdout.write(`${sudoCmd}apt install ${yes ? '-y' : ''}`.concat("\n"));
            break;
        case "apt-repo":
            stdout.write(`${sudoCmd}add-apt-repository ${yes ? '-y' : ''}`.concat("\n"));
            break;
        case "flatpak":
            stdout.write(`${sudoCmd}flatpak install ${yes ? '--noninteractive' : ''}`.concat("\n"));
            break;
        case "snap":
            stdout.write(`${sudoCmd}snap install`.concat("\n"));
            break;
        case "snap-classic":
            stdout.write(`${sudoCmd}snap install --classic`.concat("\n"));
            break;
    }
};
