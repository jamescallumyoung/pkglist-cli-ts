import type {TEntryType} from "../TEntryType.js";
import type {TPkglistEntry} from "../../types.js";

export type TInstallPackagesWithEntryTypeCommand = {
    config: {
        dryRun: boolean;
    };
    type: TEntryType;
    packages: TPkglistEntry['package'][]; // TODO fix ref -- shouldn't depend on pres layer
};
