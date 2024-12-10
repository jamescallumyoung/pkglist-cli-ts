// // Some package managers (such as 'apt' accept multiple packages to install with a single call to their install command.
// // Others (such as snap) do not.
//
// import type {TPrefix} from "./types/TPrefix.js";
//
// export const packageManagerAcceptsMany: { [k in TPrefix]: boolean } = {
//     apt: true,
//     "apt-repo": false, // could support multiple; TODO find out if add-apt-repository can add multiple repos at once
//     flatpak: false,
//     snap: false,
//     "snap-classic": false
// };
