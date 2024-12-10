import type {TInstallPackagesWithEntryTypeCommand} from "&/application/commands/TInstallPackagesWithEntryTypeCommand.js";
import {installFns, PLACEHOLDER} from "&/infrastructure/utils/installFns.js";

export class FlatpakHandler {
    static async installFlatpakPackages(command: TInstallPackagesWithEntryTypeCommand): Promise<void> {
        for (const pkg of command.packages) {
            const commandString = FlatpakHandler.makeFlatpakInstallCommand(pkg);

            if (command.config.dryRun) {
                console.log(`[flatpak handler] ${commandString}`);
            }
            else {
                console.log(`<<< not a dry run --- ${commandString} >>>`);
            }
        }
    }

    private static makeFlatpakInstallCommand(pkg: string): string {
        return installFns['flatpak'].replace(PLACEHOLDER, pkg);
    }
}
