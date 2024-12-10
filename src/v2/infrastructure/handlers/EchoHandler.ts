import type {TInstallPackagesWithEntryTypeCommand} from "&/application/commands/TInstallPackagesWithEntryTypeCommand.js";

export class EchoHandler {
    static handleInstallCommand(command: TInstallPackagesWithEntryTypeCommand): void {
        for (const p of command.packages) {
            console.log(`[echo] ${p}`);
        }
    }
}
