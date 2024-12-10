import type {TInstallPackagesWithEntryTypeCommand} from "&/application/commands/TInstallPackagesWithEntryTypeCommand.js";
import {installFns, PLACEHOLDER} from "&/infrastructure/utils/installFns.js";

export class SnapHandler {
    static async installSnapPackages(command: TInstallPackagesWithEntryTypeCommand): Promise<void> {
        const commandString = SnapHandler.makeSnapInstallCommand(command.packages);

        if (command.config.dryRun) {
            console.log(`[snap handler] ${commandString}`);
        }
        else {
            console.log(`<<< not a dry run --- ${commandString} >>>`);
        }
    }

    static async installSnapClassicPackages(command: TInstallPackagesWithEntryTypeCommand): Promise<void> {
        const commandString = SnapHandler.makeSnapClassicInstallCommand(command.packages);

        if (command.config.dryRun) {
            console.log(`[snap-classic handler] ${commandString}`);
        }
        else {
            console.log(`<<< not a dry run --- ${commandString} >>>`);
        }
    }

    private static makeSnapInstallCommand(packages: string[]): string {
        return installFns['snap'].replace(PLACEHOLDER, packages.join(" "));
    }

    private static makeSnapClassicInstallCommand(packages: string[]): string {
        return installFns['snap-classic'].replace(PLACEHOLDER, packages.join(" "));
    }
}
