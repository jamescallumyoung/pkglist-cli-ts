import type {TInstallPackagesWithEntryTypeCommand} from "&/application/commands/TInstallPackagesWithEntryTypeCommand.js";
import {installFns, PLACEHOLDER} from "&/infrastructure/utils/installFns.js";

export class AptHandler {
    static async installAptPackages(command: TInstallPackagesWithEntryTypeCommand): Promise<void> {
        const commandString = AptHandler.makeAptInstallCommand(command.packages);

        if (command.config.dryRun) {
            console.log(`[apt handler] ${commandString}`);
        }
        else {
            console.log(`<<< not a dry run --- ${commandString} >>>`);
        }
    }

    static async installAptRepository(command: TInstallPackagesWithEntryTypeCommand): Promise<void> {
        for (const pkg of command.packages) {
            const commandString = AptHandler.makeAddAptRepositoryCommand(pkg);

            if (command.config.dryRun) {
                console.log(`[apt-repo handler] ${commandString}`);
            }
            else {
                console.log(`<<< not a dry run --- ${commandString} >>>`);
            }
        }
    }

    private static makeAptInstallCommand(packages: string[]): string {
        return installFns['apt'].replace(PLACEHOLDER, packages.join(" "));
    }

    private static makeAddAptRepositoryCommand(pkg: string): string {
        return installFns['apt-repo'].replace(PLACEHOLDER, pkg);
    }
}
