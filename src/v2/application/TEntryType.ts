export const EntryTypes = [
    "echo",
] as const;

export type TEntryType = (typeof EntryTypes)[number];
