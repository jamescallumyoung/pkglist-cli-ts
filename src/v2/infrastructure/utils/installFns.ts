// import type { TPrefix } from "../../../types/TPrefix.js";
//
// /**
//  * Functions that return a script to install packages with the selected package manager.
//  */
// export const installFns: { [k in TPrefix]: (sudo: boolean, yes: boolean) => string } = {
//     apt: (sudo, yes) => {
//         return `${sudo ? 'sudo' : ''} apt install ${yes ? '-y' : ''}`.trim()
//     },
//     "apt-repo": (sudo, yes) => {
//         return `${sudo ? 'sudo' : ''} add-apt-repository ${yes ? '-y' : ''}`.trim()
//     },
//     flatpak: (sudo, yes) => {
//         return `${sudo ? 'sudo' : ''} flatpak install ${yes ? '--noninteractive' : ''}`.trim()
//     },
//     snap: (sudo, yes) => {
//         return `${sudo ? 'sudo' : ''} snap install`.trim()
//     },
//     "snap-classic": (sudo, yes) => {
//         return `${sudo ? 'sudo' : ''} snap install --classic`.trim()
//     },
// };
