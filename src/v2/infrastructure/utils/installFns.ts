import type {TEntryType} from "&/application/TEntryType.js";

export const PLACEHOLDER = '{}';

export const installFns: Record<Exclude<TEntryType, 'echo'>, string> = {
    apt: `echo sudo apt install -y ${PLACEHOLDER}`,
    "apt-repo": `echo sudo add-apt-repository -y ${PLACEHOLDER}`,
    flatpak: 'echo sudo flatpak install --noninteractive {}',
    snap: `echo sudo snap install ${PLACEHOLDER}`,
    "snap-classic": `echo sudo snap install --classic ${PLACEHOLDER}`,
}
