import type {TEntryType} from "&/application/TEntryType.js";

export type TParsedPkglistJson = {
    entries: {
        type: TEntryType,
        package: string
    }[],
};
