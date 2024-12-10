import type {TInstallPackagesWithTypeCommand} from "../commands/TInstallPackagesWithTypeCommand.js";

export type THandlerPort = {
    /** @throws */
    installPackage: (p: TInstallPackagesWithTypeCommand) => Promise<void>;
};
