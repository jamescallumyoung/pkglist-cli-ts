import type {TInstallPackagesWithEntryTypeCommand} from "../commands/TInstallPackagesWithEntryTypeCommand.js";

export type TEntryTypePort = {
    /** @throws */
    installPackagesWithEntryType: (p: TInstallPackagesWithEntryTypeCommand) => Promise<void>;
};
