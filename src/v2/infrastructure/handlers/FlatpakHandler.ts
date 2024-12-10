import type {TInstallPackagesWithEntryTypeCommand} from "&/application/commands/TInstallPackagesWithEntryTypeCommand.js";
import {installFns, PLACEHOLDER} from "&/infrastructure/utils/installFns.js";

export class FlatpakHandler {
    static async installFlatpakPackages(command: TInstallPackagesWithEntryTypeCommand): Promise<void> {
        const commandString = FlatpakHandler.makeFlatpakInstallCommand(command.packages);

        if (command.config.dryRun) {
            console.log(`[flatpak handler] ${commandString}`);
        }
        else {
            console.log(`<<< not a dry run --- ${commandString} >>>`);
        }
    }

    private static makeFlatpakInstallCommand(packages: string[]): string {
        return installFns['flatpak'].replace(PLACEHOLDER, packages.join(" "));
    }
}
