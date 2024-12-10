export const EntryTypes = [
    "echo",
] as const;

export type TEntryType = (typeof EntryTypes)[number];

export const isEntryType = (u: unknown): u is TEntryType =>
    typeof u === "string" &&
    EntryTypes.includes(u as TEntryType);
