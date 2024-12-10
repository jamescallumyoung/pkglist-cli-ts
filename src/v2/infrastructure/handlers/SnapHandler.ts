import type {TInstallPackagesWithEntryTypeCommand} from "&/application/commands/TInstallPackagesWithEntryTypeCommand.js";
import {installFns, PLACEHOLDER} from "&/infrastructure/utils/installFns.js";
import type {TEntryType} from "&/application/TEntryType.js";

export class SnapHandler {
    static async installSnapPackages(command: TInstallPackagesWithEntryTypeCommand): Promise<void> {
        for (const pkg of command.packages) {
            const commandString = SnapHandler.makeSnapInstallCommand(pkg);

            if (command.config.dryRun) {
                console.log(`[snap handler] ${commandString}`);
            }
            else {
                console.log(`<<< not a dry run --- ${commandString} >>>`);
            }
        }
    }

    static async installSnapClassicPackages(command: TInstallPackagesWithEntryTypeCommand): Promise<void> {
        for (const pkg of command.packages) {
            const commandString = SnapHandler.makeSnapClassicInstallCommand(pkg);

            if (command.config.dryRun) {
                console.log(`[snap-classic handler] ${commandString}`);
            }
            else {
                console.log(`<<< not a dry run --- ${commandString} >>>`);
            }
        }
    }

    private static makeSnapInstallCommand(pkg: string): string {
        return installFns['snap'].replace(PLACEHOLDER, pkg);
    }

    private static makeSnapClassicInstallCommand(pkg: string): string {
        return installFns['snap-classic'].replace(PLACEHOLDER, pkg);
    }
}
