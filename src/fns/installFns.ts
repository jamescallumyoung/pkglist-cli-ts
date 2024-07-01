import type { TPrefix } from "../types/TPrefix.js";

/**
 * Functions that return a script to install packages with the selected package manager.
 */
export const installFns: { [k in TPrefix]: (sudo: boolean, yes: boolean) => string } = {
    apt: (sudo, yes) => {
        return `${sudo ? 'sudo ' : ''}apt install ${yes ? '-y' : ''}`
    },
    "apt-repo": (sudo, yes) => {
        return `${sudo ? 'sudo ' : ''}add-apt-repository ${yes ? '-y' : ''}`
    },
    flatpak: (sudo, yes) => {
        return `${sudo ? 'sudo ' : ''}flatpak install ${yes ? '--noninteractive' : ''}`
    },
    snap: (sudo, yes) => {
        return `${sudo ? 'sudo ' : ''}snap install`
    },
    "snap-classic": (sudo, yes) => {
        return `${sudo ? 'sudo ' : ''}snap install --classic`
    },
};
