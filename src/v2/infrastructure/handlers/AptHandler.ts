import type {TInstallPackagesWithEntryTypeCommand} from "&/application/commands/TInstallPackagesWithEntryTypeCommand.js";

export class AptHandler {
    static async installAptPackages(command: TInstallPackagesWithEntryTypeCommand): Promise<void> {
        const commandString = AptHandler.makeAptInstallCommand(command.packages);
        console.log(`[apt handler] ${commandString}`);
    }

    static async installAptRepository(command: TInstallPackagesWithEntryTypeCommand): Promise<void> {
        const commandString = AptHandler.makeAddAptRepositoryCommand(command.packages);
        console.log(`[apt-repo handler] ${commandString}`);
    }

    private static makeAptInstallCommand(packages: string[]): string {
        // return `${sudo ? 'sudo' : ''} apt install ${yes ? '-y' : ''}`.trim().concat(" ").concat(packages.join(" "));
        return `sudo apt install -y `.concat(packages.join(" "));
    }

    private static makeAddAptRepositoryCommand(packages: string[]): string {
        // return `${sudo ? 'sudo' : ''} add-apt-repository ${yes ? '-y' : ''}`.trim()
        return `sudo add-apt-repository -y `.concat(packages.join(" "));
    }
}
