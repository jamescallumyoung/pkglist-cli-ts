import type {TInstallPackagesWithEntryTypeCommand} from "&/application/commands/TInstallPackagesWithEntryTypeCommand.js";
import {createPromiseForChildProcess} from "&/infrastructure/utils/createPromiseForChildProcess.js";
import {installFns, PLACEHOLDER} from "&/infrastructure/utils/installFns.js";

export class SnapHandler {
    static async installSnapPackages(command: TInstallPackagesWithEntryTypeCommand): Promise<void> {
        for await (const pkg of command.packages) {
            const commandString = SnapHandler.makeSnapInstallCommand(pkg);

            if (command.config.dryRun) {
                console.log(`[snap handler] ${commandString}`);
            }
            else {
                await createPromiseForChildProcess(`${commandString}`);
            }
        }
    }

    static async installSnapClassicPackages(command: TInstallPackagesWithEntryTypeCommand): Promise<void> {
        for await (const pkg of command.packages) {
            const commandString = SnapHandler.makeSnapClassicInstallCommand(pkg);

            if (command.config.dryRun) {
                console.log(`[snap-classic handler] ${commandString}`);
            }
            else {
                await createPromiseForChildProcess(`${commandString}`);
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
