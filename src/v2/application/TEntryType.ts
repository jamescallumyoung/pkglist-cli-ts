export const EntryTypes = [
    "apt",
    "apt-repo",
    "echo",
    "snap",
    "snap-classic",
] as const;

export type TEntryType = (typeof EntryTypes)[number];

export const isEntryType = (u: unknown): u is TEntryType =>
    typeof u === "string" &&
    EntryTypes.includes(u as TEntryType);
