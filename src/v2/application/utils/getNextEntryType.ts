import {last} from "lodash-es";
import type {TEntryType} from "&/application/TEntryType.js";

export const getNextEntryType = (lastEntryType: TEntryType | undefined) => {
    const entryTypesInOrder: TEntryType[] = [
        "echo",
        "echo2",
        "echo3",
    ] as const;

    if (lastEntryType == undefined) {
        return entryTypesInOrder[0];
    }
    else if (lastEntryType === last(entryTypesInOrder)) {
        return undefined;
    }
    else if (entryTypesInOrder.includes(lastEntryType)) {
        return entryTypesInOrder[entryTypesInOrder.indexOf(lastEntryType) + 1];
    }
};
