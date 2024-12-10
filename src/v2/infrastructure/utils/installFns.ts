export const PLACEHOLDER = '{}';

export const installFns: { apt: string; "apt-repo": string; snap: string } = {
    apt: `sudo apt install -y ${PLACEHOLDER}`,
    "apt-repo": `sudo add-apt-repository -y ${PLACEHOLDER}`,
    // flatpak: 'sudo flatpak install --noninteractive {}',
    snap: 'sudo snap install {}'
    // "snap-classic": 'sudo snap install --classic {}'
}
