import type {TEntryType} from "&/application/TEntryType.js";

export const PLACEHOLDER = '{}';

export const installFns: Record<Exclude<TEntryType, 'echo'>, string> = {
    apt: `sudo apt install -y ${PLACEHOLDER}`,
    "apt-repo": `sudo add-apt-repository -y ${PLACEHOLDER}`,
    flatpak: 'sudo flatpak install --noninteractive {}',
    snap: `sudo snap install ${PLACEHOLDER}`,
    "snap-classic": `sudo snap install --classic ${PLACEHOLDER}`,
}
