import type {TInstallPackagesWithEntryTypeCommand} from "../commands/TInstallPackagesWithEntryTypeCommand.js";

export type TEntryTypePort = {
    /** @throws */
    installPackage: (p: TInstallPackagesWithEntryTypeCommand) => Promise<void>;
};
