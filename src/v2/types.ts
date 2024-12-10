import type {TEntryType} from "&/application/TEntryType.js";

export type TPkglistEntry = {
    type: TEntryType;
    package: string; // any valid package ref, processable by the handler for this entry's type
};
