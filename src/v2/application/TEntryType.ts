export const EntryTypes = [
    "echo",
    "echo2",
    "echo3",
] as const;

export type TEntryType = (typeof EntryTypes)[number];

export const isEntryType = (u: unknown): u is TEntryType =>
    typeof u === "string" &&
    EntryTypes.includes(u as TEntryType);
