// The supported prefixes, as defined by the specification.
// See: https://github.com/jamescallumyoung/pkglist-spec

export const prefixes = [
    "apt",
    "apt-repo",
    "flatpak",
    "snap",
    "snap-classic",
] as const;

export type TPrefix = (typeof prefixes)[number];

export const isTPrefix = (u: unknown): u is TPrefix => prefixes.includes(u as any);
